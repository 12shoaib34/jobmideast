import React, { useState, useEffect } from "react";
import { Select, Dropdown, Menu, Popover, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useHistory } from "react-router";
import {
  createMarkup,
  readableDate,
  readableYearDate,
  toCommas,
  useWindowSize,
} from "../../utils/helper";
import Options from "./Options";
import defaultImage from "../../assets/images/user.png";
import { showErrorMessage, showSuccessMessage } from "../../utils/message";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";
import Modal from "../../shared-ui/Modal/Modal";
import Button from "../../shared-ui/Button/Button";
import { FaRegSmile } from "react-icons/fa";
// import Lightbox from "react-image-lightbox";
// import "react-image-lightbox/style.css";
// {-------Slice--------}
import {
  removeJobseekerProfileById,
  selectCountries,
  selectIsLoadingJobseekerById,
  selectJobseekerProfileById,
  selectRecievedFiles,
  selectSentFiles,
} from "../../features/auth/slice";
import {
  selectJobTitles,
  selectQualifications,
  selectConnectByEmplyerSuccess,
  selectStatus,
  selectError,
  setErrorEmpty,
} from "../../features/dashboard/slice";
import { selectChatSuccess } from "./../../features/chat/slice";

// {-------thunks--------}

import {
  getFamilyStatus,
  getJobTitle,
  getQualification,
  addConnectByEmployer,
  getCounter,
} from "../../features/dashboard/thunk";
import { postStartConversation } from "./../../features/chat/thunk";
import {
  getJobseekerProfileById,
  getReceivedFiles,
  getSentFiles,
} from "../../features/auth/thunk";
import { useLocation } from "react-router-dom";

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const additionalInfo = (
  profile,
  countries,
  findTitleById,
  jobseekerProfileById
) => (
  <Menu>
    <div className="title">Additional Info</div>

    <Menu.Item>
      <div>
        <span>Current location : </span>
        <span>{jobseekerProfileById?.country?.title}</span>
      </div>
    </Menu.Item>
    <Menu.Item>
      <div>
        <span>Current city : </span>
        <span>{jobseekerProfileById?.city?.title}</span>
      </div>
    </Menu.Item>
    <Menu.Item>
      <div>
        <span>Desired locations to work in : </span>

        {jobseekerProfileById?.jobseekerDesiredLocation?.length === 1 && (
          <span>
            {jobseekerProfileById?.jobseekerDesiredLocation?.[0]?.city?.title}
          </span>
        )}
        {jobseekerProfileById?.jobseekerDesiredLocation?.length > 1 && (
          <Popover
            style={{ zIndex: 500 }}
            className="desired-location-popover"
            getPopupContainer={(trigger) =>
              document.getElementById("cv-container")
            }
            placement="right"
            // visible={jobseekerProfileById?.jobseekerDesiredLocation?.length > 1}
            content={jobseekerProfileById?.jobseekerDesiredLocation?.map(
              (data, i) => (
                <div key={i}>{data.city.title}</div>
              )
            )}>
            <span>
              {!jobseekerProfileById?.jobseekerDesiredLocation?.length
                ? "-"
                : jobseekerProfileById?.jobseekerDesiredLocation?.length === 1
                  ? jobseekerProfileById?.jobseekerDesiredLocation?.[0]?.city
                    .title
                  : "View"}
            </span>
          </Popover>
        )}
      </div>
    </Menu.Item>
    <Menu.Item>
      <div>
        <span>Family status : </span>
        <span>{jobseekerProfileById?.familyStatus?.title}</span>
      </div>
    </Menu.Item>
    <Menu.Item>
      <div>
        <span>Gender : </span>
        <span>
          {jobseekerProfileById?.gender &&
            jobseekerProfileById?.gender[0].toUpperCase() +
            jobseekerProfileById.gender.slice(1)}
        </span>
      </div>
    </Menu.Item>
    <Menu.Item>
      <div>
        <span>Date of birth : </span>
        <span>{moment(jobseekerProfileById?.dob).format("DD-MM-YYYY")}</span>
      </div>
    </Menu.Item>
    <Menu.Item>
      <div>
        <span> Nationality : </span>
        <span>
          {jobseekerProfileById?.nationality?.title.length > 40
            ? jobseekerProfileById?.nationality?.title.substring(0, 40) + "..."
            : jobseekerProfileById?.nationality?.title}
        </span>
      </div>
    </Menu.Item>
    <Menu.Item>
      <div>
        <span> Min-monthly salary in AED: </span>
        <span>{toCommas(jobseekerProfileById?.salary)}</span>
      </div>
    </Menu.Item>
    <Menu.Item>
      <div>
        <span> Notice period: </span>
        <span>{jobseekerProfileById?.noticePeriod?.title}</span>
      </div>
    </Menu.Item>
    <Menu.Item>
      <div>
        <span> Native language: </span>
        <span>{jobseekerProfileById?.nativeLanguage?.title}</span>
      </div>
    </Menu.Item>
    <Menu.Item>
      <div>
        <span> Other language: </span>
        {/* <span>
          check it why notice in other language
          {profile?.jobseeker?.jobSeekerProfile?.noticePeriod?.title ||
            profile?.noticePeriod?.title}
        </span> */}

        {jobseekerProfileById?.otherLanguages?.length === 1 && (
          <span>
            {jobseekerProfileById?.otherLanguages?.[0]?.language?.title}
          </span>
        )}
        {jobseekerProfileById?.otherLanguages?.length > 1 && (
          <Popover
            getPopupContainer={(trigger) =>
              document.getElementById("cv-container")
            }
            placement="right"
            trigger={["hover"]}
            overlayClassName="overlay-language"
            className="other-language-popover"
            content={jobseekerProfileById?.otherLanguages?.map((data, i) => (
              <div key={i}>{data.language.title} </div>
            ))}>
            <span>View</span>
          </Popover>
        )}
      </div>
    </Menu.Item>
    <Menu.Item>
      <div>
        <span> Medical conditions: </span>
        <span>
          {jobseekerProfileById?.medicalConditions
            ? jobseekerProfileById?.medicalConditions
            : "None"}
        </span>
      </div>
    </Menu.Item>
    <Menu.Item>
      <div>
        <span> Visa status: </span>
        <span>{jobseekerProfileById?.visaStatus?.title}</span>
      </div>
    </Menu.Item>
    <Menu.Item>
      <div>
        <span> Clear police certificate: </span>
        <span>
          {jobseekerProfileById?.isClearPoliceCertificaete ? "Yes" : "No"}
        </span>
      </div>
    </Menu.Item>
  </Menu>
);

