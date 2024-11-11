import React, { useEffect, useState } from "react";

import moment from "moment";
import { ConfigProvider, Table, Empty, Row, Col, Select, Form } from "antd";
import DragScroll from "../../shared-ui/DragableScroll/DragScroll.jsx";

import {
  applyToJob,
  changeAppliedStatus,
  getConnected,
  getJobPost,
} from "./thunk";
import { selectConnected, selectPostedJobs, selectStatus } from "./slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import defaultImage from "../../assets/images/default.png";
import { selectStatus as selectChatStatus } from "../chat/slice";
import UserProfile from "../../app-ui/UserProfile/UserProfile";
import Modal from "../../shared-ui/Modal/Modal";
import { selectJobStatus } from "../auth/slice";
import { useWindowSize } from "../../utils/helper";
import dummyImage1 from "../../assets/images/ms/ms-14.png";
import dummyImage2 from "../../assets/images/ms/ms-7.png";

const { Option } = Select;

const CandidateTable = ({ initiateChat }) => {
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectStatus);
  const Connected = useAppSelector(selectConnected);
  const isChatLoading = useAppSelector(selectChatStatus);
  const postedJobs = useAppSelector(selectPostedJobs);
  const jobStatusList = useAppSelector(selectJobStatus);
  const [viewStatus, setViewStatus] = useState(false);
  const [appliedJobList, setAppliedJobList] = useState(null);
  const [jobseekerId, setJobseekerId] = useState(null);
  const dimensions = useWindowSize();

  const columnWidh = {
    width60: 60,
    width100: 100,
    width110: 110,
    width120: 120,
    width150: 150,
    width160: 160,
    width200: 200,
    width140: 140,
    width180: 180,
    width250: 400,
  };
  const columns = (initiateChat) => [
    {
      title: "Name",
      fixed: "left",
      width: dimensions.width > 991 ? 200 : 100,
      // dataIndex: "jobseeker",
      // fixed: "left",
      render: (data, record) => {
        return (
          <div className="user-name-cell">
            <span className="username">
              <img
                onClick={() => handleProfile(record)}
                className="user-image"
                src={data?.profilePhoto || defaultImage}
              />
              <p
                className="mx-3 mb-0 pointer"
                onClick={() => handleProfile(record)}
              >{`${data?.user?.firstName} ${data?.user?.lastName}`}</p>
            </span>
          </div>
        );
      },
    },
    {
      title: "Date applied",
      width: columnWidh.width120,
      dataIndex: "createdAt",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Status",
      dataIndex: ["user", "employmentActivities"],
      width: columnWidh.width110,
      render: (data, record) => (
        <div className="status-td-cell">
          <span
            style={{
              fontSize: "12px",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => {
              setViewStatus(true);
              setAppliedJobList(data);
              setJobseekerId(record.userId);
            }}
          >
            View Status
          </span>
        </div>
      ),
    },
    {
      title: "Sector",
      dataIndex: "categories",
      width: columnWidh.width120,
      render: (data) => {
        return <div>{data?.title}</div>;
      },
    },
    {
      title: "Job title",
      dataIndex: "jobTitle",
      width: columnWidh.width200,
      render: (data) => data?.title,
    },
    {
      title: "Availability",
      dataIndex: "user",
      width: columnWidh.width110,
      render: (data) => {
        return <div>{data?.isActive ? "Available" : "Not Available"}</div>;
      },
    },
    // {
    //   title: "Job posted by",
    //   dataIndex: "address",
    //   width: 180,
    // },
    {
      title: "Notice period",
      dataIndex: "noticePeriod",
      width: columnWidh.width150,
      render: (data) => data?.title,
    },

    {
      title: "Current country",
      dataIndex: "country",
      width: columnWidh.width200,
      render: (text) => text?.title,
    },
    {
      title: "Current city",
      dataIndex: "city",
      width: columnWidh.width120,
      render: (text) => text?.title,
    },
    {
      title: "Passport nationality",
      dataIndex: "nationality",
      width: columnWidh.width250,
      render: (text) => {
        return <div className="desired-locations-text">{text?.title}</div>;
      },
    },
    {
      title: "Native language",
      dataIndex: "nativeLanguage",
      width: columnWidh.width140,
      render: (text) => text?.title,
    },
    {
      title: "Other language",
      dataIndex: "otherLanguages",
      width: columnWidh.width200,
      render: (text) => {
        return <div>{text?.map((d) => d?.language?.title + " ")}</div>;
      },
    },
    {
      title: "Desired locations",
      dataIndex: "jobseekerDesiredLocation",
      width: columnWidh.width250,
      render: (text) => {
        return (
          <div className="desired-locations-text">
            {text?.map((d) => d?.city?.title + " ")}
          </div>
        );
      },
    },
    {
      width: columnWidh.width180,
      title: "Min monthly salary",
      render: (text) => text?.salary,
    },
    {
      width: columnWidh.width60,
      title: "Gender",
      render: (text) => text?.gender,
    },
    {
      width: columnWidh.width160,
      title: "Medical condition",
      render: (text) => <div>{text?.medicalConditions}</div>,
    },
    {
      width: columnWidh.width200,
      title: "Clear police certificate",
      render: (data) => {
        return <div>{data?.isClearPoliceCertificaete ? "Yes" : "No"}</div>;
      },
    },
  ];
  //  dummy data arrays start

  let check = [
    { name: "John Mosh", image: dummyImage2 },
    { name: "Marry Mess", image: dummyImage1 },
  ];

  const dummyConnectedColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: dimensions.width > 991 ? 200 : 100,
      render: (text, record) => (
        <div className="user-name-cell">
          <span className="username">
            <img className="user-image" src={record.image} />
            <p className="mx-3 mb-0 pointer">{record.name}</p>
          </span>
        </div>
      ),
    },
    {
      title: "Date applied",
      dataIndex: "age",
      key: "age",
      width: 120,
      render: (tags) => <>12/12/2021</>,
    },
    {
      title: "Status",
      dataIndex: "address",
      key: "address",
      width: 110,
      render: (tags) => <>View Status</>,
    },
    {
      title: "Sector",
      key: "tags",
      width: 120,
      dataIndex: "tags",
      render: (tags) => <>Education</>,
    },
    {
      title: "Job title",
      key: "action",
      width: 140,
      render: () => <>Computer Science Teacher</>,
    },
    {
      title: "Availability",
      key: "available",
      width: 110,
      render: () => <>Available</>,
    },
    {
      title: "Notice period",
      key: "immi",
      width: 150,
      render: () => <>Immediate start</>,
    },
    {
      title: "Current country",
      key: "current",
      width: 150,
      render: () => <>United Arab Emirates</>,
    },
    {
      title: "Current city",
      key: "city",
      width: 120,
      render: () => <>Dubai</>,
    },
    {
      title: "Passport nationality",
      key: "ccity",
      width: 160,
      render: () => <>United Kingdom ofGreat Britain and Northern Ireland</>,
    },
    {
      title: "Native language",
      key: "english",
      width: 140,
      render: () => <>English</>,
    },
    {
      title: "Other language",
      key: "olang",
      width: 140,
      render: () => <>Arabic</>,
    },
    {
      title: "Desired location",
      key: "das",
      width: 160,
      render: () => <>Ad Dasmah </>,
    },
    {
      title: "Min monthly salary",
      key: "sal",
      width: 180,
      render: () => <>20000</>,
    },
    {
      title: "Gender",
      key: "gend",
      width: 60,
      render: () => <>Male</>,
    },
    {
      title: "Medical condition",
      key: "med",
      width: 160,
      render: () => <>Yes</>,
    },
    {
      title: "Clear police certificate",
      key: "police",
      width: 200,
      render: () => <>Yes</>,
    },
  ];
  // dummy data arrays end

  useEffect(() => {
    dispatch(getConnected());
    dispatch(getJobPost());
  }, [dispatch]);

  let handleProfile = (record) => {
    setJobseekerId(record.userId);
    setShowProfile(!showProfile);
  };

  const handleStatusUpdate = (v, employmentActivityId) => {
    const payload = { jobStatusId: v, employmentActivityId };
    dispatch(changeAppliedStatus({ payload }));
  };

  const handleApplyToJob = (v, jobPostId) => {
    const payload = { jobStatusId: v, jobPostId, jobseekerId };
    dispatch(applyToJob({ payload }));
  };

  return (
    <ConfigProvider
    // renderEmpty={() => (
    //   <Empty
    //     className="columns-center candidates-empty"
    //     image={require("../../assets/images/icons/no-data.png")}
    //     description={"You are currently not connected with any candidates."}
    //   />
    // )}
    >
      {Connected?.length > 0 && (
        <DragScroll
          className="DragCss"
          width={"calc(100vw - 175px)"}
          height={"100%"}
        >
          <div>
            <Table
              rowKey={(record) => record.userId}
              sticky={false}
              bordered={true}
              loading={isLoading || isChatLoading}
              columns={columns(initiateChat, handleProfile)}
              dataSource={Connected}
              rowSelection={{
                type: "checkbox",
                onChange: (selectedRowKeys) => {
                  console.log(selectedRowKeys);
                },
              }}
              pagination={false}
            />
          </div>
        </DragScroll>
      )}
      {Connected?.length === 0 && (
        <>
          <div>
            <p style={{ padding: "0 16px" }}>
              This is where you'll view candidates you have connected with. Once
              you connect with a candidate your entire team will be able to
              communicate with them.
            </p>
          </div>
          <DragScroll
            className="DragCss"
            width={"calc(100vw - 175px)"}
            height={"100%"}
          >
            <div>
              <Table
                columns={dummyConnectedColumns}
                dataSource={check}
                sticky={false}
                bordered={true}
                loading={isLoading || isChatLoading}
                pagination={false}
                rowSelection={{
                  type: "checkbox",
                }}
              />
            </div>
          </DragScroll>
        </>
      )}

      <Modal
        className="profile-modal center"
        show={showProfile}
        onHide={() => setShowProfile(false)}
      >
        <UserProfile profileDetails={jobseekerId} />
      </Modal>

      <Modal
        className="view-job-status-modal center medium"
        show={viewStatus}
        onHide={() => {
          setViewStatus(false);
          dispatch(getConnected());
        }}
      >
        <div className="view-job-status">
          <div className="header">
            <div className="title">
              {appliedJobList?.length
                ? "List of applied jobs"
                : "Select status"}
            </div>
          </div>
          <div className="body">
            {appliedJobList?.length >= 1 &&
              appliedJobList?.map((job, index) => (
                <Row gutter={[16, 16]} style={{ paddingBottom: "20px" }}>
                  <Col className="title" span={12}>
                    <p>
                      {job?.jobPost?.jobTitle?.title} - {job?.id}
                    </p>
                  </Col>
                  <Col style={{ zIndex: `${300 - index}` }} span={12}>
                    <Form initialValues={job?.jobStatus}>
                      <Form.Item name="id">
                        <Select
                          className="scroll-to-smooth status-select"
                          onSelect={(v) => handleStatusUpdate(v, job?.id)}
                          dropdownClassName="status-dropdown"
                          placeholder="Move to"
                          getPopupContainer={(trigger) => trigger.parentNode}
                        >
                          {jobStatusList?.map((d) => (
                            <Option value={d?.id}>
                              <span
                                style={{
                                  backgroundColor: `${d?.color}`,
                                }}
                              ></span>
                              <span>{d?.title}</span>
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              ))}

            {!appliedJobList?.length &&
              postedJobs?.map((job, index) => (
                <Row gutter={[16, 16]} style={{ paddingBottom: "20px" }}>
                  <Col className="title" span={12}>
                    {job?.jobTitle?.title} - {job?.id}
                  </Col>
                  <Col style={{ zIndex: `${300 - index}` }} span={12}>
                    <Form initialValues={job?.jobStatus}>
                      <Form.Item name="id">
                        <Select
                          onSelect={(v) => handleApplyToJob(v, job?.id)}
                          className="status-select"
                          dropdownClassName="status-dropdown"
                          placeholder="Move to"
                          getPopupContainer={(trigger) => trigger.parentNode}
                        >
                          {jobStatusList?.map((d) => (
                            <Option value={d?.id}>
                              <span
                                style={{
                                  backgroundColor: `${d?.color}`,
                                }}
                              ></span>
                              <span>{d?.title}</span>
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              ))}
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default CandidateTable;
