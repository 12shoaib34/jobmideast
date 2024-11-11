import { Select, Table, Form, Popover, Input, Pagination } from "antd";
import DragScroll from "../../shared-ui/DragableScroll/DragScroll.jsx";
import React, { useEffect, useState, useRef } from "react";
import CButton from "../../shared-ui/Button/Button";
import CStatisticCard from "../../shared-ui/StatisticCard/StatisticCard";
import Button from "../../shared-ui/Button/Button";
import "./_YourJobs.scss";
import "./_Responsive.scss";
import InterviewBoard from "./InterviewBoard";
import PostJob from "../postJob/PostJob";
import Modal from "../../shared-ui/Modal/Modal";
import { Modal as antModal } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getCounter,
  getJobList,
  deleteJobs,
  duplicateJob,
  getPostedJobs,
  getJobPost,
  getJobDetailsById,
} from "./thunk";
import {
  selectCounter,
  selectJobList,
  selectDuplicateSuccess,
  selectDeleteSuccess,
  selectJobTitles,
  selectStatus,
  selectPostedJobs,
  selectJobListPage,
  selectJobByIdSuccess,
} from "./slice";
import {
  getAppliedProfiles,
  getOtherProfiles,
  updateEmploymentActivities,
} from "./service";
import {
  selectCurrencyType,
  selectEmployerProfile,
  selectEmploymentType,
  selectJobStatus,
  selectSalaryType,
} from "../auth/slice";
import moment from "moment";
import { success } from "../../utils/helper";
import { showSuccessMessage, showWarningMessage } from "../../utils/message";
import JobDetails from "../../app-ui/JobDetails/JobDetails";
import { transformJobData } from "./transformers";
import { selectCountries } from "../auth/slice";
import { getPostedJobs as jobs } from "./service";
import { SuperSelectInInterviewBoard } from "./SuperSelectInInterviewBoard";
import FilterModal from "../../app-ui/filterModal/FilterModal";
// import { createLogger } from "redux-logger";
// import DragScroll from "../../shared-ui/DragableScroll/DragScroll.jsx";

const { Option } = Select;
const { confirm } = antModal;
const queryString = require("query-string");

const ShareComponent = ({ profileId, jobId }) => {
  const shareLink = `${process.env.REACT_APP_HOMEPAGE_URL}/share-job-details/${jobId}`;
  // const shareLink = `jobsmideast.com/jobs`;

  return (
    <div className="dropdown">
      <div className="dropdown-items">
        <div className="social-btns">
          {/* <span className="btns">
            <img
              className="avatar"
              src={require("../../assets/images/icons/facebook-icon.svg")}
              alt=""
            />
            <div>Facebook</div>
          </span> */}

          <span className="btns">
            <img
              className="avatar"
              src={require("../../assets/images/icons/email-icon-2.svg")}
              alt=""
            />
            <div> Email</div>
          </span>

          {/* <span className="btns">
            <img
              className="avatar"
              src={require("../../assets/images/icons/whatsapp-icon.svg")}
              alt=""
            />
            <div>Whatsapp</div>
          </span> */}
        </div>
        <Form className="c-form" layout="vertical">
          <Form.Item
            name="profileLink"
            className="c-input my-2 form-padding w-100"
            label={"Embed"}
          >
            <Input
              // autoComplete={"" + Math.random()}
              readOnly
              size="small"
              type="text"
              defaultValue={shareLink}
              className="w-100"
            />
          </Form.Item>

          <span className="copy-links">
            <Button
              className={`light`}
              onClick={() => {
                navigator.clipboard.writeText(shareLink);
                showSuccessMessage("Link copied to clipboard");
              }}
            >
              Copy
            </Button>
          </span>
        </Form>
      </div>
    </div>
  );
};