const UserProfile = ({
  handleProfile,
  showProfile,
  profileDetails,
  jobPostId,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const history = useHistory();
  const isLoading = useAppSelector(selectStatus);
  const startChatSuccess = useAppSelector(selectChatSuccess);
  const connectedByEmployerSuccess = useAppSelector(
    selectConnectByEmplyerSuccess
  );
  const { width, height } = useWindowSize();
  const errorMessage = useAppSelector(selectError);
  const countries = useAppSelector(selectCountries);
  const jobseekerProfileByIdIsLoading = useAppSelector(
    selectIsLoadingJobseekerById
  );
  const jobseekerProfileById = useAppSelector(selectJobseekerProfileById);
  const [profileOption, setProfileOption] = useState(false);
  const [profile, setProfile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showConnectedBtn, setShowConnectedBtn] = useState(false);
  const [connectModal, setConnectModal] = useState(false);
  // const [isPictureOpen, setIsPictureOpen] = useState(false)

  useEffect(() => {
    if (startChatSuccess) {
      history.push("/chat");
    }
  }, [startChatSuccess]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        history.push({
          pathname: "/credits",
          noAddOns: true,
        });
      }, 2000);
      showErrorMessage(errorMessage);
    }
    return () => {
      dispatch(setErrorEmpty());
    };
  }, [errorMessage]);

  // ***************************************
  useEffect(() => {
    if (profileDetails) {
      dispatch(removeJobseekerProfileById());
      const id = profileDetails;
      dispatch(getJobseekerProfileById(id));
    }
  }, [profileDetails]);

  // useEffect(() => {
  //   if (jobseekerProfileById.gender) {
  //     // let temp =
  //     //   jobseekerProfileById.gender[0].toUpperCase() +
  //     //   jobseekerProfileById.gender.slice(1);
  //     // jobseekerProfileById.gender = temp;
  //     // console.log(jobseekerProfileById.gender);
  //   }
  // }, [jobseekerProfileById]);

  // ***************************************

  const initiateChat = (id) => () => {
    console.log("for initiate chat -> ", id);
    if (jobseekerProfileById?.mobile) {
      localStorage.setItem("userId", id);
      const payload = {
        userId2: id,
      };
      dispatch(postStartConversation({ payload }));
    } else {
      setConnectModal(true);
    }
  };

  const handleConnectByEmployer = () => {
    const jobseekerId = jobseekerProfileById?.userId;
    if (location.pathname === "/my-jobs") {
      var body = { jobseekerId, jobPostId };
    } else {
      var body = { jobseekerId };
    }
    dispatch(addConnectByEmployer({ body }));
  };

  useEffect(() => {
    if (connectedByEmployerSuccess) {
      dispatch(getCounter());
      dispatch(removeJobseekerProfileById());
      const id = profileDetails;
      dispatch(getJobseekerProfileById(id));
      setConnectModal(false);
      setShowConnectedBtn(!showConnectedBtn);
    }
  }, [connectedByEmployerSuccess]);

  const HandleProfileOption = () => {
    setProfileOption(true);
  };

  const findTitleById = (data, id) => {
    const found = data?.find((d) => d.id === id);
    return found?.title || null;
  };

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  const handleConnect = () => {
    setConnectModal(true);
  };
  return (
    <div className="user-profile-wrapper">
      {/* <div className="hide-perofile-header">
        {showProfile && !profileOption ? (
          <img
            className="back-icon"
            onClick={handleProfile}
            src={require("../../assets/images/icons/Back.svg")}
            alt=""
          />
        ) : showProfile && profileOption ? (
          <img
            className="back-icon"
            onClick={HandleProfileOption}
            src={require("../../assets/images/icons/Back.svg")}
            alt=""
          />
        ) : (
          ""
        )}
        {profileOption ? (
          ""
        ) : (
          <Button
            onClick={HandleProfileOption}
            className="profile-option outlined">
            Profile Option
          </Button>
        )}
      </div> */}

      {/* profile section */}
      <div className="profile-section">
        <div id="cv-container" className="cv-container">
          <Spin spinning={jobseekerProfileByIdIsLoading}>
            <div className="profile-header">
              {/* <img
                className="tag"
                src={require("../../assets/images/auth/group-path-32.svg")}
                alt=""
              /> */}
              <div className="profile-video-section">
                <img
                  // onClick={() => {
                  //   setIsPictureOpen(true)
                  //   console.log("is picture open : ", isPictureOpen)
                  // }}
                  className="profile-img"
                  src={jobseekerProfileById?.profilePhoto || defaultImage}
                  alt="profile-img"
                />
                <img
                  className="tag"
                  src={require("../../assets/images/auth/group-path-32.svg")}
                  alt=""
                />
              </div>
              {/* Single picture view modal from Light box */}
              {/* {isPictureOpen && (
                <Lightbox
                  reactModalStyle={{ zIndex: "1060"}}
                  mainSrc={jobseekerProfileById?.profilePhoto || defaultImage}
                  onCloseRequest={() => setIsPictureOpen(false)}
                />
              )} */}
              <div className="user-option">
                <div className="details">
                  <span className="user-name">
                    <h1>
                      {jobseekerProfileById?.user?.firstName}{" "}
                      {jobseekerProfileById?.mobile
                        ? jobseekerProfileById?.user?.lastName
                        : ""}{" "}
                      ID-{jobseekerProfileById?.userId}
                    </h1>
                    {/* <p>ID-</p> */}
                    {/* <p>{jobseekerProfileById?.userId}</p> */}
                  </span>
                  <p className="job-title">
                    {jobseekerProfileById?.jobTitle?.title}
                    <div style={{ fontSize: "12px", color: "#59D424" }}>
                      {jobseekerProfileById?.user?.isActive
                        ? "Available for work"
                        : null}{" "}
                    </div>
                    <div style={{ fontSize: "12px", color: "#e53262" }}>
                      {!jobseekerProfileById?.user?.isActive
                        ? "Unavailable for work"
                        : null}{" "}
                    </div>
                  </p>
                  <span className="user-location">
                    <p>
                      Current location : {jobseekerProfileById?.city?.title}
                    </p>
                    {/* <p> {jobseekerProfileById?.city?.title}</p> */}
                  </span>
                </div>
                <div className="option">
                  <span>
                    <Dropdown
                      overlay={additionalInfo(
                        profile,
                        countries,
                        findTitleById,
                        jobseekerProfileById
                      )}
                      getPopupContainer={(trigger) => trigger.parentNode}
                      overlayClassName={"additionalInfo-menu"}
                      placement="bottomCenter"
                      onVisibleChange={handleVisibleChange}
                      visible={visible}
                      trigger={["click"]}>
                      <Button
                        themecolor="rounded-outlined"
                        className="primary outlined">
                        <PlusOutlined />
                      </Button>
                    </Dropdown>

                    {/* A P P L I E D ___ P  O P O V E R __ R E M O V E D____ */}
                    {/* <Popover
                      placement="bottom"
                      overlayClassName="popover-location c-popover"
                      content={<span>Applied</span>}>
                      <img
                        className="icon-btn ml-2"
                        src={require("../../assets/images/icons/Previously_applied.svg")}
                      />
                    </Popover> */}

                    {!jobseekerProfileById?.mobile ? (
                      <img
                        onClick={
                          jobseekerProfileById?.mobile
                            ? null
                            : () => setConnectModal(true)
                        }
                        className="icon-btn ml-2"
                        src={require("../../assets/images/icons/profile/Call.svg")}
                      />
                    ) : (
                      <Popover
                        placement="bottom"
                        overlayClassName="popover-mobile-number"
                        content={
                          <span>
                            {"+" + jobseekerProfileById?.mobile}
                            <span
                              className="copy-text"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  jobseekerProfileById?.mobile
                                );
                                showSuccessMessage(
                                  "Number copied to clipboard"
                                );
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
                          onClick={
                            jobseekerProfileById?.mobile
                              ? null
                              : () => setConnectModal(true)
                          }
                          className="icon-btn ml-2"
                          src={require("../../assets/images/icons/profile/Call.svg")}
                        />
                      </Popover>
                    )}

                    {true || showConnectedBtn ? (
                      <span
                        onClick={initiateChat(jobseekerProfileById?.userId)}>
                        <img
                          style={{ width: 50 }}
                          className="ml-2"
                          src={require("../../assets/images/icons/profile/Chat.svg")}
                        />
                      </span>
                    ) : (
                      ""
                    )}
                  </span>

                  <span className="w-100">
                    {width > 540 && (
                      <>
                        {jobseekerProfileById?.mobile || showConnectedBtn ? (
                          <Button themecolor="green ">
                            Connected{" "}
                            <FaRegSmile
                              style={{ marginLeft: "4px" }}
                              className="fa-smile"
                            />
                          </Button>
                        ) : (
                          <Button
                            onClick={handleConnect}
                            themecolor="outlined-green">
                            Connect
                          </Button>
                        )}
                        <Button
                          onClick={HandleProfileOption}
                          className="profile-option outlined ml-auto">
                          Add notes
                        </Button>
                      </>
                    )}

                    <Modal
                      backdropClassName="connect-modal-backdrop"
                      className="center connect-modal"
                      show={connectModal}
                      onHide={() => setConnectModal(false)}>
                      <Button className="rounded shadowed">
                        <img
                          className="connect-icon"
                          src={require("../../assets/images/icons/Connect.svg")}
                        />
                      </Button>
                      <div className="title">Connect with candidate</div>
                      <div className="subtitle">
                        Use 1 credit to connect with this candidate.
                      </div>
                      <div className="btn-row">
                        <Button
                          onClick={() => setConnectModal(false)}
                          className="grey">
                          {" "}
                          Cancel
                        </Button>
                        <Button
                          onClick={handleConnectByEmployer}
                          // loading={isLoading}
                          className="outlined-green">
                          {" "}
                          Confirm
                        </Button>
                      </div>
                    </Modal>
                  </span>
                </div>
              </div>
            </div>
            {width < 540 && (
              <div className="only540">
                {jobseekerProfileById?.mobile || showConnectedBtn ? (
                  <Button themecolor="green ">
                    Connected{" "}
                    <FaRegSmile
                      style={{ marginLeft: "4px" }}
                      className="fa-smile"
                    />
                  </Button>
                ) : (
                  <Button onClick={handleConnect} themecolor="outlined-green">
                    Connect
                  </Button>
                )}
                <Button
                  style={{ padding: "0px 60px" }}
                  onClick={HandleProfileOption}
                  className="profile-option outlined ml-auto">
                  Notes
                </Button>
              </div>
            )}
            <div className="profile">
              <div className="profile-desc-section">
                {jobseekerProfileById?.description && (
                  <h1 className="profile-heading">About</h1>
                )}

                <p
                  className="profile-desc"
                  style={{
                    whiteSpace: "pre-line",
                    wordBreak: "break-word",
                    wordWrap: "break-word",
                  }}>
                  {jobseekerProfileById?.description}
                </p>
              </div>
              <div className="about-user">
                {true &&
                  jobseekerProfileById?.user?.experience?.length >= 1 && (
                    <h1 className="profile-heading mb-4">Experience</h1>
                  )}

                {!jobseekerProfileById?.user?.experience}
                {true &&
                  jobseekerProfileById?.user?.experience?.map((exp, i) => (
                    <div key={i} className="list-points">
                      <h1 className="color-green points-heading">
                        {exp?.jobTitle?.title || ""}
                        {" - "}
                        {readableDate(exp.startDate)} {" to "}
                        {!exp?.currentlyWorking && readableDate(exp?.endDate)}
                        {exp?.currentlyWorking && "now"}
                      </h1>

                      {jobseekerProfileById?.mobile && (
                        <p>{exp?.companyName || ""}</p>
                      )}

                      <p
                        className="markup"
                        dangerouslySetInnerHTML={createMarkup(
                          exp?.description
                        )}></p>

                      <p style={{ wordBreak: "break-word" }}>
                        Achievement: {exp?.achievement}
                      </p>
                    </div>
                  ))}
                <br />
                {!jobseekerProfileById?.user?.education}
                {true && jobseekerProfileById?.user?.education?.length >= 1 && (
                  <h1 className="profile-heading mb-4">Education</h1>
                )}
                {/* If mobile doesn't exits means jobseeker is not connected */}
                {true &&
                  jobseekerProfileById?.user?.education?.map((edu, i) => (
                    <div key={i} className="list-points">
                      <h1 className="points-heading">
                        {edu?.qualification?.title || ""}
                        <br />
                        {jobseekerProfileById?.mobile &&
                          edu?.instituteName?.title + " " + "-"}
                        {readableDate(edu?.startDate)} {" to "}
                        {!edu?.isStudy && readableDate(edu?.endDate)}
                        {edu?.isStudy && "now"}
                      </h1>
                      <p
                        style={{ wordBreak: "break-word" }}
                        className="markup"
                        dangerouslySetInnerHTML={createMarkup(
                          edu?.description
                        )}></p>
                    </div>
                  ))}
                <br />
                {true &&
                  jobseekerProfileById?.user?.certificate?.length >= 1 && (
                    <h1 className="profile-heading mb-4">Certifications</h1>
                  )}
                {true &&
                  jobseekerProfileById?.user?.certificate?.map((cert, i) => (
                    <div key={i} className="list-points">
                      <h1 className="points-heading">
                        {cert?.title} {" - "}
                        <span>
                          {readableYearDate(cert?.startDate)} {" to "}
                          {!cert?.isStudy && readableYearDate(cert?.endDate)}
                          {cert?.isStudy && "now"}
                        </span>
                      </h1>
                      <p
                        className="markup"
                        dangerouslySetInnerHTML={createMarkup(
                          cert?.description
                        )}></p>
                      <p>{cert?.type}</p>
                    </div>
                  ))}
                <br />
                {true && jobseekerProfileById?.user?.skill?.length >= 1 && (
                  <h1 className="profile-heading mb-4">Skills</h1>
                )}
                {!jobseekerProfileById?.user?.skill}
                {true &&
                  jobseekerProfileById?.user?.skill?.map((skill, i) => (
                    <div key={i} className="">
                      <p
                        className="markup"
                        dangerouslySetInnerHTML={createMarkup(
                          skill?.description
                        )}></p>
                    </div>
                  ))}
              </div>
            </div>
          </Spin>
        </div>
        <div
          className={`profile-options ${profileOption ? "profile-option-show" : ""
            }`}>
          <Spin spinning={jobseekerProfileByIdIsLoading}>
            <Options
              profileOption={profileOption}
              setProfileOption={setProfileOption}
              profileId={jobseekerProfileById?.userId}
              HandleProfileOption={HandleProfileOption}
            />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
