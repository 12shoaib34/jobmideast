import React, { useState, useEffect } from "react";

import { BsTrash } from "react-icons/bs";
import { Button, Checkbox, Divider, Tooltip } from "antd";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import ProfileAvatar from "../Avatar/Avatar";

const getIcon = (starred, setStarred) => {
  if (!starred) {
    return <AiOutlineStar onClick={() => setStarred(!starred)} />;
  }
  return <AiFillStar onClick={() => setStarred(!starred)} />;
};

const ChatListItem = ({
  userStatus = "user-status-active",
  onClick,
  onChatDelete,
  name,
  jobTitle,
  userImage,
  lastMessage,
  lastMessageDate,
}) => {
  const [starred, setStarred] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <>
      <div className={`chat-list-item ${selected ? "selected" : ""}`}>
        {/* <Checkbox onClick={() => setSelected(!selected)} /> */}
        <Checkbox checked={selected} className="green" onClick={() => setSelected(!selected)} />

        <div className="chat-head" onClick={onClick}>
          <ProfileAvatar
            image={userImage}
            size="small"
            userStatus={userStatus}
          />
        </div>

        <div className="chat-text" onClick={onClick}>
          <div className="title">{name}</div>
          <div className="subtitle">{jobTitle}</div>
          <div className="text">{lastMessage}</div>
          <div className="date">{lastMessageDate}</div>
        </div>
        <div className="chat-item-btns">
          <div>
            <Tooltip title="Favorite">
              <Button
                type="text"
                shape="circle"
                icon={getIcon(starred, setStarred)}
                onClick={() => {}}
              />
            </Tooltip>
          </div>
          {selected && (
            <div>
              <Tooltip title="Delete">
                <Button
                  type="text"
                  shape="circle"
                  icon={<BsTrash />}
                  onClick={()=>{
                    onChatDelete()
                    setSelected(false)
                  }}
                />
              </Tooltip>
            </div>
          )}
        </div>

        {/* <div className="chat-item-btns">
          <div>
            <Tooltip title="favorite">
              <Button
                type="text"
                shape="circle"
                icon={getIcon(starred, setStarred)}
                onClick={() => {}}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip title="delete">
              <Button
                className="chat-delete-btn"
                type="text"
                shape="circle"
                icon={<BsTrash />}
                onClick={onChatDelete}
              />
            </Tooltip>
          </div>
        </div> */}
      </div>
      <Divider />
    </>
  );
};

export default ChatListItem;
