import React, { useEffect, useState } from "react";

import { getData } from "country-list";
import { useHistory } from "react-router";
import { Divider, Select, Form, Slider, Input, Checkbox } from "antd";

import "./_Candidates.scss";
import Table from "./Table";
import Modal from "../../shared-ui/Modal/Modal";
import { selectChatSuccess } from "../chat/slice";
import Button from "../../shared-ui/Button/Button";
import { postStartConversation } from "../chat/thunk";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const { Option } = Select;

const Candidates = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const countryList = getData();
  const startChatSuccess = useAppSelector(selectChatSuccess);

  const [filterModalShow, setFilterModalShow] = useState(false);
  const [countriesCitiesModal, setCountriesCitiesModal] = useState(false);
  const [activeCountry, setActiveCountry] = useState(false);

  useEffect(() => {
    if (startChatSuccess) {
      history.push("/chat");
    }
  }, [startChatSuccess]);

  const initiateChat = (id) => () => {
    const payload = {
      userId2: id,
    };
    dispatch(postStartConversation({ payload }));
  };

  return (
    <div className="candidate-page">
      {/* Filter Form */}
      <Form className="candidate-header">
        <div className="filters-section">
          <Button className="filter-btn" themecolor="shadowed rounded">
            <img
              onClick={() => setFilterModalShow(true)}
              className="filter-icon"
              src={require("../../assets/images/icons/filter_icon.svg")}
            />
          </Button>

          <Form.Item name="id" className="select-lg">
            <Select
              allowClear="true"
              placeholder="search by lists"
              onChange={null}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="search-section">
          {/* <Form.Item className="select-lg">
            <Select defaultValue="lucy" onChange={null}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Form.Item> */}
          <Form.Item name="id" className="select-sm">
            <Select
              className="scroll-to-smooth"
              placeholder="actions"
              onChange={null}
            >
              <Option value="jack">Hired</Option>
              <Option value="lucy">Interview</Option>
              <Option value="contacted">Contacted</Option>
              <Option value="disabled" disabled>
                Rejected
              </Option>
              <Option value="Yiminghe">Delete from list</Option>
            </Select>
          </Form.Item>
        </div>
      </Form>

      {/* Candidates Table */}
      <div className="table-data">
        <Table initiateChat={initiateChat} />
      </div>

      {/* Filter Modal */}
      <Modal
        className="center x-lg"
        show={filterModalShow}
        onHide={() => setFilterModalShow(false)}
      >
        <div className="filter-modal">
          <div className="filter-modal-header">
            <div className="title">Filters</div>
            <div className="d-flex">
              <span className="select-sm">
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                >
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                </Select>
              </span>
              <span className="select-sm">
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select by"
                >
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                </Select>
              </span>
              <span className="select-lg">
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                >
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                </Select>
              </span>
            </div>
          </div>
          <Divider />
          <Form className="c-form">
            <div className="form-rows">
              <Form.Item name="id" className="select-lg pb-3">
                <label className="filter-label" htmlFor="">
                  Family status
                </label>
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                >
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                </Select>
              </Form.Item>
              <Form.Item name="id" className="select-lg pb-3">
                <label className="filter-label" htmlFor="">
                  Gender
                </label>
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                >
                  <Option value="view all">Male</Option>
                  <Option value="view all">Female</Option>
                  <Option value="view all">Prefer not to say</Option>
                </Select>
              </Form.Item>
              <Form.Item name="id" className="c-range-bar">
                <label className="filter-label" htmlFor="">
                  Age
                </label>
                <Slider
                  getTooltipPopupContainer={(triggerNode) =>
                    triggerNode.parentNode
                  }
                  className="ant-slider-lg"
                  range
                  defaultValue={[20, 50]}
                />
              </Form.Item>
            </div>
            <div className="form-rows">
              <Form.Item name="id" className="select-lg pb-3">
                <label className="filter-label" htmlFor="">
                  Passport Nationality
                </label>
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                >
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                </Select>
              </Form.Item>
              <Form.Item name="id" className="select-lg pb-3">
                <label className="filter-label required" htmlFor="">
                  Minimum monthly salary in AED
                </label>
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                >
                  <Option value="view all">Male</Option>
                  <Option value="view all">Female</Option>
                  <Option value="view all">Prefer not to say</Option>
                </Select>
              </Form.Item>
              <Form.Item name="id" className="select-lg pb-3">
                <label className="filter-label" htmlFor="">
                  Notice period
                </label>
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                >
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="form-rows">
              <Form.Item name="id" className="select-lg pb-3">
                <label className="filter-label" htmlFor="">
                  Medical conditions
                </label>
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                >
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                </Select>
              </Form.Item>
              <Form.Item name="id" className="select-lg pb-3">
                <label className="filter-label" htmlFor="">
                  Native language
                </label>
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                >
                  <Option value="view all">Male</Option>
                  <Option value="view all">Female</Option>
                  <Option value="view all">Prefer not to say</Option>
                </Select>
              </Form.Item>
              <Form.Item name="id" className="select-lg pb-3">
                <label className="filter-label" htmlFor="">
                  Other languages
                </label>
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                >
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="form-rows">
              <Form.Item name="id" className="select-lg pb-3">
                <label className="filter-label" htmlFor="">
                  Driving license
                </label>
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                >
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                </Select>
              </Form.Item>
              <Form.Item name="id" className="select-lg pb-3">
                <label className="filter-label" htmlFor="">
                  Visa Status
                </label>
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                >
                  <Option value="view all">Male</Option>
                  <Option value="view all">Female</Option>
                  <Option value="view all">Prefer not to say</Option>
                </Select>
              </Form.Item>
              <Form.Item name="id" className="select-lg pb-3">
                <label className="filter-label" htmlFor="">
                  Clear police certificate?
                </label>
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                >
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="form-rows">
              <Form.Item name="id" className="select-lg pb-3">
                <label className="filter-label" htmlFor="">
                  Current Location
                </label>
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                >
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                  <Option value="view all">view all</Option>
                </Select>
              </Form.Item>
              <Form.Item name="id" className="c-range-bar">
                <label className="filter-label" htmlFor="">
                  Minimum years of experience
                </label>
                <Slider
                  getTooltipPopupContainer={(triggerNode) =>
                    triggerNode.parentNode
                  }
                  className="ant-slider-lg"
                  // range
                  // defaultValue={[0, 20]}
                  defaultValue={0}
                  max={20}
                  min={0}
                />
              </Form.Item>
              <Form.Item name="id" className="c-input c-input-with-icon">
                <label className="filter-label" htmlFor="">
                  Desired locations to work in
                </label>
                <img
                  className="input-icon"
                  src={require("../../assets/images/icons/country-select-icon.svg")}
                  alt=""
                />
                <Input
                  autoComplete={"" + Math.random()}
                  onClick={() => setCountriesCitiesModal(true)}
                  placeholder="Select countires and cities"
                  className="ant-input-lg"
                ></Input>
              </Form.Item>
            </div>
            <div className="d-flex justify-content-center">
              <Form.Item name="id" className="c-input">
                <label className="filter-label" htmlFor="">
                  Filter name
                </label>
                <Input
                  autoComplete={"" + Math.random()}
                  placeholder="Enter filter name here"
                  className="ant-input-lg"
                  style={{ width: "450px" }}
                ></Input>
                <div className="d-flex justify-content-between mt-3">
                  <Button>Save Filter</Button>
                  <Button themecolor="green">Apply Filter</Button>
                </div>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
      <Modal
        className="rm-padding medium"
        backdropClassName="country-city-modal"
        show={countriesCitiesModal}
        onHide={() => setCountriesCitiesModal(false)}
      >
        <div className="countries-cities-selector">
          <div className="header">Where would you like to work?</div>
          <div className="country-city-wrapper">
            <div className="country-list">
              {countryList.map((country, index) => (
                <div
                  key={index}
                  onClick={() => setActiveCountry(country)}
                  className={`country-list-item ${
                    activeCountry === country ? "active" : null
                  }`}
                >
                  <img
                    src={`https://purecatamphetamine.github.io/country-flag-icons/1x1/${country.code}.svg`}
                  />
                  <div className="country-name">{country.name}</div>
                </div>
              ))}
            </div>
            <div className="city-list">
              <div className="Select-all">
                <Checkbox></Checkbox>
                <div className="title">Select Cities</div>
              </div>
              {countryList.map((country) => (
                <div className="city-list-item">
                  <Checkbox></Checkbox>
                  <div className="city-name">city name</div>
                </div>
              ))}
            </div>
          </div>
          <div className="footer">
            <Button>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Candidates;

{
  /* <div classname="id"></div> */
}
