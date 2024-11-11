import React, { useEffect, useRef, useState } from "react";

import {
  Menu,
  Dropdown,
  Divider,
  Checkbox,
  Form,
  Input,
  Select,
  Spin,
  Slider,
  Empty,
} from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";

import { getData } from "country-list";

import { useAppSelector } from "../../store/hooks";
import { selectEmployerProfile } from "../../features/auth/slice";
import ChatListItem from "../../shared-ui/ChatListItem/ChatListItem";
import {
  getFullName,
  readableShortDateTime,
  useWindowSize,
} from "../../utils/helper";
import Button from "../../shared-ui/Button/Button";
import Modal from "../../shared-ui/Modal/Modal";
import FilterModal from "../filterModal/FilterModal";

const searchIcon = require("../../assets/images/icons/search_icon.svg");

const { Option } = Select;

const menuFilter = (
  <Menu>
    <Menu.Item key="Newest">
      <a href="#">Newest</a>
    </Menu.Item>

    <Menu.Item key="Oldest">
      <a href="#">Oldest</a>
    </Menu.Item>

    <Menu.Item key="Starred">
      <a href="#">Starred</a>
    </Menu.Item>

    <Menu.Item key="Unread">
      <a href="#">Unread</a>
    </Menu.Item>
  </Menu>
);

const ChatList = ({
  conversations,
  onChatHeadClick,
  onChatSearch,
  onChatDelete,
  isLoading,
  jobseekerRole,
}) => {
  const profile = useAppSelector(selectEmployerProfile);
  const [filterModalShow, setFilterModalShow] = useState(false);
  const [userId, setUserId] = useState(null);

  const chatListPanel = useRef();

  const getUser = (d) => {
    if (profile.userId === d.userId1) {
      return d.user2;
    }
    return d.user1;
  };

  const getUserName = (d) => {
    const user = getUser(d);
    return getFullName(user);
  };

  const getUserImage = (d) => {
    const user = getUser(d);

    if (user.employerProfiles) {
      return user?.profilePhoto || user?.employerProfiles?.profilePhoto || null;
    }
    return user?.profilePhoto || user?.jobSeekerProfile?.profilePhoto || null;
  };
  const size = useWindowSize();
  useEffect(() => {
    if (conversations.length > 0 && size.width > 1024)
      onChatHeadClick(conversations[0]);
      console.log("conversations -> ", conversations)
  }, [conversations]);

  // useEffect(() => {
  //   if (conversations?.length && !userId) {
  //     onChatHeadClick(conversations[0]);
  //     console.log(conversations[0]);
  //   }
  // }, [conversations, userId]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId === null) {
      setUserId(null);
    } else {
      setUserId(userId);
    }
    return () => {
      localStorage.removeItem("userId");
    };
  }, []);

  useEffect(() => {
    // console.log("conversationos -> ", conversations);
    if (conversations?.length && userId) {
      const c = conversations?.find((item) => item.userId2 == userId);

      onChatHeadClick(c);
    }
    //  else if (conversations?.length && !userId) {
    //   onChatHeadClick(conversations[0]);
    //   console.log(conversations[0]);
    // }
  }, [conversations, userId]);

  return (
    <div ref={chatListPanel} id="chat-dropdown" className="chat-list-panel">
      {/* Filter */}
      <Form className="search-inner-div" onFinish={onChatSearch}>
        <Form.Item name="search" className="c-input c-input-with-icon w-100">
          <Input
            autoComplete="off"
            placeholder="Search Name &amp; Job title"
            className="xs w-100"
            type="text"
            prefix={
              <img className="input-icon" src={searchIcon} alt="" />
            }></Input>
        </Form.Item>
        {/* <Dropdown
          overlayClassName="c-overlay-filter-menu"
          overlay={menuFilter}
          placement="bottomRight"
          trigger={["click"]}
          className="dropdown">
          <div className="filters">
            <BsThreeDotsVertical className="ml-2" size="20px" />
          </div>
        </Dropdown> */}
      </Form>

      <Divider />

      {/* Chat Type Selection */}
      {/* <div className="selector-div">
        <div className="d-flex align-items-center">
          <Checkbox className="green" />

          <Select
            onDropdownVisibleChange={(e) =>
              e ? setnewMessageCounter(true) : setnewMessageCounter(false)
            }
            getPopupContainer={() => chatListPanel.current}
            dropdownClassName="chat-filter-role-type"
            className="dropdown"
            defaultValue="Employers"
            onChange={handleChange}>
            {jobseekerRole?.map((value, key) => (
              <Option
                key={key}
                style={{ display: "flex", justifyContent: "space-between" }}
                value="employers">
                <span>{value?.title}</span>{" "}
              </Option>
            ))}
          </Select>

          {!newMessageCounter && <div className="notification-count">5</div>}
        </div>
     
      </div>

      <Divider /> */}

      {/* Chat list */}
      <div className="chat-list-scroll">
        <Spin spinning={isLoading}>
          {conversations?.length === 0 && !isLoading && (
            <>
              {/* <Empty
              className="columns-center"
              style={{
                fontFamily: "Gordita-Regular",
                fontSize: "12px",
                marginTop: "300px",
              }}
              imageStyle={{ display: "none" }}
              description={"Currently you have no conversations available"}
            />
            */}
              <>
                <div className="chat-empty">
                  <h1>Welcome to Direct Chat</h1>
                  <p>
                    Once you are connected with a candidate you will be able to
                    start a chat. Your messages will show here.
                  </p>
                </div>
              </>
            </>
          )}
          {conversations?.map((d, i) => (
            <ChatListItem
              key={i}
              userStatus="user-status-active"
              onClick={() => onChatHeadClick(d)}
              name={getUserName(d)}
              jobTitle={d.jobTitle}
              userImage={getUserImage(d)}
              lastMessage={d.message}
              lastMessageDate={readableShortDateTime(d.updatedAt)}
              onChatDelete={() => onChatDelete(d.id)}
            />
          ))}
        </Spin>
        <FilterModal
          filterModalShow={filterModalShow}
          setFilterModalShow={setFilterModalShow}
        />
      </div>
    </div>
  );
};

export default ChatList;
