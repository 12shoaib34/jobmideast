import React, { useState, useEffect } from "react";
import CTaskList from "../../app-ui/TaskList/TaskList";
import "./_Interviews.scss";
import { Form, Select, Input, Dropdown, Divider } from "antd";
import Button from "../../shared-ui/Button/Button";
import Modal from "../../shared-ui/Modal/Modal";

import Table from "./Table";
import { HiOutlinePlus } from "react-icons/hi";

const { Option } = Select;

const Interviews = () => {
  const [colorSelector, setColorSelector] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  const HandleCategoryModal = () => setCategoryModal(!categoryModal);

  const colorData = ["#5271FF", "#6c5984", "#fe6868"];

  useEffect(() => {
    window.$crisp.push(["do", "chat:show"]);
  }, []);

  return (
    <div className="interview-page">
      <div className="header-wrapper">
        <Form className="interview-header">
          <div className="search-section">
            <Form.Item name="id" className="select-lg ">
              <Select
                getPopupContainer={(trigger) => trigger.parentNode}
                placeholder="Search by job"
                onChange={null}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
        <div className="update-status">
          <Button onClick={HandleCategoryModal} themecolor="rounded shadowed">
            <HiOutlinePlus className="plus" />
          </Button>
        </div>
      </div>
      <Table />
      {/* {category modal} */}

      <Modal
        show={categoryModal}
        onHide={HandleCategoryModal}
        className="center medium category-modal">
        <Form layout="vertical" className="c-dropdown-menu">
          <h1 className="mb-4">Create new category</h1>
          <div className="dropdown-cell">
            <Form.Item
              name="id"
              label={<label htmlFor="">Category name</label>}
              className="c-input w-100">
              <Input
                autoComplete={"off"}
                placeholder="Enter name here"
                className="ant-input-w100"
              />
            </Form.Item>
          </div>

          <div className="color-selector-main">
            <Form.Item name="id">
              <label>Colour</label>
              <div
                className={`color-selector ${
                  colorSelector ? "color-selector-open" : ""
                }`}>
                <input
                  autoComplete={"" + Math.random()}
                  style={{
                    background: selectedColor,
                  }}
                  className={`slected-color`}
                  value=""></input>
                <Divider
                  type="vertical"
                  style={{ height: "100%", borderColor: "#e0e0e0" }}
                />
                <div className={`colors ${colorSelector ? "colors-open" : ""}`}>
                  {colorData.map((index, key) => {
                    return (
                      <input
                        autoComplete={"" + Math.random()}
                        key={key}
                        style={{ background: index }}
                        className={`${"green"} slected-color green`}
                        onClick={(e) => {
                          setSelectedColor(e.target.value);
                          setColorSelector(false);
                        }}
                        value={index}></input>
                    );
                  })}
                </div>
                <button
                  onClick={() => setColorSelector(!colorSelector)}
                  className="open-selector rounded transparent">
                  <i className="open-icon"></i>
                </button>
              </div>
            </Form.Item>
            <Form.Item name="id" className="save-btn-color-selector-modal">
              <Button themecolor="outlined-green">Save</Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Interviews;
