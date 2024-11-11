import React, { useEffect, useState } from "react";

import { Select, Input, Form, Empty, Popover } from "antd";

import { warning } from "../../utils/helper";
import Button from "../../shared-ui/Button/Button";
import { selectCurrentEmployerId, selectEmployerProfile } from "../auth/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectCompanyRole,
  selectTeamMembers,
  selectTeamMembersAddSuccess,
  selectUpdateSuccess,
  selectTeamMemberDeleteSuccess,
} from "./slice";
import {
  addTeamMember,
  deleteTeamMember,
  getCompanyRole,
  getTeamMembers,
  updateRole,
} from "./thunk";
import { showSuccessMessage } from "../../utils/message";
import { getEmployerProfle } from "../auth/thunk";
import defaultImage from "../../assets/images/user.png";
import { Table } from "antd";
import { columns, data } from "./Data";
import { useHistory } from "react-router";
import { postStartConversation } from "../chat/thunk";
import { selectChatSuccess } from "../chat/slice";
import DragScroll from "../../shared-ui/DragableScroll/DragScroll";

const Option = Select;

const RolesDescription = () => {
  return (
    <Table
      style={{ borderRadius: "50px" }}
      pagination={false}
      size="small"
      bordered={true}
      columns={columns}
      dataSource={data}
    ></Table>
  );
};

