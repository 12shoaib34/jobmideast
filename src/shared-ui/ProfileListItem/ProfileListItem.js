import React, { useState, useEffect } from "react";
import Modal from "../../shared-ui/Modal/Modal";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import ProfileAvatar from "../Avatar/Avatar";
import UserProfile from "../../app-ui/UserProfile/UserProfile";

import { BsTrash } from "react-icons/bs";
import { Button, Checkbox, Divider, Tooltip, Popover } from "antd";
import { showSuccessMessage } from "../../utils/message";

const getIcon = (starred, setStarred) => {
  if (!starred) {
    return <AiOutlineStar onClick={() => setStarred(!starred)} />;
  }
  return <AiFillStar onClick={() => setStarred(!starred)} />;
};

const ProfileListItem = ({
  onClick,
  name,
  jobTitle,
  userImage,
  location,
  initiateChat = null,
  userId,
  record = null,
}) => {
  let handleProfile = (record) => {
    setJobseekerId(record?.userId);
    setShowProfile(!showProfile);
  };

  const [starred, setStarred] = useState(false);
  const [selected, setSelected] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [jobseekerId, setJobseekerId] = useState(null);

  return (
    <>
      <div className={`profile-list-item ${selected ? "selected" : ""}`}>
        {/* <Checkbox onClick={() => setSelected(!selected)} /> */}

        <div
          className="profile-head"
          onClick={() => (record ? handleProfile(record) : null)}>
          <ProfileAvatar image={userImage} size="medium" />
        </div>

        <div className="profile-text">
          <div
            onClick={() => (record ? handleProfile(record) : null)}
            className="title">
            {name}
          </div>
          <div className="subtitle">{jobTitle}</div>
          <div className="subtitle">Current location: {location}</div>
          {/* <div className="text">{lastMessage}</div>
          <div className="date">{lastMessageDate}</div> */}
        </div>

        <div className="profile-item-btns">
          <div>
            {/* <Tooltip title="favorite">
              <Button
                type="text"
                shape="circle"
                icon={getIcon(starred, setStarred)}
                onClick={() => {}}
              />
            </Tooltip> */}
            {/* <span>
              <img
                className="icon-btn mr-1 call"
                src={require("../../assets/images/icons/Call.svg")}
              />
            </span> */}
            {/* {console.log("record: ", record)} */}
            <Popover
              placement="bottom"
              overlayClassName="popover-mobile-number"
              content={
                <span>
                  {"+" + record?.mobile}
                  <span
                    className="copy-text"
                    onClick={() => {
                      navigator.clipboard.writeText(record?.mobile);
                      showSuccessMessage("Number copied to clipboard");
                    }}>
                    <img
                      className="ml-2"
                      style={{ width: "10px" }}
                      src={require("../../assets/images/icons/Copy.svg")}
                    />
                    <span style={{ fontSize: "12px" }}>Copy</span>
                  </span>
                </span>
              }>
              <img
                // onClick={record?.mobile ? null : () => setConnectModal(true)}
                className="icon-btn ml-2 mr-2"
                src={require("../../assets/images/icons/profile/Call.svg")}
              />
            </Popover>
            <span>
              <img
                onClick={initiateChat ? initiateChat(userId) : null}
                className="chat"
                src={require("../../assets/images/icons/directchat-icon.svg")}
              />
            </span>
          </div>
          {/* <div>
            <Tooltip title="delete">
              <Button
                className="chat-delete-btn"
                type="text"
                shape="circle"
                icon={<BsTrash />}
                onClick={onChatDelete}
              />
            </Tooltip>
          </div> */}
        </div>

        {/* Profile view Modal */}
        <Modal
          className="profile-modal center"
          show={showProfile}
          onHide={() => setShowProfile(false)}>
          <UserProfile profileDetails={jobseekerId} />
        </Modal>
      </div>
      {/* <Divider /> */}
    </>
  );
};

export default ProfileListItem;
