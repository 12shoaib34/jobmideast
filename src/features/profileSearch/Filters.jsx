import React, { useState, useRef, useEffect } from "react";
import { Input, Select, Form, Slider, Divider, Row, Col } from "antd";
import Button from "../../shared-ui/Button/Button";
import { HiOutlineX } from "react-icons/hi";
import "query-string";
import * as rules from "../../utils/rules";

// import { SuperSelect } from "../../shared-ui/SuperSelect/SuperSelect";
import { SuperSelect } from "../../shared-ui/SuperSelect/SuperSelect";
import {
  getCategories,
  getCity,
  getJobTitle,
  getLanguages,
  getNationalities,
  // getProfiles,
} from "./service";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  selectFamilyStatus,
  selectMedicalCondition,
  selectStatus,
  selectNoticePeriod,
  selectVisaStatus,
  selectFilters,
  selectSaveFilter,
  selectLanguages,
  selectExcludeList,
  selectUpdateFilterById,
  selectFilterById,
  selectFilterByIdGetSuccess,
  selectFilterByIdGetSuccessIsLoading,
  selectProfilesLoading,
  // selectProfile,
} from "./slice";

import {
  getFamilyStatus,
  // getNationality,
  getMedicalCondition,
  getNoticePeriod,
  getVisaStatus,
  getFilters,
  saveFilter,
  getExcludeList,
  getProfiles,
  getFilterById,
  updateFilterById,
  // getLanguage,
} from "./thunk";

// import { getProfiles } from "./service.js";
// import { jsonToQueryString } from "../../utils/helper";
// import { getFamilyStatus, getMedicalCondition } from "./thunk";
const Option = Select;

const initOptions = [
  {
    label: "Select",
    value: "",
  },
];

