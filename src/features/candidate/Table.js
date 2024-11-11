import React, { useEffect, useState } from "react";

import moment from "moment";
import { Table } from "antd";

import { getCandidates } from "./thunk";
import { selectCandidates, selectStatus } from "./slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import defaultImage from "../../assets/images/default.png";
import { selectStatus as selectChatStatus } from "../chat/slice";

const columns = (initiateChat) => [
  {
    title: "Name",
    width: 270,
    dataIndex: "jobseeker",
    fixed: "left",
    render: (data) => {
      return (
        <div className="user-name-cell">
          <span className="username">
            <img
              className="user-image"
              src={data?.jobSeekerProfile?.profilePhoto || defaultImage}
            />
            <p className="ml-2 mr-3">{`${data.firstName} ${data.lastName}`}</p>
          </span>
          <span onClick={initiateChat(data.id)}>
            <img
              className="chat"
              src={require("../../assets/images/icons/directchat-icon.svg")}
            />
          </span>
        </div>
      );
    },
  },
  {
    title: "Date applied",
    width: 150,
    dataIndex: "createdAt",
    render: (text) => moment(text).format("DD/MM/YYYY"),
  },
  {
    title: "Status",
    dataIndex: "jobStatus",
    width: 150,
    render: (text) => text?.title,
  },
  {
    title: "Sector",
    dataIndex: "jobseeker",
    width: 150,
    render: (text) => {
      return <div>{text?.jobSeekerProfile?.categories?.title}</div>;
    },
  },
  {
    title: "Job title",
    dataIndex: "jobPost",
    width: 180,
    render: (text) => text?.jobTitle?.title,
  },
  {
    title: "Availability",
    dataIndex: "jobseeker",
    width: 150,
    render: (text) => {
      return <div>{text?.isActive ? "Available" : "Not Available"}</div>;
    },
  },
  {
    title: "Job posted by",
    dataIndex: "address",
    width: 180,
  },
  {
    title: "Notice period",
    dataIndex: "jobseeker",
    width: 180,
    render: (text) => text?.jobSeekerProfile?.noticePeriod?.title,
  },
  {
    title: "Current country",
    dataIndex: "jobseeker",
    width: 200,
    render: (text) => text?.jobSeekerProfile?.country?.title,
  },
  {
    width: 150,
    title: "Current city",
    dataIndex: "jobseeker",
    render: (text) => text?.jobSeekerProfile?.city?.title,
  },
  {
    width: 200,
    title: "Passport nationality",
    dataIndex: "jobseeker",
    render: (text) => text?.jobSeekerProfile?.nationality?.title,
  },
  {
    width: 180,
    title: "Native language",
    dataIndex: "jobseeker",
    render: (text) => text?.jobSeekerProfile?.nativeLanguage?.title,
  },
  {
    width: 180,
    title: "Other language",
    dataIndex: "jobseeker",
    render: (text) => {
      return (
        <div>{text?.jobSeekerProfile?.otherLanguages?.map((d) => d.title)}</div>
      );
    },
  },
  {
    width: 180,
    title: "Desired locations",
    dataIndex: "jobseeker",
    // render: (text) => {
    //   return (
    //     <div>
    //       {languages
    //         ?.filter((language) => text.jobSeekerProfile.otherLanguagesId?.find((id) => id == language.id))
    //         ?.map((item) => (
    //           <div>{`${item.title},`}</div>
    //         ))}
    //     </div>
    //   );
    // },
    render: (text) => {
      return (
        <div>
          {text?.jobSeekerProfile?.desiredLocations?.map((d) => d.title)}
        </div>
      );
    },
  },
  {
    width: 200,
    title: "min monthly salary",
    dataIndex: "jobPost",
    render: (text) => text.salaryRangeFrom,
  },
  {
    width: 150,
    title: "Gender",
    dataIndex: "jobseeker",
    render: (text) => text.jobSeekerProfile.gender,
  },
  {
    width: 180,
    title: "Medical condition",
    dataIndex: "jobseeker",
    render: (text) => (
      <div>
        {text.jobSeekerProfile.medicalConditions === null
          ? "No"
          : text.jobSeekerProfile.medicalConditions}
      </div>
    ),
  },
  {
    width: 200,
    title: "clear police certificate",
    dataIndex: "jobseeker",
    render: (text) => (
      <div>
        {" "}
        {text.jobSeekerProfile.isClearPoliceCertificaete ? "Yes" : "No"}
      </div>
    ),
  },
];

const CandidateTable = ({ initiateChat }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectStatus);
  const candidates = useAppSelector(selectCandidates);
  const isChatLoading = useAppSelector(selectChatStatus);
  const [state, setState] = useState([]);

  // const rowSelection = {
  //   selectedRowKeys: state,
  //   onChange: onSelectChange,
  // };

  useEffect(() => {
    dispatch(getCandidates());
  }, [dispatch]);

  // const onSelectChange = (selectedRowKeys) => {
  //   console.log("selectedRowKeys changed: ", selectedRowKeys);
  //   setState(selectedRowKeys);
  // };

  return (
    <Table
      bordered={true}
      loading={isLoading || isChatLoading}
      columns={columns(initiateChat)}
      dataSource={candidates}
      scroll={{ x: 1500 }}
    />
  );
};

export default CandidateTable;
