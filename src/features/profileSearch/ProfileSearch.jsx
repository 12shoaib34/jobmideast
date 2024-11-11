import React, { useState, useRef, useEffect, useMemo } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import {
  Select,
  Form,
  Input,
  Menu,
  Dropdown,
  Spin,
  Empty,
  Pagination,
  Popover,
} from "antd";
import "./_ProfileSearch.scss";
import "./_Responsive.scss";
import Filters from "./Filters";
import Modal from "../../shared-ui/Modal/Modal";
import Button from "../../shared-ui/Button/Button";
import ProfileCard from "../../shared-ui/ProfileCard/ProfileCard";
import ProfileDetails from "../../shared-ui/ProfileDetails/ProfileDetails";
import UserProfile from "../../app-ui/UserProfile/UserProfile";
import UserList from "./UserList";
import defaultImage from "../../assets/images/user.png";
import dummyImage1 from "../../assets/images/ms/ms-11.png";
import dummyImage2 from "../../assets/images/ms/ms-15.png";
import dummyImage3 from "../../assets/images/ms/ms-12.png";
import dummyImage4 from "../../assets/images/ms/ms-14.png";
import dummyImage5 from "../../assets/images/ms/ms-7.png";
import ProfileDetail from "../../shared-ui/ProfileDetails/ProfileDetails";

import { selectNewProfiles } from "../dashboard/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getNewProfiles } from "../dashboard/thunk";
import {
  selectProfile,
  selectStatus,
  selectProfilesLoading,
  selectProfilePageMeta,
  selectCandidateListCreateSuccess,
  selectCandidateList,
} from "./slice";
import {
  getProfiles,
  getFilters,
  createCandidateList,
  getCandidateList,
} from "./thunk";
import { selectTeamMembers } from "../auth/slice";
import { getFullName } from "../../utils/helper";
import { showSuccessMessage } from "../../utils/message";
const queryString = require("query-string");

const Option = Select;

const menu = (setShowNewlistModal) => (
  <Menu>
    <Menu.Item>
      <div
        onClick={() => setShowNewlistModal(true)}
        style={{ color: "#5271FF" }}>
        Create a new list
      </div>
    </Menu.Item>
    <Menu.Item disabled>
      <div>View my lists</div>
    </Menu.Item>
  </Menu>
);

export const dummyProfileData = [
  {
    userName: "John",
    userJob: "Primary Teahcer",
    userImage: dummyImage1,
    description: `I have been a general primary school teacher for the past 5 years, working from grade 4 to grade 6.
    During my time at Southview Primary, I took on the role of an educator, grade leader, part-time
    school counsellor as well as a mathematics coordinator which meant that I was responsible for
    delegating grade meetings, discipline within the grade, time tabling, setting up lesson plans, and
    term assessments.`,
    city: {
      title: "Dubai",
    },
    nationality: {
      title: "British",
    },
    noticePeriod: {
      title: "Available immediately",
    },
  },
  {
    userName: "Adam",
    userJob: "Primary Teahcer",
    userImage: dummyImage5,
    description: `Avibrant young teacher whom enjoys being part of a group of teachers and learners.
    Enthusiasticelly grasp new skills and demonstrate a high level of motivation and determination
    required to energize students and other people. Well trained in a variety of sport and coaching. Able
    to work well on own initiative but enjoys working together in a group.`,
    city: {
      title: "Dubai",
    },
    nationality: {
      title: "British",
    },
    noticePeriod: {
      title: "Available immediately",
    },
  },
  {
    userName: "Josh",
    userJob: "Primary Teahcer",
    userImage: dummyImage3,
    description: `I pride myself in my fairness and ability to establish an even-handed and ethical atmosphere for all
    students with the ability to properly handle misconduct. I endeavor to always approach my
    responsibilities with versatility in both methods of instruction and hold the ability to adapt quickly
    with flexibility, to new environments and to the students as necessary.`,
    city: {
      title: "Dubai",
    },
    nationality: {
      title: "British",
    },
    noticePeriod: {
      title: "Available immediately",
    },
  },
  {
    userName: "Laura",
    userJob: "Primary Teahcer",
    userImage: dummyImage4,
    description: `I am a bright, enthusiastic, professional teacher, who is highly committed to the success of all my
    pupils and the life and work of the school. Having been @ Newly Qualified Teacher this year, |am able
    to work under pressure, adjust and individualize lessons whilst supporting the child to ensure every
    child is included.`,
    city: {
      title: "Dubai",
    },
    nationality: {
      title: "British",
    },
    noticePeriod: {
      title: "Available immediately",
    },
  },
];

