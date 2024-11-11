import React, { useEffect, useState } from "react";

import { Empty, Popover } from "antd";
import useRefState from "react-usestateref";
import { PlusOutlined } from "@ant-design/icons";
import Button from "../../shared-ui/Button/Button";
import { Menu, Dropdown, Divider } from "antd";
import { Input, Form, Select, Checkbox, Optio } from "antd";
import { selectTransactionHistoryDownload } from "../auth/slice";
import Modal from "../../shared-ui/Modal/Modal";
import { initSocket } from "../../utils/socket";
import { useWindowSize } from "../../utils/helper";
import ChatList from "../../app-ui/ChatList/ChatList";
import { selectEmployerProfile } from "../auth/slice";
import ChatInput from "../../shared-ui/ChatInput/ChatInput";
import {
  deleteConversation,
  getConversation,
  getJobseekerRole,
  getReceivedFiles,
  getSentFiles,
} from "./thunk";
import {
  selectDeleteFileSuccess,
  // selectDeleteFileSuccess,
  selectJobseekerRole,
  selectRecievedFiles,
  selectSentFiles,
} from "./slice";
import ChatBubble from "../../shared-ui/ChatBubble/ChatBubble";
import UserProfile from "../../shared-ui/UserProfile/UserProfile";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  selectConversations,
  selectDeleteChatSuccess,
  selectStatus,
} from "./slice";

import "./_Chat.scss";
import "./_Responsive.scss";
import TestChat from "../../app-ui/TestComponents/TestChat/TestChat";

const { TextArea } = Input;

/*{
  type = "is-reciever invitation",
  typeofMsg = "invitation",
  userStatus = "user-status-offline",
}*/

/**
 * event name:
 * chat
 * chat_company
 * getConversationInfo (chat messages)
 * getCompanyConversationInfo (chat messages)
 * deleteConversationInfo
 * deleteCompanyConversationInfo
 * deleteMessage
 * deleteCompanyMessage
 * markMessageRead
 * markCompanyMessageRead
 * typing
 */