const YourJobs = () => {
  // const [premium, setPremium] = useState(false);
  const [shareProfileModal, setShareProfileModal] = useState(false);
  const [saveFilterObject, setSaveFilterObject] = useState(null);
  const [isLoadingState, setLoading] = useState(false);
  // states
  const [status, setStatus] = useState(false);
  const [showJobApplications, setShowJobApplications] = useState(false);
  const [showJobPost, setPost] = useState(false);
  const [selectedJobIds, setselectedJobIds] = useState([]);
  const [selectedForEditId, setSelectedForEditId] = useState(null);
  const [jobDetails, setJobDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [SelectJob, setSelectJob] = useState(false);
  const [selectedJobPost, setSelectedJobPost] = useState(null);
  const [filterModalShow, setFilterModalShow] = useState(false);
  const [filteredObject, setFilteredObject] = useState(null);
  const [itemSelected, setItemSelected] = useState(false);
  const [selectJobTitleFromSuperSelect, setSelectJobTitleFromSuperSelect] =
    useState(null);
  const [appliedProfiles, setAppliedProfiles] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [pagesData, setPagesData] = useState({ currentPage: 1, totalItems: 1 });
  // const jobListRef = useRef();
  const [otherProfiles, setOtherProfiles] = useState({
    Contacted: [],
    Hired: [],
    Interview: [],
    Rejected: [],
    Shortlisted: [],
  });

  // redux
  const dispatch = useAppDispatch();
  const counter = useAppSelector(selectCounter);
  const jobList = useAppSelector(selectJobList);
  const isLoading = useAppSelector(selectStatus);
  const jobListPageMeta = useAppSelector(selectJobListPage);
  const jobTitles = useAppSelector(selectJobTitles);
  const employmentTypes = useAppSelector(selectEmploymentType);
  const salaryTypes = useAppSelector(selectSalaryType);
  const currencyType = useAppSelector(selectCurrencyType);
  const countries = useAppSelector(selectCountries);
  const postedJobs = useAppSelector(selectPostedJobs);
  const deleteSuccess = useAppSelector(selectDeleteSuccess);
  const duplicateSuccess = useAppSelector(selectDuplicateSuccess);
  const profile = useAppSelector(selectEmployerProfile);
  const jobStatusList = useAppSelector(selectJobStatus);
  const jobByIdSuccess = useAppSelector(selectJobByIdSuccess);
  useEffect(() => {
    console.log("jobDetails", jobDetails);
  }, [jobDetails]);
  useEffect(() => {
    console.log("showJobPost", showJobPost);
  }, [showJobPost]);
  useEffect(() => {
    console.log("showJobApplications", showJobApplications);
  }, [showJobApplications]);
  const {
    jobCredits,
    contactCredits,
    newMessages,
    newApplication,
    interviewsToday,
    teamMembers,
  } = counter;

  useEffect(() => {
    dispatch(getCounter());
    dispatch(getPostedJobs());
    window.$crisp.push(["do", "chat:show"]);
  }, []);

  // useEffect(() => {
  //   if (selectedJobPost?.id) {
  //     getProfiles();
  //   }
  // }, [selectedJobPost?.id]);

  useEffect(() => {
    const qs = queryString.stringify(pagination);
    dispatch(getJobList(qs));
    // jobListRef.current.scrollTo(0, 0);
  }, [pagination]);

  useEffect(() => {
    if (jobListPageMeta) {
      setPagesData(jobListPageMeta);
    }
  }, [jobListPageMeta]);

  useEffect(() => {
    if (duplicateSuccess === true || deleteSuccess === true) {
      const qs = queryString.stringify(pagination);
      dispatch(getJobList(qs));
      if (duplicateSuccess) {
        setselectedJobIds([]);
        success("Successfully Duplicated");
      }
      if (deleteSuccess) {
        setselectedJobIds([]);
        showSuccessMessage("successfully Deleted");
      }
    }
  }, [duplicateSuccess, deleteSuccess]);

  const handleDeleteJobs = () => {
    dispatch(deleteJobs(selectedJobIds));
  };

  const handleDuplicateJobs = () => {
    dispatch(duplicateJob(selectedJobIds));
    setSelectJob(false);
  };

  useEffect(() => {
    if (selectedForEditId) {
      setPost(true);
    }
  }, [selectedForEditId]);

  useEffect(() => {
    if (!showJobPost) {
      setselectedJobIds([]);
    }
  }, [showJobPost]);

  const handleUpdateJobPost = () => {
    if (selectedForEditId === selectedJobIds[0]) {
      dispatch(getJobPost(selectedForEditId));
      setPost(true);
    }
    if (selectedJobIds?.length === 1) {
      setSelectedForEditId(selectedJobIds[0]);
    } else {
      showWarningMessage("select a single job first");
    }
  };

  const getProfiles = (skipLoading = false) => {
    if (!skipLoading) {
      setLoading(true);
    }
    if (!selectJobTitleFromSuperSelect) {
      dispatch(getJobList({ params: { skipLoading } }));
    }
    const req = [
      getAppliedProfiles(selectedJobPost?.id),
      getOtherProfiles(selectedJobPost?.id),
    ];

    Promise.all(req).then((res) => {
      setAppliedProfiles(res[0].data);
      setOtherProfiles(res[1].data);
      setLoading(false);
      setStatus(null);
      setItemSelected(false);
    });
  };

  useEffect(() => {
    if (!selectJobTitleFromSuperSelect) {
      dispatch(getJobList());
    }
  }, [selectJobTitleFromSuperSelect]);

  const handleStatusUpdate = (jobStatusId) => {
    setStatus(jobStatusId);
    const allItems = [
      ...appliedProfiles,
      ...otherProfiles.Shortlisted,
      ...otherProfiles.Contacted,
      ...otherProfiles.Interview,
      ...otherProfiles.Rejected,
      ...otherProfiles.Hired,
    ];
    const selectedItemIds = [];
    const req = [];
    for (const item of allItems) {
      if (item?.selected) {
        selectedItemIds.push(item.id);
        req.push(updateEmploymentActivities(item.id, { jobStatusId }));
      }
    }
    setLoading(true);
    Promise.all(req).then((res) => {
      getProfiles();
    });
  };

  const handlePreviewJob = (id) => {
    setJobDetails(true);
    setSelectedJob(jobList.find((x) => x.id === id));
  };

  useEffect(() => {
    if (jobByIdSuccess) {
      console.log("JOB LIST", jobList?.[0]);
      setSelectedJobPost(jobList?.[0]);
    }
  }, [jobByIdSuccess]);

  function showConfirmDeleteJobs() {
    confirm({
      title: "Are you sure you want to proceed?",
      onOk() {
        handleDeleteJobs();
        setSelectJob(false);
      },
    });
  }

  const columns = [
    {
      title: "",
      dataIndex: "id",
      width: 10,
      render: (text) => (
        <img
          src={require("../../assets/images/icons/eye.svg")}
          onClick={() => handlePreviewJob(text)}
          fontSize="20px"
        />
      ),
    },
    {
      title: "Date Posted",
      dataIndex: "createdAt",
      render: (text) => (
        <div>{moment(text ? text : moment()).format("DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "Job Title",
      background: "red",
      dataIndex: "jobTitle",

      render: (text, record) => (
        <div
          className="job-title"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowJobApplications(true);
            setSelectedJobPost(record);
          }}
        >
          {`${text.title}  (Job ID: ${record.id})`}
        </div>
      ),
    },
    {
      title: "Number of Applicants",
      dataIndex: "employmentActitivitesCount",
      align: "center",
    },
    {
      title: "New Applicants",
      align: "center",
      dataIndex: "countOfRecentProfile",
    },
    {
      title: "Posted By",
      dataIndex: "createdBy",
      align: "center",
      render: (text, record) => <div>{record?.postCreatedBy?.firstName}</div>,
    },
    {
      title: "Shortlisted Profiles",
      align: "center",
      dataIndex: "countOfShortList",
    },
    {
      title: "Hired",
      dataIndex: "countOfHired",
      align: "center",
    },
    // {
    //   title: "Make Premium",
    //   align: "center",
    //   dataIndex: "premium",
    //   render: (text, record, index) => {
    //     if (record.premium == true) {
    //       return (
    //         <>
    //           <GiCutDiamond color="#5271FF" fontSize="20px" />
    //           Premium
    //         </>
    //       );
    //     }
    //     return {
    //       children: (
    //         <>
    //           {" "}
    //           <Checkbox
    //             className="mr-1"
    //             onClick={() => setPremium(true)}></Checkbox>{" "}
    //           Make Premium
    //         </>
    //       ),
    //     };
    //   },
    // },
  ];

  return (
    <div className="your-jobs">
      <div className="header">
        {!showJobApplications && !showJobPost && (
          <div className="btn-div">
            <CButton
              onClick={() => {
                setPost(true);
                setselectedJobIds([]);
              }}
            >
              Post job
            </CButton>
            <Form.Item name="id" style={{ zIndex: 500 }}>
              <SuperSelectInInterviewBoard
                style={{ width: "100%" }}
                placeholder="Select job title"
                getPopupContainer={(trigger) => trigger.parentNode}
                fetchOptions={jobs}
                onSelect={(v) => {
                  dispatch(getJobDetailsById(v));
                  setSelectJobTitleFromSuperSelect(v);
                }}
                onClear={() => {
                  setSelectJobTitleFromSuperSelect(null);
                  getProfiles();
                }}
                keys={["id", "jobTitle"]}
                onClear={() => {
                  dispatch(getJobList());
                }}
              />
            </Form.Item>
            {/* <CButton themecolor="primary">List View</CButton> */}
          </div>
        )}
        <div className="card-div">
          <div className="wrapper">
            <CStatisticCard
              className="cards"
              count={jobCredits}
              content={"Job credits"}
              src={require("../../assets/images/dashboard/yellow.png")}
              goto="/credits"
            />
            <CStatisticCard
              className="cards"
              count={contactCredits}
              content={"Contact credits"}
              src={require("../../assets/images/dashboard/light-green.png")}
              goto="/credits"
            />
            <CStatisticCard
              className="cards"
              count={newMessages}
              content={"New messages"}
              src={require("../../assets/images/dashboard/green.png")}
              goto="/chat"
            />
            <CStatisticCard
              className="cards"
              count={newApplication}
              content={"New application"}
              src={require("../../assets/images/dashboard/purple.png")}
              goto="/"
            />
            <CStatisticCard
              className="cards"
              count={interviewsToday}
              content={"Interviews today"}
              src={require("../../assets/images/dashboard/sky-blue.png")}
              goto="/"
            />
            <CStatisticCard
              className="cards"
              count={teamMembers}
              content={"Team members"}
              src={require("../../assets/images/dashboard/pink.png")}
              goto="/"
            />
          </div>
        </div>
      </div>

      {jobList?.length > 0 && (
        <div className="table">
          {SelectJob && (
            <div className="header">
              {selectedJobIds.length === 1 && (
                <span
                  onClick={() => handleUpdateJobPost()}
                  className="mx-1 cursor-pointer"
                >
                  Edit
                </span>
              )}
              <span
                onClick={() => showConfirmDeleteJobs()}
                className="mx-1 cursor-pointer"
                style={{ color: "red" }}
              >
                Delete
              </span>
              <span
                onClick={() => handleDuplicateJobs()}
                className="mx-1 mr-2 cursor-pointer"
              >
                Duplicate
              </span>
              {selectedJobIds.length < 2 && (
                <>
                  <Popover
                    overlayClassName="share-dropdown"
                    placement="bottom"
                    content={
                      <ShareComponent
                        profileId={profile?.user?.shareProfileId}
                        jobId={selectedJobIds[selectedJobIds.length - 1]}
                      />
                    }
                    trigger="click"
                  >
                    <span className="cursor-pointer">
                      Share
                      <img
                        className="avatar"
                        src={require("../../assets/images/icons/profile/fly.png")}
                        alt=""
                      />
                    </span>
                  </Popover>
                </>
              )}
            </div>
          )}
          <DragScroll
            className="ScrollTable"
            width={"calc(100vw - 170px)"}
            height={"100%"}
          >
            <div className="overflow-div">
              <Table
                loading={isLoading}
                // scroll={{ x: "1400px" }}
                rowKey={(record) => record.id}
                pagination={false}
                rowSelection={{
                  type: "checkbox",
                  selectedRowKeys: selectedJobIds,
                  onChange: (selectedRowKeys) => {
                    console.log("selectedRowKeys", selectedRowKeys);
                    setselectedJobIds(selectedRowKeys);
                    setSelectJob(selectedRowKeys.length ? true : false);
                  },
                  onSelectNone: () => {
                    setselectedJobIds([]);
                    setSelectedForEditId(null);
                  },
                }}
                dataSource={jobList}
                columns={columns}
                // scroll={{ x: true }}
              />
            </div>
          </DragScroll>
          {/* {console.log("=============", record.id)} */}
        </div>
      )}
      {/*----------------------------------------------------------- */}
      {/*  P A G I N A T I O N */}
      {jobList?.length > 0 && (
        <div className="pagination center">
          <Pagination
            onChange={(page, pageSize) => {
              setPagination({ page: page, limit: 10 });
            }}
            defaultCurrent={pagesData?.currentPage}
            current={pagesData?.currentPage}
            total={pagesData?.totalItems}
            showSizeChanger={false}
            showQuickJumper
          />
        </div>
      )}
      {/*----------------------------------------------------------- */}
      <div
        className={`job-post-wrapper-hide ${showJobPost ? "show-post" : "post-hide"}`}
      >
        <PostJob
          jobPostId={selectedForEditId}
          setJobPostId={setSelectedForEditId}
          setSelectJob={setSelectJob}
          HandleForm={() => setPost(false)}
        />
      </div>
      <div
        className={`job-applications ${
          showJobApplications ? "job-applications-show" : "job-application-hide"
        }`}
      >
        <div className="header">
          <div className="first-header-row">
            <span className="back-btn">
              <img
                className="back-icon"
                onClick={() => {
                  // dispatch(getJobList());
                  const qss = queryString.stringify(pagination);
                  dispatch(getJobList(qss));
                  setShowJobApplications(false);
                }}
                src={require("../../assets/images/icons/Back.svg")}
                alt=""
              />
            </span>
            <span className="d-flex first-header-row-second justify-content-between align-items-center w-100">
              <span className="d-flex filter-wrapper ml-2">
                <Button
                  onClick={() => {
                    setPost(true);
                    setSelectedForEditId(null);
                  }}
                  themecolor="grey"
                >
                  Post job
                </Button>
                <div className="title">
                  <span>Job Applications : </span>
                  <span className="blue-text ml-2">
                    {`${selectedJobPost?.jobTitle?.title} (Job ID :${selectedJobPost?.id})`}
                  </span>
                </div>
              </span>
              <span className="search-interview">
                {itemSelected && (
                  <span>
                    <Select
                      className="scroll-to-smooth"
                      dropdownClassName="status-dropdown"
                      placeholder="Move to"
                      getPopupContainer={(trigger) => trigger.parentNode}
                      // disabled={!itemSelected}
                      value={status}
                      onChange={handleStatusUpdate}
                    >
                      {jobStatusList?.map((d) => (
                        <Option value={d?.id}>
                          <span
                            style={{
                              backgroundColor: `${d?.color}`,
                            }}
                          ></span>
                          <span className="status-options">{d?.title}</span>
                        </Option>
                      ))}
                    </Select>
                  </span>
                )}
                <Form.Item name="id" style={{ zIndex: 500 }}>
                  <SuperSelectInInterviewBoard
                    style={{ width: "100%" }}
                    placeholder="Select job title"
                    getPopupContainer={(trigger) => trigger.parentNode}
                    fetchOptions={jobs}
                    onSelect={(v) => {
                      dispatch(getJobDetailsById(v));
                      setSelectJobTitleFromSuperSelect(v);
                    }}
                    keys={["id", "jobTitle"]}
                    onClear={() => {
                      dispatch(getJobList());
                    }}
                  />
                </Form.Item>
              </span>
            </span>
          </div>
        </div>
        <InterviewBoard
          filteredObject={filteredObject}
          jobPostId={selectedJobPost?.id}
          isLoading={isLoading}
          appliedProfiles={appliedProfiles}
          otherProfiles={otherProfiles}
          setShareProfileModal={setShareProfileModal}
          setFilterModalShow={setFilterModalShow}
          setLoading={setLoading}
          setItemSelected={setItemSelected}
          setAppliedProfiles={setAppliedProfiles}
          setOtherProfiles={setOtherProfiles}
          setFilterModalShow={setFilterModalShow}
          getProfiles={getProfiles}
          onSelectCards={(appliedProfiles, otherProfiles) => {
            setAppliedProfiles(appliedProfiles);
            setOtherProfiles(otherProfiles);
          }}
        />
        <FilterModal
          setSaveFilterObject={setSaveFilterObject}
          setFilteredObject={setFilteredObject}
          filterModalShow={filterModalShow}
          setFilterModalShow={setFilterModalShow}
        />
        <Modal
          className="center lg job-details job-details-modal"
          show={jobDetails}
          onHide={() => {
            setJobDetails(false);
            setPost(false);
          }}
        >
          <JobDetails
            data={transformJobData(
              selectedJob,
              jobTitles,
              employmentTypes,
              countries,
              salaryTypes,
              currencyType
            )}
            showAllDetails={false}
            jobDetailsFromYourJobs={jobDetails}
            setJobDetails={setJobDetails}
          />
        </Modal>
      </div>
    </div>
  );
};

export default YourJobs;
