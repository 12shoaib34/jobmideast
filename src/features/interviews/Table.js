import React, { useState } from "react";
import { Table, Select, Dropdown, Form } from "antd";
import Button from "../../shared-ui/Button/Button";
import { HiOutlinePlus } from "react-icons/hi";

const Option = Select;

const data = [
  {
    key: "1",
    name: "Abdul Hai",
    userImage: "../../assets/images/ms/ms-10.png",
    interviewDate: "02/02/2021",
    interviewTime: "09:00 AM",
    interviewType: "Face to face",
    positionAppliedFor: "Primary Teacher",
    interviewPanel: "Images",
    status: "+",
  },
  {
    key: "2",
    name: "Abdullah Chaghtai",
    userImage: "../../assets/images/ms/ms-11.png",
    interviewDate: "02/02/2021",
    interviewTime: "09:00 AM",
    interviewType: "Face to face",
    positionAppliedFor: "Primary Teacher",
    interviewPanel: "Images",
    status: "+",
  },
  {
    key: "3",
    name: "Kamal Alam",
    userImage: "../../assets/images/ms/ms-11.png",
    interviewDate: "02/02/2021",
    interviewTime: "09:00 AM",
    interviewType: "Face to face",
    positionAppliedFor: "Primary Teacher",
    interviewPanel: "Images",
    status: "+",
  },
];

const CandidateTable = () => {
  // const [colorSelector, setColorSelector] = useState(false);
  // const [selectedColor, setSelectedColor] = useState("sdfsfsdfdsfsdf");

  const columns = [
    {
      title: "Name",
      width: 240,
      dataIndex: "name",
      // fixed: "left",
      render: (text, index) => {
        return (
          <div className="user-name-cell">
            <div className="d-flex align-items-center">
              <img
                className="user-image"
                src={require(`../../assets/images/ms/ms-3.png`)}
              />
              <p className="mx-3 mb-0">{index.name}</p>
            </div>
            <div className="trash-n-chat">
              <img
                className="trash"
                src={require("../../assets/images/icons/trash-icon.svg")}
              />
              <img
                className="chat"
                src={require("../../assets/images/icons/directchat-icon.svg")}
              />
            </div>
          </div>
        );
      },
    },
    {
      title: "Interview date",
      width: 100,
      dataIndex: "interviewDate",
    },
    {
      title: "Interview time",
      dataIndex: "interviewTime",
      width: 100,
    },
    {
      title: "Interview type",
      dataIndex: "interviewType",
      width: 150,
    },
    {
      title: "Position applied for",
      dataIndex: "positionAppliedFor",
      width: 150,
    },
    {
      title: "Interview panel",
      dataIndex: "interviewPanel",
      width: 130,
      render: () => {
        return (
          <div className="inter-panel-images">
            <img src={require("../../assets/images/ms/ms-1.png")} alt="" />
            <img src={require("../../assets/images/ms/ms-2.png")} alt="" />
            <img src={require("../../assets/images/ms/ms-4.png")} alt="" />
          </div>
        );
      },
    },
    {
      title: "Notes",
      dataIndex: "notes",
      width: 200,
      render: () => {
        return (
          <div className="write-notes-wrapper">
            <textarea
              placeholder="Write notes..."
              className="write-notes"
              name="id"
              id=""
              cols="30"></textarea>
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 65,
      render: (text, index) => {
        return (
          <div className="update-status">
            <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft">
              <Button themecolor="m-auto rounded shadowed">
                <HiOutlinePlus className="plus" />
              </Button>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  const menu = (
    <>
      <Form layout={"vertical"} className="c-dropdown-cetegory">
        <Form.Item
          name="id"
          label={<label>Add new category</label>}
          className="select-w100">
          <Select
            getPopupContainer={(trigger) => trigger.parentNode}
            placeholder="Select">
            <Option value="view all">Complete</Option>
            <Option value="view all">Rejected</Option>
            <Option value="view all">Hire</Option>
          </Select>
        </Form.Item>
        <Button themecolor="outlined-green" className="mt-4">
          Save
        </Button>
      </Form>
    </>
  );

  return (
    <div>
      <Table
        pagination={{ position: ["bottomCenter"] }}
        key={"key"}
        // bordered={true}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500 }}
        rowSelection={{ type: "radio" }}
      />
    </div>
  );
};

export default CandidateTable;