function Chat() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectStatus);
  const conversations = useAppSelector(selectConversations);
  const jobseekerRole = useAppSelector(selectJobseekerRole);
  const profile = useAppSelector(selectEmployerProfile);
  const deleteChatSuccess = useAppSelector(selectDeleteChatSuccess);
  const sentFiles = useAppSelector(selectSentFiles);
  const deleteFileSuccess = useAppSelector(selectDeleteFileSuccess);
  const recievedFiles = useAppSelector(selectRecievedFiles);
  const [socket, setSocket] = useState(null);
  const [replyDropDown, setReplyDropDown] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showViewProfile, setShowViewProfile] = useState(false);
  const [selectedChat, setSelectChat] = useState(null);
  const [chat, setChat, chatRef] = useRefState({ items: [] });
  const { width, height } = useWindowSize();
  const transactionHistoryDownload = useAppSelector(
    selectTransactionHistoryDownload
  );

  const qs = { search: "" };

  useEffect(() => {
    dispatch(getConversation({ qs }));
    setSocket(initSocket());
    // dispatch(getTransactionHistoryDownload());
    dispatch(getJobseekerRole());
    window.$crisp.push(["do", "chat:show"]);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.on("getPaginatedChat", getPaginatedChat);
        socket.on("chatMessage", receiveMessage);
      });
    }
  }, [socket, width]);

  useEffect(() => {
    // D E L T E __ C H A T __ S U C E S S
    if (deleteChatSuccess) {
      dispatch(getConversation({ qs }));
      console.log("QS", qs);
    }

    // W I D T H
    if (width < 540) {
      setShowViewProfile(false);
    }

    // S E L E C T E D __ C H A T
    if (selectedChat) {
      const payload = { conversationId: selectedChat?.id };
      //below 2 calling from auth
      dispatch(getSentFiles({ payload }));
      dispatch(getReceivedFiles({ payload }));
    }
    if (deleteFileSuccess) {
      const payload = { conversationId: selectedChat?.id };
      dispatch(getSentFiles({ payload }));
      dispatch(getReceivedFiles({ payload }));
    }
  }, [deleteChatSuccess, width, selectedChat, deleteFileSuccess]);

  const getReceiver = (d) => {
    if (profile?.userId === d?.userId1) {
      return d?.user2;
    }
    return d?.user1;
  };

  const getSender = (d) => {
    if (profile?.userId === d?.userId1) {
      return d?.user1;
    }
    return d?.user2;
  };

  const onChatHeadClick = (conversation) => {
    const conversationId = conversation?.id;
    const payload = {
      options: {
        page: 1,
        limit: 10,
      },
      conversationId,
    };
    setSelectChat({
      ...conversation,
      receiver: getReceiver(conversation),
      sender: getSender(conversation),
    });
    socket.emit("getPaginatedChat", payload);
    socket.emit("readMessage", { conversationId });
    setShowChat(true);
  };

  const onChatDelete = (id) => {
    console.log("DELETE CHAT", id);
    dispatch(deleteConversation({ id }));
  };

  const getPaginatedChat = (res) => {
    setChat(res.data);
  };

  useEffect(() => {
    console.log("chat", chat);
  }, [chat]);

  const receiveMessage = (res) => {
    const items = chatRef.current.items;
    items.unshift(res.data);
    setChat({ ...chatRef.current, items });
  };

  const isReciever = (senderId) => {
    return profile.userId === senderId;
  };

  const onSendMessage = (message, messageType, fileType, docType, filesize) => {
    const user = getReceiver(selectedChat);
    const payload = {
      conversationId: selectedChat.id,
      receiverId: user.id,
      messageType: messageType,
      message,
      fileType: fileType ? fileType : null,
      docType: docType ? docType : "",
      fileSize: filesize ? filesize : "0.2MB",
    };
    socket.emit("chatMessage", payload);
  };

  const onChatSearch = (values) => {
    dispatch(getConversation({ qs: values }));
  };

  // Send chat Modal
  const savedRepliesDropDown = (
    <div
      className={`saved-message-dropdown ${
        replyDropDown ? "front-box-shadow" : "back-box-shadow"
      }`}>
      {replyDropDown ? (
        <>
          <div className="modal-top-section">
            <div className="modal-top-section-content">
              <span>Saved replies</span>
              <span>Create new</span>
            </div>
            <span className="top-right-plus-btn">
              {" "}
              <Button
                onClick={() => setReplyDropDown(!replyDropDown)}
                htmlType="submit"
                className="rounded plus-btn-text-field">
                <PlusOutlined />
              </Button>
            </span>
          </div>
          <Divider />
          <div className="modal-content-section">
            <h3>
              Welcome Messages{" "}
              <button className="new-reply-field-icons">
                <img
                  src={require("../../assets/images/icons/edit-icon.svg")}
                  alt="emoji"
                />
              </button>
              <button className="new-reply-field-icons">
                <img
                  src={require("../../assets/images/icons/red-close-icon.svg")}
                  alt="emoji"
                />
              </button>
            </h3>
            <p>
              Jobsmideast.com is the smartest job site in the Middle East. Our
              amazing team consists of some of the most experienced and talented
              developers, social media executives and account managers on the
              market, with years of experience in different sectors to make your
              experience more efficient & effortless.
            </p>
          </div>
          <Divider />
          <div className="modal-content-section">
            <h3>
              Employer documents{" "}
              <button className="new-reply-field-icons">
                <img
                  src={require("../../assets/images/icons/edit-icon.svg")}
                  alt="emoji"
                />
              </button>
              <button className="new-reply-field-icons">
                <img
                  src={require("../../assets/images/icons/red-close-icon.svg")}
                  alt="emoji"
                />
              </button>
            </h3>
            <p>
              {" "}
              Jobsmideast.com is the smartest job site in the Middle East. Our
              amazing team consists of some of the most experienced and talented
              developers, social media executives and account managers on the
              market, with years of experience in different sectors to make your
              experience more efficient & effortless.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="modal-top-section">
            <div className="modal-top-section-content">
              <span className="sub-heading">New reply</span>
            </div>
          </div>
          <Divider className="divider-div" />
          <Form layout={"vertical"} class>
            <Form.Item name="template-name" style={{ width: "95%" }}>
              <Input
                autoComplete={"" + Math.random()}
                className="type-text"
                size="small"
                type="text"
                placeholder="Template name"
              />
            </Form.Item>

            <Form.Item
              name="template-message"
              style={{ width: "95%", fontSize: "8px" }}>
              <TextArea
                // value={value}
                // onChange={this.onChange}
                placeholder="Jobsmideast.com is the smartest job site in the Middle East. ."
                autoSize={{ minRows: 4, maxRows: 4 }}
              />
            </Form.Item>
          </Form>

          <div className="new-reply-bottom-btns">
            <div className="main-div">
              {/* <Form form={form} onFinish={onFinish}> */}
              <div className="items">
                <span>
                  {" "}
                  <button className="new-reply-field-icons">
                    <img
                      src={require("../../assets/images/icons/pin.svg")}
                      alt="file"
                    />
                  </button>
                  <button className="new-reply-field-icons">
                    <img
                      src={require("../../assets/images/icons/emoji.svg")}
                      alt="emoji"
                    />
                  </button>
                </span>
                <span className="new-reply-field-btns">
                  {" "}
                  <Button
                    onClick={() => setReplyDropDown(!replyDropDown)}
                    className="cancel-btn"
                    type="gray"
                    themecolor="gray">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setReplyDropDown(!replyDropDown)}
                    themecolor="outlined blue">
                    Save
                  </Button>
                </span>

                {/* <Form.Item name="message" style={{ width: "100%" }}>
                    <Input
                      className="type-text"
                      size="small"
                      type="text"
                      placeholder="Type something to send"
                    />
                  </Form.Item> */}
                {/* 
                  <button className="text-field-btns">
                    <img
                      src={require("../../assets/images/icons/voice.svg")}
                      alt="voice"
                    />
                  </button> */}
                {/* <Button htmlType="submit" className="text-field-btns">
                    <img
                      src={require("../../assets/images/icons/send.svg")}
                      alt="send"
                    />
                  </Button> */}
              </div>
              {/* </Form> */}
            </div>
          </div>
        </>
      )}
    </div>
  );

  // const menu = (
  //   <div className="saved-message-dropdown">
  //     {replyDropDown ? (
  //       <button onClick={() => setReplyDropDown(!replyDropDown)}>
  //         asdkasdj
  //       </button>
  //     ) : (
  //       <button onClick={() => setReplyDropDown(!replyDropDown)}>
  //         asdkasvgyvygvygvvdj
  //       </button>
  //     )}
  //   </div>
  // );

  return (
    <div className="height-fix">
      <div className="main-chat-wrapper">
        {/* Chat List */}
        <div className="chatlist-container">
          <ChatList
            isLoading={isLoading}
            onChatHeadClick={onChatHeadClick}
            onChatSearch={onChatSearch}
            onChatDelete={onChatDelete}
            conversations={conversations}
            jobseekerRole={jobseekerRole}
          />
        </div>

        {/* Messages */}
        <div className={`chat-wrapper ${showChat && "chat-wrapper-show"}`}>
          <div className="chat-header">
            <div className="back-btn" onClick={() => setShowChat(false)}>
              <img
                className="back-icon"
                src={require("../../assets/images/icons/Back.svg")}
                alt=""
              />
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setShowViewProfile(true)}
              className="view-profile-btn">
              <span>View Profile</span>
            </div>
          </div>

          {showChat && (
            <>
              <div className="chat-inner">
                {chatRef.current.items.map((data) => (
                  <div
                    className={`message ${
                      isReciever(data.senderId) ? "is-sender" : "is-reciever"
                    }`}>
                    <ChatBubble
                      data={data}
                      selectedChat={selectedChat}
                      userStatus="user-status-active"
                      type={
                        isReciever(data.senderId) ? "isSender" : "isReceiver"
                      }
                    />
                  </div>
                ))}

                {/* <div className={`message is-reciever`}>
                  <ChatBubble type="isReciever" />
                </div> */}
              </div>

              <div className="c-chat-input">
                <ChatInput
                  selectedChat={selectedChat}
                  sendMessage={onSendMessage}
                />

                {/* <Popover
                  trigger={["click"]}
                  placement="topLeft"
                  overlayClassName="saved-message-drop-down-popover-class"
                  content={savedRepliesDropDown}>
                  <Button
                    htmlType="submit"
                    className="rounded plus-btn-text-field">
                    <PlusOutlined />
                  </Button>
                </Popover> */}
              </div>

              <div className="blur-div"></div>
            </>
          )}
        </div>

        {/* T E S T I N G _______ C H A T _______ D O     N O T   D E L E T E */}
        {/* <TestChat /> */}

        {/* User Profile */}
        {showChat && (
          <div
            className={`user-profile ${
              showViewProfile && "user-profile-show"
            }`}>
            <div className="chat-header">
              <div
                className="back-btn"
                onClick={() => setShowViewProfile(false)}>
                <img
                  src={require("../../assets/images/icons/Back.svg")}
                  alt=""
                />
              </div>
            </div>
            <UserProfile //export default as CUserProfile
              sentFiles={sentFiles}
              recievedFiles={recievedFiles}
              user={getReceiver(selectedChat)}
            />

            {width > 540 && width < 1025 && (
              <Modal
                onHide={() => setShowViewProfile(false)}
                className="c-modal right-side"
                show={showViewProfile}>
                <UserProfile
                  sentFiles={sentFiles}
                  recievedFiles={recievedFiles}
                  user={getReceiver(selectedChat)}
                />
              </Modal>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
