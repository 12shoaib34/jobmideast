import React, { useState, useEffect } from "react";
import { Row, Input, Form, Col, Dropdown } from "antd";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Button from "../../shared-ui/Button/Button";
import Modal from "../../shared-ui/Modal/Modal";
import { HiOutlinePlus } from "react-icons/hi";
import UserListItems from "../../shared-ui/UserListItems/userListItems";
import { getAllUsers } from "./service";
// import { selectUsers } from "./slice.js";
const UserList = (props) => {
  const dispatch = useAppDispatch();
  const { handleList } = props;
  const [createListModal, setCreateListModal] = useState(false);
  const [dumyListData] = useState([1, 2, 3, 4, 5]);
  const HandleListModal = () => setCreateListModal(!createListModal);
  // const users = useAppSelector(selectUsers);
  const menu = (
    <>
      <div className="create-user-list-dropdown">
        <button onClick={HandleListModal} className="create-list-btn">
          Create new list
        </button>
      </div>
    </>
  );

  const handleCreateList = (v) => { };
  return (
    <div className="user-lists-main">
      <div className="user-list-header">
        <img
          className="back-icon"
          onClick={handleList}
          src={require("../../assets/images/icons/Back.svg")}
          alt=""
        />
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft">
          <Button themecolor="rounded blue">
            <HiOutlinePlus />
          </Button>
        </Dropdown>
        <Modal
          forceRender
          className="center small create-new-list-modal"
          show={createListModal}
          onHide={HandleListModal}>
          <div className="list-modal-header">
            <h1>Create list</h1>
          </div>
          <div className="create-list-cell">
            <Form onFinish={handleCreateList} layout="vertical">
              <Form.Item
                name="title"
                label="List Name"
                name="search"
                className="c-input pb-2">
                <Input
                  autoComplete={"" + Math.random()}
                  placeholder="Name"
                  className="ant-input-w100"
                  type="text"></Input>
              </Form.Item>
            </Form>
          </div>
          <Button themecolor="outlined-green ml-auto">Save</Button>
        </Modal>
      </div>
      <div className="user-list-wrapper">
        <div className="user-list-wrapper-row">
          <Row wrap={true} classname="id">
            <Col className="list-row" span={24}>
              <Row className="user-list-head">
                <Col className="header-titles" span={6}>
                  Name
                </Col>
                <Col className="header-titles pl-3" span={6}>
                  Number of lists
                </Col>
                <Col className="header-titles pl-3" span={12}>
                  Last Updated
                </Col>
              </Row>
            </Col>
            {/* { List Here \/ } */}

            {dumyListData.map((x, i) => {
              return <UserListItems Key={i} />;
            })}

            {/* { List } */}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default UserList;
