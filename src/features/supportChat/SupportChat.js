import React, { useEffect } from "react";
import { useState } from "react";

import ChatList from "../../app-ui/ChatList/ChatList";
import ChatBubble from "../../shared-ui/ChatBubble/ChatBubble";
import ChatInput from "../../shared-ui/ChatInput/ChatInput";
import Modal from "../../shared-ui/Modal/Modal";
import UserProfile from "../../shared-ui/UserProfile/UserProfile";
import { useWindowSize } from "../../utils/helper";
import "./_SupportChat.scss";
import "./_Responsive.scss";

function SupportChat({
  type = "is-reciever invitation",
  typeofMsg = "invitation",
  userStatus = "user-status-offline",
}) {
  const [showChat, setShowChat] = useState(false);
  const [showViewProfile, setShowViewProfile] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (width < 540) {
      setShowViewProfile(false);
    }
  }, [width]);

  return (
    <div className="coming-soon">
      <h2>Coming soon...</h2>
    </div>
    // <div className="support-chat">
    //   <div className="main-chat-wrapper">
    //     <div className="chatlist-container">
    //       <ChatList setShowChat={setShowChat} />
    //     </div>
    //     <div
    //       className={`chat-wrapper ${showChat ? "chat-wrapper-show" : null}`}
    //     >
    //       <div className="chat-header">
    //         <div className="back-btn" onClick={() => setShowChat(false)}>
    //           <img
    //             src={require("../../assets/images/icons/back-button-black.svg")}
    //             alt=""
    //           />
    //         </div>
    //         <div
    //           style={{ cursor: "pointer" }}
    //           onClick={() => {
    //             setShowViewProfile(true);
    //           }}
    //           className="view-profile-btn"
    //         >
    //           <span>View Profile</span>
    //         </div>
    //       </div>
    //       <div className="chat-inner">
    //         <div className={`message ${type}`}>
    //           <ChatBubble
    //             userStatus={userStatus}
    //             type="isReciever"
    //             typeofMsg={typeofMsg}
    //           />
    //         </div>

    //         <br />

    //         <div className={`message is-sender`}>
    //           <ChatBubble
    //             userStatus="user-status-active"
    //             className="is-sender"
    //             type="isSender"
    //           />
    //         </div>

    //         <br />

    //         <div className={`message ${type}`}>
    //           <ChatBubble type="isReciever" />
    //         </div>

    //         <br />

    //         <div className={`message ${type}`}>
    //           <ChatBubble type="isReciever" />
    //         </div>
    //       </div>

    //       <div className="c-chat-input">
    //         <ChatInput />
    //       </div>

    //       <div className="blur-div"></div>
    //     </div>

    //     <div
    //       className={`user-profile ${
    //         showViewProfile ? "user-profile-show" : ""
    //       }`}
    //     >
    //       <div className="chat-header">
    //         <div className="back-btn" onClick={() => setShowViewProfile(false)}>
    //           <img
    //             src={require("../../assets/images/icons/back-button-black.svg")}
    //             alt=""
    //           />
    //         </div>
    //       </div>
    //       <UserProfile />
    //       {width > 540 && width < 769 ? (
    //         <Modal
    //           onHide={() => setShowViewProfile(false)}
    //           className="c-modal right-side"
    //           show={showViewProfile}
    //         >
    //           <UserProfile />
    //         </Modal>
    //       ) : null}
    //     </div>
    //   </div>
    // </div>
  );
}

export default SupportChat;
