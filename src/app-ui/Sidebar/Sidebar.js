import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { Link, useHistory } from "react-router-dom";
import useRefState from "react-usestateref";
import { Spin, Badge } from "antd";
import {
  Menu,
  Modal,
  Upload,
  Button as AntButton,
  Popover,
  Input,
  Form,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { VscMenu, VscChromeClose, VscChevronLeft } from "react-icons/vsc";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import CModal from "../../shared-ui/Modal/Modal";
import MediaPicker from "../../shared-ui/MediaPicker/MediaPicker";
import PhoneInput from "react-phone-input-international";
import { getFullName } from "../../utils/helper";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Button from "../../shared-ui/Button/Button";
import {
  selectEmployerProfile,
  selectJobTitles,
  selectProfileImage,
  selectIsProfileImageLoading,
  selectUpdateProfileSuccess,
  selectCountryByIp,
  selectIsProfileUpdateLoading,
} from "../../features/auth/slice";
import defaultImage from "../../assets/images/user.png";
import {
  getCountryByIp,
  getEmployerProfle,
  updateEmployerProfile,
  uploadProfileImage,
} from "../../features/auth/thunk";
import * as Rules from "../../utils/rules";
import { showSuccessMessage, showWarningMessage } from "../../utils/message";
import { SuperSelect } from "../../shared-ui/SuperSelect/SuperSelect";
import { getJobTitle, getSectors } from "../../features/postJob/service";
import { initSocket } from "../../utils/socket";
const { SubMenu } = Menu;
const { confirm } = Modal;
const Option = Select;
const { TextArea } = Input;

function useOutsideAlerter(ref, setCollapse) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && ref.current.contains(event.target)) {
        setCollapse(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function Sidebar({ routes, notificationCount, notification }) {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const history = useHistory();
  const wrapperRef = useRef(null);
  const [collapse, setCollapse] = useState(false);
  const [showEmployerDetailModal, setEmployerDetailModal] = useState(false);
  const [file, setFile] = useState(null);
  const [payloadWithPhoto, setPayloadWithPhoto] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [selectedSector, setSelectedSector] = useState(false);
  const profile = useAppSelector(selectEmployerProfile);
  const jobTitles = useAppSelector(selectJobTitles);
  const profileImage = useAppSelector(selectProfileImage);
  const isProfileImageLoading = useAppSelector(selectIsProfileImageLoading);
  const profileUpdateSuccess = useAppSelector(selectUpdateProfileSuccess);
  const isProfileUpdateLoading = useAppSelector(selectIsProfileUpdateLoading);
  const countryByIp = useAppSelector(selectCountryByIp);
  const [countryCode, setCountryCode] = useState("gb");

  const [socket, setSocket] = useState(null);
  const [notifCount, setNotifCount, notifCountRef] = useRefState("0");
  const checkActiveClass = useCallback(
    (path) => {
      const pathname = history.location.pathname;
      return pathname === path ? "active" : "";
    },
    [history]
  );
  const [show, setShow] = React.useState(true);
  function showConfirm() {
    confirm({
      title: "Do you want to logout?",
      icon: <ExclamationCircleOutlined />,
      content: "Make sure you have saved you're work before logging out",
      onOk() {
        localStorage.clear();
        window.location = process.env.REACT_APP_HOMEPAGE_URL + "?logout=true";
      },
    });
  }

  const handleUpdateProfile = (v) => {
    const firstName = v.user?.firstName;
    const lastName = v.user?.lastName;
    const id = profile?.id;
    delete v.companyProfile;
    delete v.user;

    const payload = { ...v, firstName, lastName };
    if (file) {
      payload.profilePhoto = profileImage?.url;
      dispatch(updateEmployerProfile({ id, payload }));
      // setEmployerDetailModal(!showEmployerDetailModal)
      // console.log(profileUpdateSuccess);
    } else {
      dispatch(updateEmployerProfile({ id, payload }));
      // setEmployerDetailModal(!showEmployerDetailModal)
      // console.log(profileUpdateSuccess);
    }

    // if (file) {
    //   payload.photoUrl = profileImage?.url;
    // } else {
    // }
  };

  const openEmail = (subject) => {
    window.location.href = `mailto:support@jobsmideast.com?subject=${subject}`;
  };

  const profileImageBeforeUpload = (file) => {
    if (file?.type === "image/png" || file?.type === "image/jpeg") {
      const payload = new FormData();
      payload.append("file", file, file.name);
      dispatch(uploadProfileImage({ payload }));
      setFile(false);
      return false;
    } else {
      showWarningMessage("Invalid file type");
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("=== socket connected ===");
        socket.on("notification-count", getNotificationCount);
        socket.on("disconnect", () => {
          console.log("xxx socket disconnected xxx");
        });
      });
    }
  }, [socket]);
  const getNotificationCount = (res) => {
    setNotifCount(`${res?.count}`);
  };

  useEffect(() => {
    dispatch(getCountryByIp());
  }, []);
  useEffect(() => {
    setCountryCode(countryByIp?.countryCode?.toLowerCase());
  }, [countryByIp]);

  useEffect(() => {
    if (profileImage) {
      setFile(true);
    }
  }, [profileImage]);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({ ...profile });
      setCategoryId(profile.categoryId);
    }
  }, [profile]);

  useEffect(() => {
    if (profileUpdateSuccess) {
      showSuccessMessage("Profile updated");
      setEmployerDetailModal(false);
      dispatch(getEmployerProfle());
    }
  }, [profileUpdateSuccess]);

  useOutsideAlerter(wrapperRef, setCollapse);

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }
  const [, windowHeight] = useWindowSize();

  return (
    <span>
      <button
        className={`collapse-btn ${
          collapse ? "collapse-btn-animate-translate" : "collapse-btn-animate"
        }`}
        onClick={() => {
          setCollapse(!collapse);
        }}>
        {collapse ? (
          <VscChevronLeft className="side-menu-close" size="24px" />
        ) : (
          <VscMenu className="side-menu-open" size="24px" />
        )}
      </button>

      <div
        style={{
          height: windowHeight, // window - message form - navbar
        }}
        className={`c-sidebar ${
          collapse ? "c-sidebar-show" : "c-sidebar-collapse"
        }`}>
        <div className="user-profile">
          <img
            className="user-avatar"
            src={profile?.profilePhoto || defaultImage}
            alt="dp"
          />

          <h6
            onClick={() => setEmployerDetailModal(!showEmployerDetailModal)}
            className="username">
            {" "}
            {getFullName(profile?.user)}{" "}
          </h6>

          <p
            onClick={() => setEmployerDetailModal(!showEmployerDetailModal)}
            className="status">
            {/* <span className="dot"></span> Online{" "} */}
            Edit profile
            {/* <span  className="edit-profile"> Edit profile </span> */}
          </p>

          {/* Profile Modal */}
          <CModal
            onHide={() => setEmployerDetailModal(!showEmployerDetailModal)}
            show={showEmployerDetailModal}
            className="center employer-details-modal">
            <div className="employer-details">
              <div className="emp-modal-header">
                <h1>Employer Details</h1>
              </div>
              <Form
                form={form}
                onFinish={handleUpdateProfile}
                layout="vertical"
                classname="id"
                autoComplete={"" + Math.random()}>
                <div className="emp-moadal-row">
                  <Form.Item name="id">
                    <Upload
                      accept="image/*"
                      // loading={isLoading}
                      beforeUpload={profileImageBeforeUpload}
                      showUploadList={false}>
                      {/* <Button themecolor="rounded">
                        <PlusOutlined />
                      </Button> */}

                      <div className="avatar-upload">
                        <Spin spinning={isProfileImageLoading}>
                          <div className="photo-square">
                            {profileImage && profileImage?.url && (
                              <img src={profileImage?.url} alt="" />
                            )}
                            {!profileImage && profile?.profilePhoto && (
                              <img src={profile?.profilePhoto} alt="" />
                            )}
                          </div>
                        </Spin>
                        {/* {console.log(profileImage?.url)} */}
                        {!profileImage &&
                          !isProfileImageLoading &&
                          !profile?.profilePhoto && (
                            <Button>
                              <PlusOutlined />
                            </Button>
                          )}
                      </div>
                      <div
                        style={{
                          color: "#5271FF",
                          textDecoration: "underline",
                          fontSize: "12px",
                          marginTop: "12px",
                        }}>
                        Edit photo
                      </div>

                      {/* {file ? file.name : "no photo selected"} */}
                    </Upload>
                  </Form.Item>
                  <Form.Item
                    name={["companyProfile", "companyName"]}
                    label="Company name"
                    className="c-input pb-3">
                    <Input disabled className="ant-input-lg" />
                  </Form.Item>
                </div>
                <div className="emp-moadal-row">
                  <Form.Item
                    rules={Rules.firstNameRule}
                    name={["user", "firstName"]}
                    label="First name"
                    className="c-input pb-3">
                    <Input
                      maxLength="15"
                      className="ant-input-lg"
                      autoComplete={"" + Math.random()}
                    />
                  </Form.Item>
                  <Form.Item
                    rules={Rules.lastNameRule}
                    label="Last name"
                    name={["user", "lastName"]}
                    className="c-input pb-3">
                    <Input
                      maxLength="15"
                      className="ant-input-lg"
                      autoComplete={"" + Math.random()}
                    />
                  </Form.Item>
                </div>
                <div className="emp-moadal-row">
                  <Form.Item
                    rules={Rules.phoneRule}
                    label="Phone number"
                    name="mobile"
                    // className="c-input pb-3"
                    className="c-input pb-3">
                    {/* <Input className="ant-input-lg" /> */}

                    <PhoneInput
                      // children={null}
                      // className="ant-input-lg"
                      placeholder="Enter your phone number."
                      country={countryCode}
                    />
                  </Form.Item>
                  <Form.Item
                    rules={Rules.phoneRule}
                    label="Direct work phone"
                    name="directWorkPhone"
                    className="c-input pb-3">
                    <Input
                      autoComplete={"" + Math.random()}
                      className="ant-input-lg"
                    />
                  </Form.Item>
                </div>
                <div className="emp-moadal-row">
                  {/* <Form.Item
                    rules={Rules.emailRule}
                    name={["user", "email"]}
                    label="Work email address"
                    className="c-input pb-3"
                  >
                    <Input
                      autoComplete={"" + Math.random()}
                      disabled
                      className="ant-input-lg"
                    />
                  </Form.Item> */}
                  <Form.Item
                    rules={Rules.requiredRule}
                    label="Sector"
                    name="categoryId"
                    className="select-lg pb-3">
                    <SuperSelect
                      onClear={() => {
                        setCategoryId(null);
                        form.resetFields(["jobTitleId"]);
                      }}
                      onSelect={(v) => {
                        form.resetFields(["jobTitleId"]);
                        setSelectedSector(true);
                        setCategoryId(v);
                      }}
                      getPopupContainer={(trigger) => trigger.parentNode}
                      fetchOptions={getSectors}
                    />
                  </Form.Item>
                  <Form.Item
                    rules={Rules.requiredRule}
                    label="Job title"
                    name="jobTitleId"
                    className="select-lg pb-3">
                    <SuperSelect
                      disabled={!categoryId}
                      dependencyId={categoryId}
                      getPopupContainer={(trigger) => trigger.parentNode}
                      fetchOptions={getJobTitle}
                    />
                  </Form.Item>
                </div>
                <div className="emp-form-row">
                  <Form.Item
                    rules={Rules.requiredRule}
                    label="Professional summary"
                    // className="c-text-box pb-3"
                    className="c-text-box "
                    name="description">
                    <TextArea
                      placeholder="Type here"
                      className="c-text-area"
                      autoSize={{ minRows: 3, maxRows: 6 }}
                    />
                  </Form.Item>
                </div>
                <div className="emp-form-row-btn">
                  <Button
                    loading={isProfileUpdateLoading}
                    htmlType="submit"
                    className="ml-auto">
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          </CModal>
        </div>

        <div className="menu-fix-safari">
          {/* Menu */}
          <div className="menu">
            {routes.map((menu, index) => {
              return (
                menu.visible && (
                  <Link
                    to="#"
                    key={index}
                    to={menu.path}
                    onClick={() => setCollapse(false)}
                    className={`c-menu-item ${checkActiveClass(menu.path)}`}>
                    {menu.icon ? (
                      <object
                        type="image/svg+xml"
                        data={menu.icon}
                        className="menu-icon"></object>
                    ) : null}
                    <p className="title">{menu.title}</p>
                    {menu.title == "Direct Chat" && notification > 0 && (
                      <Badge
                        count={notification}
                        size="small"
                        style={{
                          backgroundColor: "red",
                        }}
                      />
                    )}

                    {/* {console.log(
                      "=============================",
                      notifCountRef.current
                    )} */}
                  </Link>
                )
              );
            })}
          </div>

          <div className="bottom-container">
            <div className="inner-bottom-container">
              <div className="menu paddding-override">
                <Button
                  icon={
                    <img
                      className="menu-icon"
                      src={require("../../assets/images/icons/log-out.svg")}
                      alt=""
                    />
                  }
                  block
                  type="link"
                  className="c-menu-item log-out-btn justify-content-start"
                  onClick={showConfirm}>
                  Logout
                </Button>
              </div>
              <div
                className="menu paddding-override"
                style={{ overflow: "hidden" }}>
                <Link
                  to="#"
                  // to={"/report-problem"}
                  onClick={() => setCollapse(false)}
                  className={`c-menu-item ${checkActiveClass(
                    "/report-problem"
                  )}`}>
                  <object
                    type="image/svg+xml"
                    data={require("../../assets/images/sidebar/icons/report-problem.svg")}
                    className="menu-icon"></object>
                  <p
                    onClick={() => window.$crisp.push(["do", "chat:open"])}
                    className="title">
                    {"Support"}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {collapse && <span ref={wrapperRef} className={`shadow-sidebar`}></span>}
    </span>
  );
}

export default Sidebar;
