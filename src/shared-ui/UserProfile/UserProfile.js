import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { GiCutDiamond } from "react-icons/gi";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Row, Col, DatePicker, Empty } from "antd";
import { ImCalendar } from "react-icons/im";
import { FcVideoFile, FcImageFile, FcDocument } from "react-icons/fc";
import {
  Dropdown,
  Menu,
  Tabs,
  Form,
  Input,
  Select,
  Checkbox,
  Divider,
} from "antd";
import Avatar from "../Avatar/Avatar";
import Modal from "../../shared-ui/Modal/Modal";
import Button from "../../shared-ui/Button/Button";
import UserProfile from "../../app-ui/UserProfile/UserProfile";

import { getFullName } from "../../utils/helper";

import * as Rules from "../../utils/rules";

import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectAppliedForJobs,
  selectInterviewPanelList,
  selectConversations,
} from "../../features/chat/slice";
import {
  getAppliedJobs,
  getInterviewPanel,
  deleteConversationFiles,
} from "../../features/chat/thunk";
import { selectNewProfiles } from "../../features/dashboard/slice";
// import { selectEmployerProfile } from "../../features/auth/slice";

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const CUserProfile = ({
  //used as UserProfile in chat.js
  user,
  userStatus = "user-status-active",
  sentFiles,
  recievedFiles,
}) => {
  const dispatch = useAppDispatch();
  const [interviewModalForm] = Form.useForm();
  const [showInterviewDetailsModal, setShowInterviewDetailsModal] =
    useState(false);
  const [showVideoQuestionareModal, setShowVideoQuestionareModal] =
    useState(false);
  const [timeLimit, setTimeLimit] = useState(5);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [inviteToChat, setInviteToChat] = useState(false);
  const conversations = useAppSelector(selectConversations);
  const jobsAppliedFor = useAppSelector(selectAppliedForJobs);
  const interviewPanelList = useAppSelector(selectInterviewPanelList);
  const [showProfile, setShowProfile] = useState(false);
  const newProfiles = useAppSelector(selectNewProfiles);
  const handleVideoInterviewSubmit = (v) => {
    console.log(v);
  };
  //issue here, check halalsenpai
  useEffect(() => {
    dispatch(getAppliedJobs(user?.id));
  }, [user]);

  useEffect(() => {
    dispatch(getInterviewPanel());
  }, []);

  const handelDeleteFilesWithAPI = (id) => {
    dispatch(deleteConversationFiles(id))
    console.log("OD", id);
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={() => setShowInterviewDetailsModal(true)}>
          Arrange face to face interview
        </div>
        <Modal
          backdropClassName="video-questionare-back-drop"
          className="c-interview-modal center medium modal-responsive"
          show={showInterviewDetailsModal}
          onHide={() => setShowInterviewDetailsModal(false)}
        >
          <Form
            onFinish={handleVideoInterviewSubmit}
            form={interviewModalForm}
            layout="vertical"
          >
            <Row className="c-interview-modal-header">
              <Col span={10}>
                <div classname="id">
                  <h1> Face to face interview</h1>
                </div>
              </Col>
              <Col span={14}>
                <Form.Item
                  name="savedFilters"
                  className="c-input w-100 select-lg"
                  rules={null}
                >
                  <Select
                    getPopupContainer={(trigger) => trigger.parentNode}
                    className="select-lg face-interview-panel scroll-to-smooth"
                    placeholder="Saved filters"
                  ></Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[32, 16]} className="face-interview">
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item
                  name="companyName"
                  rules={Rules.requiredRule}
                  label="Company Name"
                  className="c-input w-100"
                >
                  <Input autoComplete={"" + Math.random()} id="company-name" />
                </Form.Item>
              </Col>

              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item
                  name="id"
                  required
                  label="Date"
                  className="c-date-picker w-100"
                >
                  <DatePicker
                    // allowClear="true"
                    style={{ width: "100%" }}
                    suffixIcon={<ImCalendar fontSize="17px" />}
                    className="W-100"
                    showTime="true"
                    format="DD-MM-YYYY HH:mm"
                  />
                </Form.Item>
              </Col>

              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item
                  name="id"
                  required
                  label="Start time"
                  className="c-input w-100"
                >
                  <Input autoComplete={"" + Math.random()} id="company-name" />
                </Form.Item>
              </Col>

              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item
                  name="id"
                  required
                  label="Duration"
                  className="c-input w-100"
                >
                  <Input autoComplete={"" + Math.random()} id="company-name" />
                </Form.Item>
              </Col>

              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item
                  name="id"
                  required
                  label="Attach job"
                  className="c-input w-100"
                >
                  <Select
                    getPopupContainer={(trigger) => trigger.parentNode}
                    className="select-lg face-interview-panel scroll-to-smooth"
                    placeholder="select"
                  >
                    {jobsAppliedFor[0]?.employmentActivities?.map((i) => (
                      <Option value={i.jobPost?.jobTitle?.id}>
                        {" "}
                        {i.jobPost?.jobTitle?.title}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item
                  required
                  label="Interview panel"
                  name="panelUsers"
                  className="c-input w-100 select-lg"
                  rules={null}
                >
                  <Select
                    mode="multiple"
                    maxTagCount="responsive"
                    getPopupContainer={(trigger) => trigger.parentNode}
                    className="select-lg face-interview-panel scroll-to-smooth"
                    placeholder="Saved filters"
                  >
                    {interviewPanelList?.map((d) => (
                      <Option value={d?.user?.id}>
                        {getFullName(d?.user)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12} xs={{ span: 24 }} md={{ span: 24 }}>
                <Form.Item
                  required
                  label="Other info"
                  name="notes"
                  className="c-input"
                  rules={null}
                >
                  <TextArea
                    placeholder="Please ensure you are dressed smart and bring all of your paper work"
                    rows={4}
                  />
                </Form.Item>
              </Col>

              <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                <Form.Item
                  required
                  label="Location"
                  name="location"
                  className="c-input"
                  rules={null}
                >
                  <Input
                    autoComplete={"" + Math.random()}
                    placeholder=""
                    id="company-name"
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="form-rows">
              <Col className="flex" span={12} xs={{ span: 12 }}>
                <Button className="mx-2 " themecolor="outlined-green">
                  Save template
                </Button>
              </Col>
              <Col className="flex" span={12} xs={{ span: 12 }}>
                <Button className="mx-2 " themecolor="outlined-green">
                  Send
                </Button>
              </Col>
            </div>
          </Form>
        </Modal>
      </Menu.Item>
      <Menu.Item>
        <div
          onClick={() => setShowVideoQuestionareModal(true)}
          style={{ color: "#5271FF" }}
        >
          send video questionnaire
          <GiCutDiamond fontSize="12px" style={{ marginBottom: "2px" }} />
        </div>
      </Menu.Item>
      <Menu.Item>
        <div>Add to a list</div>
      </Menu.Item>
      <Menu.Item>
        <div>Add to a job</div>
      </Menu.Item>
    </Menu>
  );
  const handleProfile = () => {
    setShowProfile(!showProfile);
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
  return (
    <>
      <div className="profile-container">
        <div className="top-section">
          <div className="about-user">
            <Avatar
              userStatus={userStatus}
              image={
                user?.employerProfiles?.profilePhoto ||
                user?.jobSeekerProfile?.profilePhoto
              }
              onClick={user?.jobSeekerProfile && handleProfile}
            />
            {/* <ProfileCard
              userImage="1"
              userName={user.jobseeker?.firstName}
              userJob={user?.jobseeker?.jobSeekerProfile?.jobTitle?.title}
              userImage={user?.jobseeker?.jobSeekerProfile?.profilePhoto}
              handleClick={() => {
                handleProfile();
              }}
            /> */}

            <h2
              className="user-name"
              onClick={user?.jobSeekerProfile && handleProfile}
            >
              {getFullName(user)}
            </h2>
            <p className="user-info">
              {user?.jobSeekerProfile?.jobTitle?.title}
            </p>

            <div className="contact-btns">
              {/* <Button themecolor="rounded green mx-2">
                <MdPhoneInTalk />
              </Button>
              <Button themecolor="rounded blue mx-2  ">
                <FaVideo />
              </Button>
              <Dropdown
                className="add-media-btn"
                getPopupContainer={(trigger) => trigger.parentNode}
                overlay={menu}
                overlayClassName={"user-profile-menu"}
                placement="bottomRight"
                trigger={["click"]}>
                <Button themecolor="rounded blue mx-2 ">
                  <PlusOutlined />
                </Button>
              </Dropdown> */}
              <Modal
                backdropClassName="video-questionare-back-drop"
                className="video-questionare-modal center medium"
                show={showVideoQuestionareModal}
                onHide={() => setShowVideoQuestionareModal(false)}
              >
                <div className="video-questionare-modal-header">
                  <h1>Video Questionare</h1>
                  <span className="select-lg">
                    <Select
                      className="scroll-to-smooth"
                      placeholder="Choose from saved templates"
                    ></Select>
                  </span>
                </div>

                <Form
                  layout="vertical"
                  style={{ minHeight: "500px" }}
                  className="d-flex justify-content-between flex-column video-modal-responsive"
                >
                  <div className="video-modal-fields">
                    <div className="form-rows mt-5">
                      <Form.Item
                        name="id"
                        label="Question 1"
                        className="c-input w-100"
                      >
                        <Input
                          autoComplete={"" + Math.random()}
                          className="ant-input-w100"
                          id="company-name"
                        />
                      </Form.Item>
                    </div>
                    <div className="form-rows">
                      <Form.Item
                        name="id"
                        label="Answer time"
                        className="c-input w-50 counter"
                      >
                        <Button
                          onClick={
                            timeLimit >= 10
                              ? () => setTimeLimit(timeLimit - 5)
                              : () => setTimeLimit(5)
                          }
                          className="rounded minus"
                        >
                          <MinusOutlined />
                        </Button>
                        <Button
                          onClick={
                            timeLimit <= 25
                              ? () => setTimeLimit(timeLimit + 5)
                              : () => setTimeLimit(30)
                          }
                          className="rounded plus"
                        >
                          <PlusOutlined />
                        </Button>
                        <Input
                          autoComplete={"" + Math.random()}
                          className="ant-input-w100"
                          value={`${timeLimit} minutes max `}
                        />
                      </Form.Item>
                      <Form.Item
                        name="id"
                        className="w-50 align-items-end  flex"
                      >
                        <span className="d-flex justify-content-end align-items-center">
                          <span className="mr-2">Add another</span>
                          <Button
                            onClick={() =>
                              setQuestionCounter(
                                questionCounter < 3
                                  ? questionCounter + 1
                                  : questionCounter
                              )
                            }
                            className="rounded d-flex justify-content-center"
                          >
                            <PlusOutlined />
                          </Button>
                        </span>
                      </Form.Item>
                    </div>
                  </div>
                  {questionCounter === 2 || questionCounter > 2 ? (
                    <div>
                      <div className="form-rows">
                        <Form.Item
                          name="id"
                          label="Question 2"
                          className="c-input w-100"
                        >
                          <Input
                            autoComplete={"" + Math.random()}
                            className="ant-input-w100"
                            id="company-name"
                          />
                        </Form.Item>
                      </div>
                      <div className="form-rows">
                        <Form.Item
                          name="id"
                          label="Answer time"
                          className="c-input w-50 counter"
                        >
                          <Button
                            onClick={
                              timeLimit >= 10
                                ? () => setTimeLimit(timeLimit - 5)
                                : () => setTimeLimit(5)
                            }
                            className="rounded minus"
                          >
                            <MinusOutlined />
                          </Button>
                          <Button
                            onClick={
                              timeLimit <= 25
                                ? () => setTimeLimit(timeLimit + 5)
                                : () => setTimeLimit(30)
                            }
                            className="rounded plus"
                          >
                            <PlusOutlined />
                          </Button>
                          <Input
                            autoComplete={"" + Math.random()}
                            className="ant-input-w100"
                            value={`${timeLimit} minutes max `}
                          />
                        </Form.Item>
                        <Form.Item name="id" className="w-50 align-items-end  ">
                          <span className="d-flex justify-content-end align-items-center">
                            <span className="mr-2">Add another</span>
                            <Button
                              onClick={() =>
                                setQuestionCounter(
                                  questionCounter < 3
                                    ? questionCounter + 1
                                    : questionCounter
                                )
                              }
                              className="rounded d-flex justify-content-center"
                            >
                              <PlusOutlined />
                            </Button>
                          </span>
                        </Form.Item>
                      </div>
                    </div>
                  ) : null}
                  {questionCounter === 3 ? (
                    <div>
                      <div className="form-rows">
                        <Form.Item
                          name="id"
                          label="Question 3"
                          className="c-input w-100"
                        >
                          <Input
                            autoComplete={"" + Math.random()}
                            className="ant-input-w100"
                            id="company-name"
                          />
                        </Form.Item>
                      </div>
                      <div className="form-rows">
                        <Form.Item
                          name="id"
                          label="Answer time"
                          className="c-input w-50 counter"
                        >
                          <Button
                            onClick={
                              timeLimit >= 10
                                ? () => setTimeLimit(timeLimit - 5)
                                : () => setTimeLimit(5)
                            }
                            className="rounded minus"
                          >
                            <MinusOutlined />
                          </Button>
                          <Button
                            onClick={
                              timeLimit <= 25
                                ? () => setTimeLimit(timeLimit + 5)
                                : () => setTimeLimit(30)
                            }
                            className="rounded plus"
                          >
                            <PlusOutlined />
                          </Button>
                          <Input
                            autoComplete={"" + Math.random()}
                            className="ant-input-w100"
                            value={`${timeLimit} minutes max `}
                          />
                        </Form.Item>
                        <Form.Item name="id" className="w-50 align-items-end  ">
                          <span className="d-flex justify-content-end align-items-center">
                            <span className="mr-2">Add another</span>
                            <Button
                              onClick={() =>
                                setQuestionCounter(
                                  questionCounter < 3
                                    ? questionCounter + 1
                                    : questionCounter
                                )
                              }
                              className="rounded d-flex justify-content-center"
                            >
                              <PlusOutlined />
                            </Button>
                          </span>
                        </Form.Item>
                      </div>
                    </div>
                  ) : null}
                  <Row>
                    <Col span={2}></Col>
                    <Col span={20} className="video-call-input-wrapper">
                      <Form.Item
                        name="id"
                        label="Template name"
                        className="c-input flex"
                      >
                        <Input
                          autoComplete={"" + Math.random()}
                          style={{ width: "100%" }}
                          className="video-call-template-input"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={2}></Col>
                    <Col span={20}>
                      <Form.Item name="id">
                        <div className="d-flex justify-content-between mt-4">
                          <Button className="video-modal-buttons">
                            Save template
                          </Button>
                          <span className="flex">or</span>
                          <Button
                            className="video-modal-buttons"
                            themecolor="green"
                          >
                            Send
                          </Button>
                        </div>
                      </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                  </Row>
                </Form>
              </Modal>
            </div>
          </div>

          <div className="further-info">
            <p className="user-info">About &nbsp;{user?.firstName}</p>

            <p className="user-bio">
              {user?.jobSeekerProfile?.description || ""}
            </p>
          </div>
          {/* <div onClick={() => setInviteToChat(true)} className="invite-others">
            Invite others to chat
          </div> */}
        </div>

        <div className="tabs-section">
          <Tabs moreIcon={false} type="card">
            <TabPane tab="Files sent" key="1">
              <div className="main-media-conainer">
                {!sentFiles?.length && (
                  <div className="no-data h-100 mt-5 pb-5">
                    {/* <Empty
                    // image={require("../../assets/images/icons/no-data.png")}
                    // description="No files"
                    /> */}
                  </div>
                )}
                {/* {console.table("S E N T____F I L E S", sentFiles)} */}
                {sentFiles?.map((data, key) => (
                  <div key={key} className="user-media">
                    <span className="items">
                      <span className="files">
                        <b
                          onClick={() => handelDeleteFilesWithAPI(data.id)}
                          className="mr-2"
                        >
                          X
                        </b>

                        {data?.fileType === "video" ? (
                          <FcVideoFile size="50px" />
                        ) : null}
                        {data?.fileType === "image" ? (
                          // <FcImageFile size="50px" />
                          <div className="chat-head">
                            <Avatar image={data?.message} size="small" />
                          </div>
                        ) : null}
                        {data?.fileType === "document"
                          ? renderDocument(data?.docType)
                          : null}
                        {/* <img
                              className="user-media-files mr-2"
                              src={require("../../assets/images/icons/filetypes/Wfile.svg")}
                              alt=""
                            /> */}
                        <p className="user-file-name">{data?.fileType}</p>
                      </span>
                      <span className="files-details">
                        <p>{moment(data?.createdAt).format("DD/MM/YYYY")}</p>
                        <p>{data?.fileSize || " "}</p>
                        {/* <p>- 5.7 mb</p> */}
                      </span>
                    </span>
                    <span className="download-media">
                      <img
                        classname="id"
                        src={require("../../assets/images/icons/download-icon.svg")}
                        alt=""
                      />
                      <a href={data?.message} className="download">
                        Download
                      </a>
                      {/* <p className="user-items-expire">Expires in 29 days.</p> */}
                      <p className="user-items-expire">
                        Expires in{" "}
                        {moment(data.createdAt)
                          .add(30, "days")
                          .diff(moment(), "days")}{" "}
                        days.
                      </p>
                    </span>
                  </div>
                ))}
              </div>
            </TabPane>

            <TabPane tab="Files received" key="2">
              <div className="main-media-conainer">
                {!recievedFiles?.length && (
                  <div className="no-data h-100 mt-5 pb-5">
                    {/* <Empty
                    // image={require("../../assets/images/icons/no-data.png")}
                    // description="No files"
                    /> */}
                  </div>
                )}
                {recievedFiles?.map((data, key) => (
                  <div key={key} className="user-media">
                    <span className="items">
                      <span className="files">
                        <b
                          onClick={() => handelDeleteFilesWithAPI(data.id)}
                          className="mr-2"
                        >
                          X
                        </b>
                        {data?.fileType === "video" ? (
                          <FcVideoFile size="50px" />
                        ) : null}
                        {data?.fileType === "image" ? (
                          // <FcImageFile size="50px" />
                          <div className="chat-head">
                            <Avatar image={data?.message} size="small" />
                          </div>
                        ) : null}
                        {data?.fileType === "document"
                          ? renderDocument(data?.docType)
                          : null}
                        {/* <img
                              className="user-media-files mr-2"
                              src={require("../../assets/images/icons/filetypes/Wfile.svg")}
                              alt=""
                            /> */}
                        <p className="user-file-name">{data?.fileType}</p>
                      </span>
                      <span className="files-details">
                        <p>{moment(data?.createdAt).format("DD/MM/YYYY")}</p>

                        {/* <p>- 5.7 mb</p> */}
                        <p>{data?.fileSize}</p>
                      </span>
                    </span>
                    <span className="download-media">
                      <img
                        classname="id"
                        src={require("../../assets/images/icons/download-icon.svg")}
                        alt=""
                      />
                      <a href={data?.message} className="download">
                        Download
                      </a>
                      {/* <p className="user-items-expire">Expires in 29 days.</p> */}
                      <p className="user-items-expire">
                        Expires in{" "}
                        {moment(data.createdAt)
                          .add(30, "days")
                          .diff(moment(), "days")}{" "}
                        days.
                      </p>
                    </span>
                    {/* {console.log("data", data)} */}
                  </div>
                ))}
              </div>
            </TabPane>
            {/* <TabPane tab="Links shared" key="3">
              <div className="link-sheared">
                <div className="links">
                  <a href="https://develop-homepage.jobsmideast.com/">
                    https://develop-homepage.jobsmideast.com/
                  </a>
                </div>
              </div>
            </TabPane> */}
          </Tabs>
        </div>

        {/* invite others to team chat */}

        {inviteToChat && (
          <div className="invite-others-to-chat">
            <div className="header">
              {" "}
              <Checkbox
              // indeterminate={indeterminate}
              // onChange={onCheckAllChange}
              // checked={checkAll}
              ></Checkbox>
              Invite Team Members
              <div onClick={() => setInviteToChat(false)} className="close">
                <IoMdClose size="16px" />
              </div>
            </div>
            <div className="team-members">
              <div className="team-member">
                <Checkbox></Checkbox>
                <img src={require("../../assets/images/ms/ms-1.png")} alt="" />
                <span>James</span>
              </div>
              <Divider />
              <div className="team-member">
                <Checkbox></Checkbox>
                <img src={require("../../assets/images/ms/ms-3.png")} alt="" />
                <span>Jamshed</span>
              </div>
            </div>
            <div className="footer">
              <Button themecolor="outlined-green">Invite</Button>
            </div>
          </div>
        )}
      </div>

      <Modal
        className="profile-modal center"
        show={showProfile}
        onHide={() => setShowProfile(false)}
      >
        <UserProfile
          showProfile={showProfile}
          profileDetails={jobsAppliedFor[0]?.id}
          handleProfile={handleProfile}
        />
      </Modal>
    </>
  );
};

export default CUserProfile;