const Filters = (props) => {
  const dispatch = useAppDispatch();
  const [filterForm] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [buttonCalled, setButtonCalled] = useState("save");
  const familyStatus = useAppSelector(selectFamilyStatus);
  // const profiles = useAppSelector(selectProfile);
  const excludeLists = useAppSelector(selectExcludeList);
  const saveFilterSuccess = useAppSelector(selectSaveFilter);
  const selectedFilter = useAppSelector(selectFilterById);
  const filters = useAppSelector(selectFilters);
  // const nationality = useAppSelector(selectNationality);
  const medicalCondition = useAppSelector(selectMedicalCondition);
  const visaStatus = useAppSelector(selectVisaStatus);
  const noticePeriod = useAppSelector(selectNoticePeriod);
  const isLoading = useAppSelector(selectStatus);
  const filterByIdGetSuccess = useAppSelector(selectFilterByIdGetSuccess);
  const filterByIdGetSuccessIsLoading = useAppSelector(selectFilterByIdGetSuccessIsLoading);
  const updateFilterByIdSuccess = useAppSelector(selectUpdateFilterById);
  const profilesLoading = useAppSelector(selectProfilesLoading);

  const [selectedSector, setSelectedSector] = useState(true);
  const [selectedSectorId, setSelectedSectorId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [selectFilter, setSelectFilter] = useState(null);
  const [data, setData] = useState(null);
  const { handlefilter, getRef } = props;
  const queryString = require("query-string");
  const pagination = { page: 1, limit: 10 };

  useEffect(() => {
    if (filterByIdGetSuccess) {
      setCategoryId(selectedFilter?.categoriesId);
      if (selectedFilter?.categoriesId) {
        setSelectedSector(false);
      }
      const _selectedFilter = Object.fromEntries(Object.entries(selectedFilter).filter(([_, v]) => v != null));
      const nativeLanguageId = selectedFilter?.nativeLanguageId?.map((i) => Number(i));
      const otherLanguagesId = selectedFilter?.otherLanguagesId?.map((i) => Number(i));
      const desiredLocationsId = selectedFilter?.desiredLocationsId?.map((i) => Number(i));
      const noticePeriodId = selectedFilter?.noticePeriodId?.map((i) => Number(i));
      const currentLocationsId = selectedFilter?.currentLocationsId?.map((i) => Number(i));
      const exprience = selectedFilter?.exprience?.map((i) => Number(i));
      const familyStatusId = selectedFilter?.familyStatusId?.map((i) => Number(i));
      const age = selectedFilter?.age?.map((i) => Number(i));
      const excludeId = selectedFilter?.excludeId?.map((i) => Number(i));
      const medicalConditions =
        selectedFilter?.medicalConditions === "Yes" ? "Yes" : selectedFilter?.medicalConditions === "No" ? "No" : "Others";

      setData({
        ..._selectedFilter,
        age,
        excludeId,
        familyStatusId,
        nativeLanguageId,
        currentLocationsId,
        otherLanguagesId,
        noticePeriodId,
        exprience,
        familyStatusId,
        medicalConditions,
        desiredLocationsId,
      });
    } else {
      filterForm.resetFields();
    }
  }, [filterByIdGetSuccess]);

  useEffect(() => {
    if (data) {
      filterForm.setFieldsValue(data);
    } else {
      setData(null);
    }
  }, [data]);
  const handleSearchFilter = (v) => {
    setSelectFilter("some filter is selected in search");
    dispatch(getFilterById(v));
  };

  useEffect(() => {
    if (updateFilterByIdSuccess) {
      const id = searchForm.getFieldValue("filter");
      dispatch(getFilterById(id));
    }
  }, [updateFilterByIdSuccess]);

  useEffect(() => {
    dispatch(getFamilyStatus());
    dispatch(getExcludeList());
    dispatch(getMedicalCondition());
    dispatch(getNoticePeriod());
    dispatch(getVisaStatus());
    dispatch(getFilters());
  }, []);

  const handleApplyFilter = (v) => {
    const payload = v;
    payload.page = 1;
    payload.limit = 20;
    const qs = queryString.stringify(payload);
    dispatch(getProfiles(qs));
  };

  const handleSavedAndApplyFilter = (v) => {
    if (selectFilter) {
      const payload = v;
      const id = selectedFilter.id;
      dispatch(updateFilterById({ id, payload }));
      const qs = queryString.stringify(payload);
      const qswithpagination = queryString.stringify(pagination);
      const query = `${qs}&${qswithpagination}`;
      filterForm.resetFields();
      dispatch(getProfiles(query));
    } else {
      const payload = v;
      dispatch(saveFilter({ payload }));
      const qs = queryString.stringify(payload);
      const qswithpagination = queryString.stringify(pagination);
      const query = `${qs}&${qswithpagination}`;
      filterForm.resetFields();
      dispatch(getProfiles(query));
    }
  };

  return (
    <div className="filter-body">
      <Form form={searchForm} layout="vertical" className="filter-header">
        {/* <div onClick={handlefilter} className="filter-back-btn">
          <img onClick={handlefilter} src={require("../../assets/images/icons/back-button-black.svg").default} alt="" />
        </div> */}
        <div onClick={handlefilter} className="hide-filter-section">
          <HiOutlineX size={"24px"} />
        </div>
        <span className="saved-filter">
          <Form.Item name="filter" style={{ zIndex: 400 }} label="Saved filters" className="select-w100 pb-2">
            <Select
              className="scroll-to-smooth"
              getPopupContainer={(trigger) => trigger.parentNode}
              placeholder="Search job"
              onChange={null}
              allowClear="true"
              onSelect={handleSearchFilter}
              onClear={() => {
                filterForm.resetFields();
              }}
            >
              {/* <Option value="">Select</Option> */}
              {filters.map((value, key) => {
                return (
                  <>
                    <Option key={key} value={value?.id}>
                      {value?.title}
                    </Option>
                  </>
                );
              })}
            </Select>
          </Form.Item>
        </span>
        <div className="search-filters">
          <span>
            <img src={require("../../assets/images/icons/filter_icon.svg")} alt="" /> Filters
          </span>
          <Button onClick={filterForm.submit} themecolor="outlined-green">
            Search
          </Button>
        </div>
      </Form>

      <div className="filter-wrapper">
        <Form
          form={filterForm}
          layout="vertical"
          id="filterModalForm"
          onFinish={buttonCalled == "save" ? handleApplyFilter : handleSavedAndApplyFilter}
        >
          <Row>
            <Col style={{ zIndex: 290 }} span={24}>
              <Form.Item name="categoriesId" label="Category">
                <SuperSelect
                  onSelect={(v) => {
                    setSelectedSector(false);
                    setCategoryId(v);
                  }}
                  style={{ zIndex: 500 }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  fetchOptions={getCategories}
                />
              </Form.Item>
            </Col>
            <Col style={{ zIndex: 280 }} span={24}>
              <Form.Item name="jobTitleId" label="Sub-category">
                <SuperSelect
                  disabled={selectedSector}
                  dependencyId={categoryId}
                  style={{ zIndex: 500 }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  fetchOptions={getJobTitle}
                />
              </Form.Item>
            </Col>
            <Col style={{ zIndex: 270 }} span={24}>
              <Form.Item name="currentLocationsId" label="Current location">
                <SuperSelect
                  getPopupContainer={(trigger) => trigger.parentNode}
                  fetchOptions={getCity}
                  mode="multiple"
                  maxTagCount="responsive"
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="tags-section my-3">{/* <span className="tags">Dubai</span> */}</div>
          <Form.Item label="Candidates desired work location" name="desiredLocationsId" className="c-input" style={{ zIndex: 269 }}>
            <SuperSelect
              getPopupContainer={(trigger) => trigger.parentNode}
              fetchOptions={getCity}
              mode="multiple"
              maxTagCount="responsive"
            />
          </Form.Item>
          <div className="tags-section my-3">{/* <span className="tags">Dubai</span> */}</div>
          <Row style={{ zIndex: 230 }}>
            <Col style={{ zIndex: 240 }} span={24}>
              <Form.Item name="gender" label="Gender" allowClear="true" className="select-w100 pb-2">
                <Select getPopupContainer={(trigger) => trigger.parentNode} placeholder="Select">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="both">Both</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ zIndex: 220 }}>
            <Col style={{ zIndex: 230 }} span={24}>
              <Form.Item name="familyStatusId" label="Family status" className="select-w100 pb-2" allowClear="true">
                <Select
                  className="scroll-to-smooth"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                  onChange={null}
                >
                  {/* <Option value="">Select</Option> */}
                  {familyStatus.map((value, key) => {
                    return (
                      <>
                        <Option key={key} value={value?.id}>
                          {value?.title}
                        </Option>
                      </>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="age" label="Age" className="c-range-bar pb-2 w-100">
            <Slider className="ant-slider-w100" range min={16} defaultValue={[20, 50]} />
          </Form.Item>
          <Form.Item name="exprience" label="Minimum years of experience" className="c-range-bar pb-2 w-100">
            <Slider className="ant-slider-w100" defaultValue={0} />
          </Form.Item>

          {/* wwwwww */}

          <Row style={{ zIndex: 210 }}>
            <Col style={{ zIndex: 200 }} span={24}>
              <Form.Item name="nationalityId" label="Passport nationality" className="select-w100 pb-2">
                <SuperSelect getPopupContainer={(trigger) => trigger.parentNode} fetchOptions={getNationalities} />
              </Form.Item>
            </Col>
          </Row>

          {/* wwwwww */}
          <Form.Item label="Min monthly salary AED" name="minSalary" className="c-input pb-2">
            <Input autoComplete={"" + Math.random()} placeholder="10,000" className="ant-input-w100" type="number"></Input>
          </Form.Item>
          <Row style={{ zIndex: "200" }}>
            <Col span={24} style={{ zIndex: "190" }}>
              <Form.Item name="noticePeriodId" label="Notice period" className="select-w100 pb-2">
                <Select
                  className="scroll-to-smooth"
                  allowClear="true"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                  onChange={null}
                >
                  {/* <Option value="">Select</Option> */}
                  {noticePeriod.map((value, key) => {
                    return (
                      <>
                        <Option key={key} value={value?.id}>
                          {value?.title}
                        </Option>
                      </>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ zIndex: 170 }}>
            <Col span={24} style={{ zIndex: 120 }}>
              <Form.Item name="nativeLanguageId" label="Native language" className="select-w100 pb-2">
                <SuperSelect
                  getPopupContainer={(trigger) => trigger.parentNode}
                  fetchOptions={getLanguages}
                  mode="multiple"
                  maxTagCount="responsive"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ zIndex: 90 }}>
            <Col span={24} style={{ zIndex: 100 }}>
              <Form.Item name="otherLanguagesId" label="Other language" className="select-w100 pb-2">
                <SuperSelect
                  getPopupContainer={(trigger) => trigger.parentNode}
                  fetchOptions={getLanguages}
                  mode="multiple"
                  maxTagCount="responsive"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ zIndex: 80 }}>
            <Col span={24} style={{ zIndex: 70 }}>
              <Form.Item name="medicalConditions" label=" Medical conditions" allowClear="true" className="select-w100 pb-2">
                <Select
                  className="scroll-to-smooth"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                  onChange={null}
                >
                  {/* <Option value="">Select</Option> */}
                  {medicalCondition.map((value, key) => {
                    return (
                      <>
                        <Option key={key} value={value?.title}>
                          {value?.title}
                        </Option>
                      </>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ zIndex: 70 }}>
            <Col span={24} style={{ zIndex: 60 }}>
              <Form.Item name="drivingLicense" label="Driving license" allowClear="true" className="select-w100 pb-2">
                <Select getPopupContainer={(trigger) => trigger.parentNode} placeholder="Select" onChange={null}>
                  {/* <Option value="">Select</Option> */}
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ zIndex: 60 }}>
            <Col span={24} style={{ zIndex: 50 }}>
              <Form.Item name="visaStatusId" allowClear="true" label="Visa status" className="select-w100 pb-2">
                <Select
                  className="scroll-to-smooth"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                  onChange={null}
                >
                  {/* <Option value="">Select</Option> */}
                  {visaStatus.map((value, key) => {
                    return (
                      <>
                        <Option key={key} value={value?.id}>
                          {value?.title}
                        </Option>
                      </>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ zIndex: 50 }}>
            <Col span={24} style={{ zIndex: 40 }}>
              <Form.Item name="isClearPoliceCertificaete" label="Clear police certificate ?" allowClear="true" className="select-w100 pb-2">
                <Select getPopupContainer={(trigger) => trigger.parentNode} placeholder="Select" onChange={null}>
                  {/* <Option value="">Select</Option> */}
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <hr />
          <Row style={{ zIndex: 48 }}>
            <Col span={24} style={{ zIndex: 35 }}>
              <Form.Item name="excludeId" label="Exclude" allowClear="true" className="select-w100 pb-2">
                <Select
                  className="scroll-to-smooth"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                  onChange={null}
                >
                  {/* <Option value="">Select</Option> */}
                  {excludeLists.map((value, key) => {
                    return (
                      <>
                        <Option key={key} value={value?.id}>
                          {value?.title}
                        </Option>
                      </>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <hr />
          <Row style={{ zIndex: 35 }}>
            <Col span={24} style={{ zIndex: 30 }}>
              <Form.Item rules={rules.requiredRule} label="Save Filter" name="title" className="c-input">
                <Input
                  // autoComplete={'' + Math.random()}
                  autoComplete="off"
                  placeholder="Filter name"
                  className="ant-input-w100"
                  type="text"
                ></Input>
              </Form.Item>
            </Col>
          </Row>

          <div className="button-row">
            <Button
              loading={filterByIdGetSuccessIsLoading || profilesLoading}
              onClick={() => setButtonCalled("save & apply")}
              htmlType="submit"
              themecolor="outlined-green"
            >
              Save &amp; apply filter
            </Button>
            <span>or</span>
            <Button loading={profilesLoading} htmlType="submit" onClick={() => setButtonCalled("save")} themecolor="outlined-green">
              Apply filter
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Filters;