const ProfileSearch = () => {
  const dispatch = useAppDispatch();
  const [filter, setFilters] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showNewlistModal, setShowNewlistModal] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [selectedProfileId, setselectedProfileId] = useState([]);
  const [selectedProfileImages, setselectedProfileImages] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [pagesData, setPagesData] = useState({ currentPage: 1, totalItems: 1 });

  const profiles = useAppSelector(selectProfile);
  const profilePageMeta = useAppSelector(selectProfilePageMeta);
  const profilesLoading = useAppSelector(selectProfilesLoading);
  const createCandidateListSuccess = useAppSelector(
    selectCandidateListCreateSuccess
  );
  const candidateList = useAppSelector(selectCandidateList);
  const teamMembers = useAppSelector(selectTeamMembers);

  const profileSearchRef = useRef();

  useEffect(() => {
    dispatch(getProfiles());
    dispatch(getCandidateList());
    window.$crisp.push(["do", "chat:show"]);
    // window.$crisp.push(["do", "chat:hide"]);
  }, []);

  useEffect(() => {
    if (createCandidateListSuccess) {
      setShowNewlistModal(false);
      showSuccessMessage("Created new list successfully");
    }
  }, [createCandidateListSuccess]);

  useEffect(() => {
    if (profilePageMeta) {
      setPagesData(profilePageMeta);
    }
  }, [profilePageMeta]);
  useEffect(() => {
    const qs = queryString.stringify(pagination);
    dispatch(getProfiles(qs));
    profileSearchRef.current.scrollTo(0, 0);
  }, [pagination]);

  useEffect(() => {
    const avatarsSelected = selectedProfileId.map((item) =>
      profiles.find((element) => element.userId === Number(item))
    );
    setselectedProfileImages(avatarsSelected);
  }, [selectedProfileId]);

  useEffect(() => {
    if (profiles) {
      dispatch(getFilters());
    }
  }, [profiles]);

  let handleProfile = () => {
    setShowProfile(!showProfile);
  };

  let handleList = () => {
    // setShowList(!showList);
  };

  let handlefilter = () => {
    setFilters(!filter);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setFilters(filter ? false : "");
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const handleCreateList = (v) => {
    const payload = v;
    dispatch(createCandidateList({ payload }));
  };

  useMemo(() => {
    return dummyProfileData;
  }, []);

  return (
    <>
      <div className="profile-search-page">
        <div className="profile-wrapper">
          <div className="user-handler">
            <div className="profile-head">
              {/* <div className="add-user"></div>
              <div className="selected-users">
                <span className="selected-user-img">
                  {selectedProfileImages?.slice(0, 5)?.map((d) => (
                    <img
                      className="users-images"
                      src={d?.profilePhoto || defaultImage}
                      alt=""
                    />
                  ))}

                  <p className="ml-2 mb-0">
                    {" "}
                    {selectedProfileImages?.length > 0 &&
                      `${selectedProfileImages.length} selected`}
                  </p>
                </span>
                <Button
                  onClick={handlefilter}
                  themecolor="shadowed rounded"
                  className="filter-btn">
                  <img
                    src={require("../../assets/images/icons/filter_icon.svg")}
                    alt=""
                  />
                </Button>
              </div>
              <div className="view-or-add-list">
                <Popover content="comming soon">
                  <Button
                    themecolor="transparent blue x-m"
                    onClick={handleList}>
                    <img
                      className="mr-2"
                      src={require("../../assets/images/icons/list-icon.svg")}
                      alt=""
                    />
                    View my list
                  </Button>
                </Popover>
                <Form layout="vertical">
                  <Form.Item className="select-md ">
                    <Select
                    className="scroll-to-smooth"
                      getPopupContainer={(trigger) => trigger.parentNode}
                      placeholder="Add selected to a list"
                      onChange={null}>
                      {candidateList?.map((d) => (
                        <Option value={d?.id}>{d?.title}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Form>
                <Dropdown
                  getPopupContainer={(trigger) => trigger.parentNode}
                  overlay={menu(setShowNewlistModal)}
                  overlayClassName={"new-list-menu"}
                  placement="bottomRight"
                  trigger={["click"]}>
                  <Button themecolor="blue" className="rounded x-m">
                    <HiOutlinePlus />
                  </Button>
                </Dropdown>
                <Modal
                  className="center small new-list-modal"
                  show={showNewlistModal}
                  onHide={() => setShowNewlistModal(false)}>
                  <div className="new-list-modal-header">
                    <h1>Create New List</h1>
                  </div>
                  <Form onFinish={handleCreateList} layout="vertical">
                    <Form.Item
                      label="List name"
                      name="title"
                      className="c-input w-100 mt-5 pb-3">
                      <Input className="ant-input-w100" />
                    </Form.Item>
                    <div className="d-flex align-items-end pb-3">
                      <Form.Item
                        name="employerId"
                        label="Visible to"
                        className="w-75">
                        <Select
                        className="scroll-to-smooth"
                          mode="multiple"
                          maxTagCount="responsive"
                          getPopupContainer={(trigger) => trigger.parentNode}
                          className="w-100"
                          placeholder="select">
                          {teamMembers?.map((d) => (
                            <Option value={d?.userId}>
                              {getFullName(d?.user)}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Button
                        htmlType="submit"
                        style={{ height: "36px" }}
                        className="ml-auto">
                        Save
                      </Button>
                    </div>
                  </Form>
                </Modal>
              </div> */}
            </div>
            <div ref={profileSearchRef} className="profile-items">
              <div className="profile-filter-fade">
                <Button
                  onClick={handlefilter}
                  themecolor="shadowed rounded"
                  className="filter-btn">
                  <img
                    src={require("../../assets/images/icons/Filter-green.svg")}
                    alt=""
                  />
                </Button>
              </div>
              {!(profiles.length > 0) &&
                !profilesLoading &&
                dummyProfileData.map((data, key) => {
                  return (
                    <div key={key} className="profile-rows">
                      <ProfileCard
                        userImage={data?.userImage}
                        type="profileSearch"
                        userName={data?.userName}
                      // userJob={data?.userJob}
                      />
                      <ProfileDetails
                        type="profileSearch"
                        profileDetails={data}
                      />
                    </div>
                  );
                })}
              {/* <Spin
                spinning={profilesLoading}
                className="profile-search-spinner"
              >
                {profiles?.map((data, key) => {
                  return (
                    <div key={key} className="profile-rows">
                      <ProfileCard
                        setselectedProfileId={setselectedProfileId}
                        selectedProfileId={selectedProfileId}
                        type="profileSearch"
                        userImage={data?.profilePhoto}
                        check={false}
                        userId={data?.userId}
                        userName={data?.user?.firstName}
                        userJob={data?.jobTitle?.title}
                        handleClick={() => {
                          handleProfile();
                          setProfileId(data?.userId);
                        }}
                      />
                      <ProfileDetails
                        type="profileSearch"
                        profileDetails={data}
                      />
                    </div>
                  );
                })}
              </Spin> */}

              <div className="loading-controler">
                <Spin
                  spinning={profilesLoading}
                  className="profile-search-spinner">
                  <div className="profile-data">
                    {profiles?.map((data, key) => {
                      return (
                        <div key={key} className="profile-rows">
                          <ProfileCard
                            setselectedProfileId={setselectedProfileId}
                            selectedProfileId={selectedProfileId}
                            type="profileSearch"
                            userImage={data?.profilePhoto}
                            check={false}
                            userId={data?.userId}
                            userName={data?.user?.firstName}
                            userJob={data?.jobTitle?.title}
                            handleClick={() => {
                              handleProfile();
                              setProfileId(data?.userId);
                            }}
                          />
                          <ProfileDetail
                            type="profileSearch"
                            profileDetails={data}
                          />
                        </div>
                      );
                    })}
                  </div>
                </Spin>
              </div>
              <div className="pagination">
                <Pagination
                  onChange={(page, pageSize) => {
                    setPagination({ page: page, limit: 10 });
                  }}
                  defaultCurrent={pagesData?.currentPage}
                  current={pagesData?.currentPage}
                  total={pagesData?.totalItems}
                />
              </div>
            </div>
          </div>
          <div
            className={`profile-filters ${filter ? "profile-filters-show" : ""
              }`}>
            <Filters getRef={wrapperRef} handlefilter={handlefilter} />
          </div>
        </div>
      </div>
      <Modal
        className="profile-modal center"
        show={showProfile}
        onHide={() => setShowProfile(false)}>
        <UserProfile
          showProfile={showProfile}
          profileDetails={profileId}
          handleProfile={handleProfile}
        />
      </Modal>
      {/* <div className={`user-list-hide ${showList ? "user-list-show" : ""}`}>
        <UserList handleList={handleList} hideList={null} showList={null} />
      </div> */}
    </>
  );
};

export default ProfileSearch;
