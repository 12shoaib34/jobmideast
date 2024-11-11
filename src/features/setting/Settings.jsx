import React, { useEffect, useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Form } from "antd";
import CButton from "../../shared-ui/Button/Button";
import * as Rules from "../../utils/rules";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { Switch } from "antd";
import CModal from "../../shared-ui/Modal/Modal";
import "./_Settings.scss";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectSettings, selectStatus, selectUpdatePasswordSuccess, selectFeedbackSuccess } from "./slice";
import VideoQuestionares from "../../app-ui/VideoQuestionares/VideoQuestionares";
import { getSettings, updateSettings, postFeedback, deleteAccount as delAccount, updatePassword } from "./thunk";
import "./_Responsive.scss";
import { showErrorMessage, showSuccessMessage } from "../../utils/message";

const { TextArea } = Input;

function Settings() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [changePasswordForm] = Form.useForm();
  const updatePasswordSuccess = useAppSelector(selectUpdatePasswordSuccess);
  const feedBackSuccess = useAppSelector(selectFeedbackSuccess);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getSettings());
    window.$crisp.push(["do", "chat:show"]);
    // window.$crisp.push(["do", "chat:hide"]);
  }, []);

  useEffect(() => {
    if (feedBackSuccess === true) {
      dispatch(delAccount());
      localStorage.clear();
      window.location = process.env.REACT_APP_HOMEPAGE_URL;
    }
  }, [feedBackSuccess]);

  useEffect(() => {
    form.setFieldsValue(settings);
  }, [settings]);

  useEffect(() => {
    if (updatePasswordSuccess === true) {
      showSuccessMessage("Password updated successfully");
    }
  }, [updatePasswordSuccess]);

  const onChange = (value, values) => {
    const email = form.isFieldTouched("email");
    const password = form.isFieldTouched("password");
    const oldPassword = form.isFieldTouched("oldPassword");
    if (email === false || password === false || oldPassword === false) {
      delete values.email;
      delete values.password;
      delete values.oldPassword;
      const payload = values;
      dispatch(updateSettings({ payload }));
    } else {
      delete values.email;
      delete values.password;
      delete values.oldPassword;
      const payload = values;
      dispatch(updateSettings({ payload }));
    }
  };

  const onFinish = (values) => {
    const payload = {
      currentPassword: values.oldPassword,
      newPassword: values.password,
    };
    dispatch(updatePassword({ payload }));
    changePasswordForm.resetFields();
  };
  const onFinishDelete = (values) => {
    setFeedback(false);
    setDeleteAccount(false);
    const payload = values;
    dispatch(postFeedback({ payload }));
  };

  // const handleDeleteButtonWithFeedBack = () => {
  //   setDeleteAccount(false);
  //   setFeedback(false);
  //   dispatch(delAccount());
  //   console.log("delete btn with send feed ");
  // };

  return (
    <>
      <div className="container-fluid notification-setting-contaier">
        {/* <div className="back-btn" onClick={() => window.history.back()}>
          <img src={require("../../assets/images/icons/Back.svg").default} alt="" />
        </div> */}
        <div className="container setting-main">
          <div className="row">
            <div className="col-lg-12 col-12 m-auto settings-grid">
              <div className="settings-header">
                <h4 className="notfication-heading">Notifications and Settings</h4>
              </div>
              <div className="inner-seting-items">
                <h1 className="settings-items-heading">Settings for employers</h1>
                <Form name="sdd" form={form} onValuesChange={onChange}>
                  <Form.Item
                    valuePropName="checked"
                    className="c-switch first-option"
                    label="Receive applications from agencies"
                    name="ReceiveApplicationsFromAgencies"
                  >
                    <Switch size="large" className="mr-2 c-margin switch-top" />
                  </Form.Item>
                  <h1 className="setiing-desc">Receive an emails when (on off buttons)</h1>
                  <div className="settings-cells-row">
                    <div className="settings-cells">
                      <Form.Item
                        valuePropName="checked"
                        className="c-switch"
                        label="Agencies apply to your jobs"
                        name="AgenciesApplytoYourJob"
                      >
                        <Switch size="large" className="mr-2" />
                      </Form.Item>
                      <Form.Item
                        valuePropName="checked"
                        className="c-switch"
                        label="New message from agency"
                        name="NewMessageFromAgency"
                        className="c-switch"
                      >
                        <Switch size="large" className="mr-2" />
                      </Form.Item>
                      <Form.Item
                        valuePropName="checked"
                        label="New message from team members"
                        className="c-switch"
                        name="NewMessageFromTeamMembers"
                      >
                        <Switch size="large" className="mr-2" />
                      </Form.Item>
                      <Form.Item
                        valuePropName="checked"
                        label="New message from job seekers"
                        name="NewMessageFromJobSeekers"
                        className="c-switch"
                      >
                        <Switch size="large" className="mr-2" />
                      </Form.Item>
                      <Form.Item
                        valuePropName="checked"
                        label="New team chat has been created"
                        name="NewTeamChatHasBeenCreated"
                        className="c-switch"
                      >
                        <Switch size="large" className="mr-2" />
                      </Form.Item>
                      <Form.Item
                        valuePropName="checked"
                        label="New review on company page"
                        name="NewReviewOnCompanyPage"
                        className="c-switch"
                      >
                        <Switch size="large" className="mr-2" />
                      </Form.Item>
                      <Form.Item
                        valuePropName="checked"
                        label="New message from Jobsmideast"
                        name="NewMessageFromJobmideast"
                        className="c-switch"
                      >
                        <Switch size="large" className="mr-2" />
                      </Form.Item>
                    </div>
                    <div className="settings-cells">
                      <Form.Item valuePropName="checked" label="New team member joined" name="NewTeamMemberJoined" className="c-switch">
                        <Switch size="large" className="mr-2" />
                      </Form.Item>
                      <Form.Item valuePropName="checked" label="Interview accepted" name="InterviewAccepted" className="c-switch">
                        <Switch size="large" className="mr-2" />
                      </Form.Item>
                      <Form.Item valuePropName="checked" label="Interview rejected" name="InterviewRejected" className="c-switch">
                        <Switch size="large" className="mr-2" />
                      </Form.Item>

                      <Form.Item
                        valuePropName="checked"
                        label="Application submission by a job seeker"
                        name="ApplicationSubmissionByaJobSeeker"
                        className="c-switch"
                      >
                        <Switch size="large" className="mr-2" />
                      </Form.Item>
                      <Form.Item
                        valuePropName="checked"
                        label="Application submission by an agency"
                        name="ApplicationSubmissionByAnAgency"
                        className="c-switch"
                      >
                        <Switch size="large" className="mr-2" />
                      </Form.Item>
                      <Form.Item
                        valuePropName="checked"
                        label="Discounts & Promotions from Jobsmideast"
                        name="DiscountsandPromotionsFromJobmideast"
                        className="c-switch"
                      >
                        <Switch size="large" className="mr-2" />
                      </Form.Item>
                      <Form.Item
                        valuePropName="checked"
                        label="Important messages from Jobsmideast"
                        name="ImportantMessagesFromJobmideast"
                        className="c-switch"
                      >
                        <Switch size="large" className="mr-2" />
                      </Form.Item>
                    </div>
                    <div className="settings-cells">
                      <Form.Item
                        valuePropName="checked"
                        label="New features added to Jobsmideast"
                        name="NewFeatureAddedtoJobmideast"
                        className="c-switch"
                      >
                        <Switch size="large" className="mr-2" />
                      </Form.Item>
                      <Form.Item
                        valuePropName="checked"
                        label="Matching profile is registered"
                        name="MatchingProfileisRegistered"
                        className="c-switch"
                      >
                        <Switch size="large" className="mr-2" />
                      </Form.Item>
                      <h1 className="credential-settings">Change password</h1>
                      <div className="credentials-cell">
                        <Form form={changePasswordForm} onFinish={onFinish}>
                          <Form.Item name="oldPassword" className="c-input form-padding" rules={Rules.passwordRule}>
                            {/* <Input
                              autoComplete="newpassword"
                              placeholder="enter old password here"
                              type="password"
                              className="ant-input-md "
                            /> */}
                            <Input.Password
                              autoComplete="off"
                              placeholder="Current password"
                              type="password"
                              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                            {/* <Input.Password autoComplete={'' + Math.random()} placeholder="Confirm password" /> */}
                          </Form.Item>
                          <div className="d-flex">
                            <Form.Item name="password" className="c-input form-padding" rules={Rules.passwordRule}>
                              <Input.Password
                                autoComplete="off"
                                placeholder="New password"
                                type="password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                              />
                            </Form.Item>
                            <CButton
                              themecolor="green"
                              type="large"
                              htmlType="submit"
                              className="ml-auto update-btn"
                              style={{
                                height: "30px",
                                width: "90px",
                                marginTop: "20px",
                                padding: "5px 25px",
                              }}
                              block
                            >
                              Update
                            </CButton>
                          </div>
                          <p className="items-desc item-desc-width">
                            Password must at least be 8 characters and a mixture of both uppercase and lowercase letters.
                          </p>

                          {/* ------------------------------ */}
                          {/* ------------------------------ */}
                          {/* <p className="items-desc item-desc-width">
                            Password must at least be 8 characters and a mixture
                            of both uppercase and lowercase letters.
                          </p>
                          <CButton
                            themecolor="outlined blue"
                            type="large"
                            htmlType="submit"
                            className="ml-auto update-btn"
                            style={{
                              height: "30px",
                              width: "90px",
                              marginTop: "20px",
                              padding: "5px 25px",
                            }}
                            block>
                            Update
                          </CButton> */}
                        </Form>
                      </div>
                    </div>
                  </div>
                </Form>
                <div className="delete-account-btn">
                  <p onClick={() => setDeleteAccount(true)}>Delete my account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CModal className="center medium " onHide={() => setDeleteAccount(false)} show={deleteAccount}>
        <div className="delete-modal">
          <div className="heading">Delete Account</div>
          <div className="text">
            Once you delete your account all of your information such as personal details, outstanding interviews, conversations, reviews
            and any other form of communication/info will be completely deleted. Would you still like to delete your account?
          </div>
          <div className="buttons">
            <CButton
              onClick={() => {
                setDeleteAccount(false);
              }}
              className="mr-3"
              themecolor="grey"
            >
              Cancel
            </CButton>
            <CButton
              onClick={() => {
                setFeedback(true);
                setDeleteAccount(false);
              }}
              themecolor="primary"
            >
              Confirm
            </CButton>
          </div>
        </div>
      </CModal>
      <CModal className="center medium" onHide={() => setFeedback(false)} show={feedback}>
        <div className="feedback-modal">
          <div className="text">
            We are sad to see you go! Could you please tell us why you're looking to delete your account? We always listen to your feedback
            and will try our best to improve our services and we hope to see you back again!
          </div>
          <div className="feedback-text-area">
            Feedback
            <Form onFinish={onFinishDelete}>
              <Form.Item
                // label="Feed Back"
                name="feedBack"
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <div name="id" className="buttons">
                  <CButton
                    // onClick={() => {
                    //   setFeedback(false);
                    //   setDeleteAccount(false);
                    //   // handleDeleteButtonWithFeedBack();
                    // }}
                    htmlType="submit"
                    themecolor="primary"
                  >
                    Submit and delete
                  </CButton>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </CModal>

      {/* <VideoQuestionares/> */}
    </>
  );
}

export default Settings;
