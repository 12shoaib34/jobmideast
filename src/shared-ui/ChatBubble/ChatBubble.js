import React, { useState } from "react";

import { Input, Form, Select, Image } from "antd";

import * as Rules from "../../utils/rules";
import CModal from "../../shared-ui/Modal/Modal";
import CButton from "../../shared-ui/Button/Button";
import ProfileAvatar from "../../shared-ui/Avatar/Avatar";
import CInterviewCard from "../../shared-ui/InterviewCard/InterviewCard";
import { getFullName, readableTime } from "../../utils/helper";
import { FcDocument } from "react-icons/fc";
import defaultImage from "../../assets/images/default.png";

const { Option } = Select;
const { TextArea } = Input;

const getUser = (selectedChat, type) => {
  if (type === "isReceiver") {
    return selectedChat.receiver;
  }
  return selectedChat.sender;
};

const renderDocument = (docType) => {
  if (docType === "doc") {
    return (
      <img
        src={require("../../assets/images/icons/filetypes/Wfile.svg")}
        style={{ marginRight: 5 }}
      />
    );
  } else if (docType === "pdf") {
    return (
      <img
        src={require("../../assets/images/icons/filetypes/PFile.svg")}
        style={{ marginRight: 5 }}
      />
    );
  }
  return <FcDocument size="50px" />;
};

const CChatBubble = ({
  data = {},
  selectedChat = {},
  type = "isReciever",
  typeofMsg = "",
  userStatus = "user-status-offline",
}) => {
  const [isInterviewCardVisible, setInterviewCardVisible] = useState(false);
  const [isInterviewDetailVisible, setInterviewDetailVisible] = useState(false);

  let showModal = () => {
    setInterviewDetailVisible(!isInterviewDetailVisible);
  };

  const getImage = () => {
    const user = getUser(selectedChat, type);
    if (user?.jobSeekerProfile) {
      return user?.jobSeekerProfile?.profilePhoto || null;
    } else if (user?.employerProfiles) {
      return user?.employerProfiles?.profilePhoto || null;
    }
  };

  return (
    <>
      <div className="d-flex flex-column w-100 ">
        <div className={`chat-bubble ${type}`}>
          <div className="chat-head">
            <ProfileAvatar
              size="small"
              userStatus={userStatus}
              image={getImage()}
            />
          </div>
          {/* {console.log("defaultImage", defaultImage)} */}
          <div className="text">
            <div className="title">
              {getFullName(getUser(selectedChat, type))}
            </div>
            <div className="time-stamp">{readableTime(data.dateTime)}</div>
            {data.messageType == "file" ? (
              <div>
                {data.fileType == "video" ? (
                  <video className="img-view" controls autoplay>
                    <source src={data.message} type="video/mp4" />
                  </video>
                ) : data.fileType == "image" ? (
                  <Image className="img img-view" src={data.message} />
                ) : (
                  <div>
                    <span className="download-media">
                      {renderDocument(data?.docType)}
                      <a href={data?.message} className="download">
                        Download
                      </a>
                    </span>
                  </div>
                )}
              </div>
            ) : data.fileType == "document" ? (
              <div className="chat-message">
                <a className="download-media" href={data.message} download>
                  {data.message.split("/")[3]}
                </a>{" "}
              </div>
            ) : (
              <div
                style={{ whiteSpace: "pre-line" }}
                className={`chat-message`}>
                {data.message}
              </div>
            )}

            {typeofMsg === "invitation" ? (
              <div>
                <div className="title-invitation">
                  You have recieved an Interview request.
                </div>
                <CButton onClick={showModal} className={`green`}>
                  View Details
                </CButton>
              </div>
            ) : null}
          </div>
        </div>

        {isInterviewCardVisible ? (
          <div className="my-2 align-self-center">
            {" "}
            <CInterviewCard type="viewDetails" />{" "}
          </div>
        ) : null}
        <CModal
          className="c-interview-modal center medium"
          show={isInterviewDetailVisible}
          onHide={showModal}>
          <div className="c-interview-modal-header">
            <h1> Face to face interview</h1>
          </div>

          <div className="form-rows mt-5">
            <Form.Item name="id" className="c-input">
              <label htmlFor="company-name">Company Name</label>

              <Input
                autoComplete={"" + Math.random()}
                className="ant-input-lg"
                value=""
                id="company-name"
              />
            </Form.Item>

            <Form.Item name="id" className="c-input">
              <label htmlFor="company-name">Date</label>

              <Input
                autoComplete={"" + Math.random()}
                className="ant-input-lg"
                value=""
                id="company-name"
              />
            </Form.Item>

            <Form.Item name="id" className="c-input">
              <label htmlFor="company-name">Start time</label>

              <Input
                autoComplete={"" + Math.random()}
                className="ant-input-lg"
                value=""
                id="company-name"
              />
            </Form.Item>

            <Form.Item name="id" className="c-input">
              <label htmlFor="company-name">Duration</label>

              <Input
                autoComplete={"" + Math.random()}
                className="ant-input-lg"
                value=""
                id="company-name"
              />
            </Form.Item>

            <Form.Item name="id" className="c-input">
              <label htmlFor="company-name">Job reference</label>

              <Input
                autoComplete={"" + Math.random()}
                className="ant-input-lg"
                value=""
                id="company-name"
              />
            </Form.Item>

            <Form.Item name="id" className="c-input">
              <Form.Item
                name="savedFilters"
                className="c-input select-lg"
                rules={null}>
                <label htmlFor="company-name">Interview panel</label>

                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  className="select-lg"
                  placeholder="Saved filters">
                  <Option value="Adam"> Adam </Option>
                  <Option value="July"> July </Option>
                </Select>
              </Form.Item>
            </Form.Item>

            <Form.Item name="id" className="c-text-box">
              <Form.Item
                name="savedFilters"
                className="c-input c-form p-0"
                rules={null}>
                <label htmlFor="company-name">Other info</label>

                <TextArea
                  placeholder="Please ensure you are dressed smart and bring all of your paper work"
                  className="c-text-area"
                  rows={4}
                />
              </Form.Item>
            </Form.Item>

            <Form.Item name="id" className="c-text-box">
              <Form.Item
                name="savedFilters"
                className="c-input c-form p-0 w-100"
                rules={null}>
                <label htmlFor="company-name">Location</label>

                <Input
                  autoComplete={"" + Math.random()}
                  placeholder=""
                  className="c-input w-100"
                  value=""
                  id="company-name"
                />
              </Form.Item>
            </Form.Item>
          </div>

          <div className="form-rows">
            <CButton className="mx-2" themecolor="outlined blue">
              ACCEPT
            </CButton>
            <CButton className="mx-2" themecolor="green">
              REJECT
            </CButton>
          </div>
        </CModal>
      </div>
    </>
  );
};

export default CChatBubble;