const TeamMembers = () => {
  const [form] = Form.useForm();
  const [userRoleForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const teamMembers = useAppSelector(selectTeamMembers);
  const companyRole = useAppSelector(selectCompanyRole);
  const currentEmployerId = useAppSelector(selectCurrentEmployerId);
  const updateSuccess = useAppSelector(selectUpdateSuccess);
  const employerProfile = useAppSelector(selectEmployerProfile);
  const teamMembersAddSuccess = useAppSelector(selectTeamMembersAddSuccess);
  const startChatSuccess = useAppSelector(selectChatSuccess);
  const teamMemberDeleteSuccess = useAppSelector(selectTeamMemberDeleteSuccess);
  const [userId, setUserId] = useState(null);
  const [selfUserId, setSelfUserId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedRoleWithIndex, setSelectedRoleWithIndex] = useState([]);
  const [selectedRoleFromDropDown, setSelectedRoleFromDropDown] =
    useState(null);

  const history = useHistory();
  useEffect(() => {
    dispatch(getTeamMembers());
    dispatch(getCompanyRole());
    dispatch(getEmployerProfle());
  }, []);
  useEffect(() => {
    if (teamMemberDeleteSuccess) {
      dispatch(getTeamMembers());
    }
  }, [teamMemberDeleteSuccess]);

  useEffect(() => {
    if (teamMembersAddSuccess === true) {
      showSuccessMessage("Team member invite sent");
    }
  }, [teamMembersAddSuccess]);

  useEffect(() => {
    if (startChatSuccess) {
      history.push(`/chat`);
    }
  }, [startChatSuccess, userId]);

  const handleUpdateRole = (id) => {
    setSelectedRoleWithIndex(
      selectedRoleWithIndex.filter((item, i) => item[i] !== id)
    );
    if (selected === "delete" && employerProfile.userId === selfUserId) {
      warning("you can't delete yourself from the team");
    } else if (selected === "delete" && employerProfile.userId !== selfUserId) {
      dispatch(deleteTeamMember(userId));
      dispatch(getTeamMembers());
    } else {
      dispatch(updateRole(selected));
      dispatch(getTeamMembers());
    }
  };

  const handleAddTeamMember = (values) => {
    const payload = values;
    dispatch(addTeamMember({ payload }));
    form.resetFields();
  };

  // const handleDeleteTeamMember = (id) => {
  //   if (id === employerProfile[0].userId) {
  //     warning("you cant delete yourself from the team");
  //   }
  // };

  const initiateChat = (id) => {
    console.log("FINCTION IN TEAM MEMEBER");
    localStorage.setItem("userId", id);
    const payload = {
      userId2: id,
    };
    dispatch(postStartConversation({ payload }));
  };

  const goToChat = (title, id) => {
    if (title === "Main Admin") {
      history.push("/chat");
    } else {
      initiateChat(id);
    }
  };

  return (
    <div className="team-table">
      <div className="table-heading">
        <p className="title">Team Members</p>
      </div>
      <DragScroll
        className="DragCsss"
        width={"calc(100vw - 230px)"}
        height={"100%"}
      >
        <div className="dash-table">
          <div className="table-head">
            <div className="table-cell">
              <p className="table-user-name">Name</p>
            </div>
            <div className="table-cell">
              <p>Job title</p>
            </div>
            <div className="table-cell">
              <p>Message</p>
            </div>
            <div className="table-cell">
              <p>Role</p>
              &nbsp;
              <span className="manage-profile-btns-trans">
                <Popover
                  getPopupContainer={(trigger) => trigger.parentNode}
                  overlayClassName="roles-description-popover"
                  arrowPointAtCenter
                  placement="right"
                  trigger={["click"]}
                  content={<RolesDescription></RolesDescription>}
                >
                  <img
                    src={require("./../../assets/images/icons/information-icon.svg")}
                    alt=""
                  />
                </Popover>
              </span>
            </div>
            <div className="table-cell">
              <p>Action</p>
            </div>
            <div className="table-cell">
              <Form.Item
                name="search"
                className="c-input c-input-with-icon w-100"
              >
                <img
                  className="input-icon"
                  src={require("../../assets/images/icons/search_icon.svg")}
                  alt=""
                />

                <Input
                  autoComplete={"" + Math.random()}
                  placeholder="Search"
                  className="ant-input-lg"
                  type="text"
                />
              </Form.Item>
            </div>
          </div>

          {/* !teamMembers.length && (
            <div className="no-data">
              <Empty
                image={require("../../assets/images/icons/no-data.png")}
                description="No data"
              />
            </div>
          )*/}

          {teamMembers.map((value, i) => {
            return (
              <div key={i}>
                <div className="table-row">
                  <div className="table-cell">
                    <img
                      className="user-image"
                      src={value.profilePhoto || defaultImage}
                    />
                    <p className="user-name">
                      {/* {value.user.firstName + value.user.lastName} */}
                      {value.user.firstName}
                    </p>
                  </div>
                  <div className="table-cell">
                    <p>{value.jobTitle.title}</p>
                  </div>
                  <div className="table-cell">
                    {value.user.id !== currentEmployerId && (
                      <img
                        onClick={() =>
                          goToChat(value.companyRole.title, value.userId)
                        }
                        src={require("../../assets/images/icons/directchat-icon.svg")}
                      />
                    )}
                  </div>
                  <div className="table-cell">
                    <p>{value.companyRole.title}</p>
                  </div>{" "}
                  <div id="select-fix" className="table-cell">
                    {value.user.id !== currentEmployerId &&
                      value.companyRole.title !== "Main Admin" && (
                        <Form
                          style={{ zIndex: 400 - i + 50 }}
                          form={userRoleForm}
                          className="user-role-form"
                        >
                          <Form.Item
                            className="w-100"
                            name={`select-user-role${i}`}
                          >
                            <Select
                              className="scroll-to-smooth"
                              getPopupContainer={(trigger) =>
                                trigger.parentNode
                              }
                              placeholder="Select"
                              dropdownMatchSelectWidth={false}
                              // onFocus={userRoleForm.resetFields()}
                              onChange={(e) => console.log(e)}
                              onSelect={(val) => {
                                if (val === "delete") {
                                  console.log("value", val);
                                  setSelected(val);
                                  setUserId(value.id);
                                  setSelfUserId(value.userId);
                                  setSelectedRoleWithIndex([
                                    ...selectedRoleWithIndex,
                                    i,
                                  ]);
                                } else {
                                  setSelected({
                                    roleId: val,
                                    userId: value.id,
                                  });

                                  setSelectedRoleWithIndex([i]);
                                }
                              }}
                            >
                              {companyRole?.map((role) => (
                                <Option value={role.id}>{role.title}</Option>
                              ))}
                              <Option value="delete">Delete user</Option>
                            </Select>
                          </Form.Item>
                        </Form>
                      )}
                  </div>
                  <div className="table-cell justify-content-center">
                    {/* {console.log(
                      "CHECKER",
                      // value.user.id !== currentEmployerId,
                      // value.companyRole.title !== "Main Admin",
                      // selected
                      selectedRoleWithIndex?.some((id) => id === i)
                    )} */}
                    {value.user.id !== currentEmployerId &&
                      value.companyRole.title !== "Main Admin" &&
                      selected &&
                      selectedRoleWithIndex?.some((id) => id === i) && (
                        <Button
                          onClick={() => {
                            handleUpdateRole(i);
                            setSelected(null);
                            userRoleForm.resetFields();
                            setSelectedRoleWithIndex([]);
                          }}
                          themecolor="light"
                        >
                          Confirm
                        </Button>
                      )}
                  </div>
                  {/* <div className="table-cell justify-content-center">
                    {!(value.user.id === currentEmployerId) &&
                      userRoleForm.getFieldValue("select-user-role") &&
                      // selected &&
                      selectedRoleWithIndex?.some((id) => id === i) && (
                        <Button
                          onClick={() => {
                            handleUpdateRole(i);
                            setSelected(null);
                            userRoleForm.resetFields();
                          }}
                          themecolor="light">
                          Confirm
                        </Button>
                      )}
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      </DragScroll>

      <div className="table-footer">
        <div className="fix-width">
          <Form
            form={form}
            className="search-team-member"
            onFinish={handleAddTeamMember}
          >
            <Form.Item
              label={"Add new team member"}
              name="firstName"
              className="c-input"
            >
              <Input
                autoComplete={"" + Math.random()}
                className="ant-input-lg"
                placeholder="First name"
              ></Input>
            </Form.Item>
            <Form.Item name="lastName" className="c-input">
              <Input
                autoComplete="off"
                className="ant-input-lg"
                placeholder="Surname"
              ></Input>
            </Form.Item>
            <Form.Item name="email" className="c-input w-100">
              <Input
                autoComplete={"" + Math.random()}
                type="email"
                className="ant-input-w100"
                placeholder="Email address"
              ></Input>
            </Form.Item>
            <div className="res-w-100">
              <Button
                style={{ marginBottom: "1px" }}
                themecolor="light"
                htmlType="submit"
              >
                Send
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
