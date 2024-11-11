import {
  Divider,
  ConfigProvider,
  Input,
  Select,
  Slider,
  Checkbox,
  Form,
  Row,
  Col,
} from "antd";
import React, { useState, useEffect } from "react";
import Modal from "../../shared-ui/Modal/Modal";
import Button from "../../shared-ui/Button/Button";
import "./FilterModal.scss";
import { getData } from "country-list";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CountriesCityModal from "../CountriesCityModal/CountriesCityModal";
import {
  selectCities,
  selectCountries,
  selectFamilyStatus,
  selectNoticePeriod,
  selectMedicalCondition,
  selectVisaStatus,
  selectCitiesByCountry,
} from "../../features/auth/slice";
import {
  getCity,
  getCityByCountryId,
  getLanguage,
  getNationality,
} from "./service";
import { SuperSelect } from "../../shared-ui/SuperSelect/SuperSelect";
import { postFilter, getFilters, getFilterById, updateFilter } from "./thunk";
import {
  selectFilters,
  postFilterSuccess,
  selectFilterById,
  selectUpdatedFilterSuccessfully,
  selectStatus,
  emptyFilterById,
} from "./slice";
import * as Rules from "../../utils/rules";
import { findIdByTitle, getTitleById } from "../../utils/helper";
import { useLocation } from "react-router-dom";
import { showSuccessMessage, showWarningMessage } from "../../utils/message";
import { getCitiesByCountries } from "../../features/auth/thunk";
import { getCategories, getJobTitle } from "./service";
import TagRender from "../../shared-ui/TagRender/TagRender";
import { ReloadOutlined } from "@ant-design/icons";
import { getCountry } from "../../features/auth/service";

const { Option } = Select;
const FilterModal = ({
  filterModalShow,
  setFilterModalShow,
  setFilteredObject,
  setSaveFilterObject,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const familyStatus = useAppSelector(selectFamilyStatus);
  const noticePeriod = useAppSelector(selectNoticePeriod);
  const medicalCondition = useAppSelector(selectMedicalCondition);
  const visaStatus = useAppSelector(selectVisaStatus);
  const filters = useAppSelector(selectFilters);
  const postedSuccess = useAppSelector(postFilterSuccess);
  const filterById = useAppSelector(selectFilterById);
  const cities = useAppSelector(selectCitiesByCountry);
  const filterUpdateSuccess = useAppSelector(selectUpdatedFilterSuccessfully);
  const isLoading = useAppSelector(selectStatus);

  const [countriesCitiesModal, setCountriesCitiesModal] = useState(false);
  const [countryId, setCountryId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [selectedCitiesIds, setSelectedCitiesIds] = useState([]);
  const [selectedCountryIds, setSelectedCountryIds] = useState([]);
  const [buttonCalled, setButtonCalled] = useState("save");
  const [categoryId, setCategoryId] = useState(null);
  const [selectedSector, setSelectedSector] = useState(true);
  const [filterId, setFilterId] = useState(null);
  const [ageLimit, setAgeLimit] = useState(null);
  const [experience, setExperience] = useState(0);
  const customizeRenderEmpty = () => (
    <div style={{ textAlign: "center" }}>
      {/* <SmileOutlined style={{ fontSize: 20 }} /> */}
      <p>No saved filters</p>
    </div>
  );

  useEffect(() => {
    if (filterById) {
      dispatch(getFilters());
      // dispatch(getFilterById());
    }
  }, [filterById]);

  useEffect(() => {
    dispatch(getFilters());
    if (postedSuccess) {
      showSuccessMessage("Posted Successfully");
    }
    if (filterById) {
      console.log("filterById:", filterById);
      let noticePeriodId = filterById.noticePeriodId?.map((id) => parseInt(id));
      let otherLanguagesId = filterById.otherLanguagesId?.map((id) =>
        parseInt(id)
      );
      let currentLocationsId = filterById.currentLocationsId?.map((id) =>
        parseInt(id)
      );
      const currentCountriesId = filterById.currentCountriesId?.map((x) =>
        parseInt(x)
      );
      let familyStatusId = filterById?.familyStatusId?.map((id) =>
        parseInt(id)
      );
      form.setFieldsValue({
        ...filterById,
        noticePeriodId,
        otherLanguagesId,
        currentLocationsId,
        currentCountriesId,
        familyStatusId,
      });

      if (filterById?.desiredLocations?.length) {
        const countryIds = [];
        for (const desiredLocation of filterById.desiredLocations) {
          if (countryIds.indexOf(desiredLocation.countryId) === -1) {
            countryIds.push(desiredLocation.countryId);
          }
        }
        setSelectedCountryIds(countryIds);

        setSelectedCitiesIds(filterById.desiredLocationsId);
        dispatch(getCitiesByCountries(countryIds));
      }
    }
  }, [postedSuccess, filterById]);

  useEffect(() => {
    if (filterUpdateSuccess) {
      showSuccessMessage("Filter Updated Successfully");

      dispatch(getFilters());
    }
    if (postedSuccess) {
      // alert("Filter save successfully");
      dispatch(getFilters());
    }
  }, [filterUpdateSuccess, postedSuccess]);

  const handleApplyFilter = (v) => {
    if (!v) {
      setFilteredObject({});
      return null;
    }
    setFilteredObject(v);
  };

  const handleSaveFilter = (v) => {
    console.log(v);
    if (!v.title) {
      showWarningMessage("Filter name is required");
      return null;
    }

    const _desiredLocationsId = form.getFieldValue("desiredLocationsId");
    const desiredLocationsId = [];
    if (_desiredLocationsId) {
      for (const id of _desiredLocationsId) {
        if (desiredLocationsId.indexOf(Number(id)) === -1) {
          desiredLocationsId.push(Number(id));
        }
      }
    }
    // console.log(desiredLocationsId);
    const payload = { ...v, desiredLocationsId };

    console.log("....", filterById);
    if (filterById) {
      dispatch(updateFilter({ id: filterId, payload }));
      setSaveFilterObject(payload);
      return null;
    }

    setSaveFilterObject(payload);

    dispatch(postFilter({ payload }));
  };

  const handleResetFilter = () => {
    form.resetFields();
    setFilterId(null);
    setExperience(0);
    setSelectedCitiesIds([]);
    dispatch(getFilters());
    dispatch(emptyFilterById());
    setButtonCalled("reset&apply");
    handleApplyFilter();
  };

  const setFilterValues = (e) => {
    setFilterId(e);
    dispatch(getFilterById(e));
  };

  const getCitiesTitle = () => {
    const desiredLocationsId = form.getFieldValue("desiredLocationsId");
    if (desiredLocationsId?.length) {
      const desiredLocationNames = desiredLocationsId.map((item) =>
        getTitleById(cities, Number(item))
      );
      return desiredLocationNames;
    }
    return "";
  };

  const getCitiesCount = () => {
    const desiredLocationsId = form.getFieldValue("desiredLocationsId");
    return desiredLocationsId?.length ? desiredLocationsId?.length : 0;
  };

  const saveCountryCitiesModal = (_selectedCitiesIds) => {
    form.setFieldsValue({
      desiredLocationsId: _selectedCitiesIds,
    });
    setSelectedCitiesIds(_selectedCitiesIds);
    setCountriesCitiesModal(false);
  };
  const location = useLocation().pathname;

  useEffect(() => {
    dispatch(getFilters());
  }, []);

  return (
    <Modal
      className="center filter-modal-parent"
      show={filterModalShow}
      onHide={() => setFilterModalShow(false)}
    >
      <div className="filter-modal">
        <div className="filter-modal-header">
          <div className="title">
            <span className="sub-title">Filters</span>
            <Col>
              <Button
                loading={isLoading}
                htmlType="button"
                onClick={() => {
                  handleResetFilter();
                }}
                themecolor="outlined-red"
              >
                <ReloadOutlined />
                Reset
              </Button>
            </Col>
          </div>
          <Row
            gutter={[32, 16]}
            style={{ minWidth: "200px", width: "100%" }}
            wrap
            justify="end"
          >
            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              xl={{ span: 12 }}
              md={{ span: 6 }}
              style={{ zIndex: 610 }}
            >
              <ConfigProvider renderEmpty={customizeRenderEmpty}>
                <Form.Item name="id">
                  <Select
                    className="scroll-to-smooth"
                    getPopupContainer={(trigger) => trigger.parentNode}
                    placeholder="Saved filters"
                    onSelect={setFilterValues}
                  >
                    {filters?.map((flt, index) => (
                      <Option key={index} value={flt?.id}>
                        {flt?.title}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </ConfigProvider>
            </Col>
          </Row>
        </div>
        <Divider />
        <Form
          getContainer={false}
          form={form}
          layout="vertical"
          id="chatFilterModal"
          onFinish={
            buttonCalled === "save"
              ? handleSaveFilter
              : buttonCalled === "save&apply"
              ? handleApplyFilter
              : buttonCalled === "reset&apply"
              ? handleResetFilter
              : ""
          }
        >
          <Row wrap gutter={[32, 16]}>
            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              style={{ zIndex: 600 }}
            >
              <Form.Item name="familyStatusId" label="Family status">
                <Select
                  mode="multiple"
                  maxTagCount="responsive"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                  onChange={null}
                  tagRender={TagRender}
                >
                  {familyStatus?.map((status, index) => (
                    <Option key={index} value={status?.id}>
                      {status?.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              style={{ zIndex: 590 }}
            >
              <Form.Item name="gender" label=" Gender">
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                  onChange={null}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="prefer-not-to-say">Prefer not to say</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              xl={{ span: 8 }}
              md={{ span: 12 }}
              style={{ zIndex: 580 }}
            >
              <Form.Item
                name="age"
                label={
                  <span
                    className="age-limit-label"
                    style={{ position: "relative" }}
                  >
                    <div>Age limit </div>
                    <div style={{ fontSize: "10px" }}>
                      {" "}
                      {ageLimit ? ageLimit[0] : "-"} to &nbsp;
                      {ageLimit ? ageLimit[1] : "-"}
                    </div>
                  </span>
                }
                className="c-range-bar"
              >
                <Slider
                  onAfterChange={(v) => setAgeLimit(v)}
                  getTooltipPopupContainer={(triggerNode) =>
                    triggerNode.parentNode
                  }
                  range
                  defaultValue={[16, 30]}
                  min={16}
                />
              </Form.Item>
            </Col>

            <Col
              className="gutter-row"
              span={8}
              md={{ span: 12 }}
              xs={{ span: 24 }}
              xl={{ span: 8 }}
              style={{ zIndex: 570 }}
            >
              <Form.Item name="nationalityId" label="Passport Nationality">
                <SuperSelect
                  getPopupContainer={(trigger) => trigger.parentNode}
                  fetchOptions={getNationality}
                />
              </Form.Item>
            </Col>
            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              style={{ zIndex: 560 }}
            >
              <Form.Item
                rules={Rules.salaryRule}
                label="Min monthly salary AED"
                name="minSalary"
                className="c-input pb-2"
              >
                <Input
                  // min="0"
                  placeholder="10,000"
                  className="ant-input-w100"
                  type="number"
                  autoComplete={"" + Math.random()}
                ></Input>
              </Form.Item>
            </Col>
            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              style={{ zIndex: 550 }}
            >
              <Form.Item name="noticePeriodId" label="Notice period">
                <Select
                  className="scroll-to-smooth"
                  mode="multiple"
                  maxTagCount="responsive"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                  onChange={null}
                  tagRender={TagRender}
                >
                  {noticePeriod?.map((notice, index) => (
                    <Option key={index} value={notice?.id}>
                      {notice?.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              style={{ zIndex: 540 }}
            >
              <Form.Item name="visaStatusId" label="Visa Status">
                <Select
                  className="scroll-to-smooth"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                  onChange={null}
                  listHeight={128}
                >
                  {visaStatus?.map((visa, index) => (
                    <Option key={index} value={visa?.id}>
                      {visa?.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              style={{ zIndex: 530 }}
            >
              <Form.Item name="nativeLanguageId" label="Native language">
                <SuperSelect
                  placeholder="Select Native Lanugage"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  fetchOptions={getLanguage}
                />
              </Form.Item>
            </Col>
            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              style={{ zIndex: 520 }}
            >
              <Form.Item name="otherLanguagesId" label="Other languages">
                <SuperSelect
                  maxTagCount="responsive"
                  mode="multiple"
                  style={{ zIndex: 500, width: "100%" }}
                  placeholder="Select Other Lanugages"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  fetchOptions={getLanguage}
                  tagRender={TagRender}
                />
              </Form.Item>
            </Col>
            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              style={{ zIndex: 510 }}
            >
              <Form.Item name="drivingLicense" label="Driving license">
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                  onChange={null}
                >
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
            </Col>
            {/* <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              style={{ zIndex: 500 }}>
              <Form.Item name="visaStatusId" label="Visa Status">
                <Select
                  className="scroll-to-smooth"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                  onChange={null}
                  listHeight={128}>
                  {visaStatus?.map((visa, index) => (
                    <Option key={index} value={visa?.id}>
                      {visa?.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col> */}
            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              style={{ zIndex: 500 }}
            >
              <Form.Item
                name="isClearPoliceCertificaete"
                label="Clear police certificate?"
              >
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                  onChange={null}
                >
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
            </Col>
            {/* <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              style={{ zIndex: 490 }}>
              <Form.Item name="currentLocationsId" label="Current Location">
                <SuperSelect
                  //  style={{ zIndex: 500 }}
                  maxTagCount="responsive"
                  mode="multiple"
                  maxTagCount="responsive"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  fetchOptions={getCity}
                  listHeight={128}
                />
              </Form.Item>
            </Col> */}
            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
            >
              <Form.Item
                name="desiredLocationsId"
                label="Desired locations to work in"
                className="c-input c-input-with-icon"
              >
                <img
                  className="input-icon"
                  src={require("../../assets/images/icons/country-select-icon.svg")}
                  alt=""
                />
                <Input
                  autoComplete={"" + Math.random()}
                  onClick={() => setCountriesCitiesModal(true)}
                  placeholder="Select countries and cities"
                  className="ant-input-lg w-100"
                  value={`${getCitiesCount()} selected`}
                  // value={getCitiesTitle()}
                />
              </Form.Item>
            </Col>

            {/* -------------------------------------------------------------------
-------------------------------------------------------------------*/}

            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              style={{ zIndex: 490 }}
            >
              <Form.Item
                label="Job sector"
                name="categoriesId"
                // className="c-input c-form p-0"
                rules={null}
              >
                <SuperSelect
                  listHeight={128}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  fetchOptions={getNationality}
                  // defaultValue="Select Category"
                  placeholder="Select Category"
                  onClear={() => {
                    form.resetFields(["jobTitleId"]);
                    setSelectedSector(true);
                  }}
                  onSelect={(v) => {
                    form.resetFields(["jobTitleId"]);
                    setSelectedSector(false);
                    setCategoryId(v);
                  }}
                  // style={{ zIndex: 500 }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  fetchOptions={getCategories}
                />
              </Form.Item>
            </Col>
            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              style={{ zIndex: 480 }}
            >
              {/* {console.log("categoryId: ", categoryId)} */}
              <Form.Item
                label="Job title (you can choose multiple)"
                name="jobTitleId"
                // className="c-input c-form p-0"
                rules={null}
              >
                <SuperSelect
                  mode="multiple"
                  maxTagCount="responsive"
                  listHeight={128}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  // defaultValue="Select Job Title"
                  disabled={selectedSector}
                  placeholder="Select Category"
                  dependencyId={categoryId}
                  fetchOptions={getJobTitle}
                  tagRender={TagRender}
                />
              </Form.Item>
            </Col>

            {/* -------------------------------------------------------------------
-------------------------------------------------------------------*/}

            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
            >
              <Form.Item
                name="exprience"
                label={
                  <span
                    className="age-limit-label"
                    style={{ position: "relative" }}
                  >
                    <div>Minimum years of experience</div>
                    <div className="center" style={{ fontSize: "12px" }}>
                      {" "}
                      {experience}
                    </div>
                  </span>
                }
                className="c-range-bar"
              >
                <Slider
                  getTooltipPopupContainer={(trigger) => trigger.parentNode}
                  onChange={(value) => setExperience(value)}
                  // range
                  // defaultValue={[0, 20]}
                  defaultValue={0}
                  max={20}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
            >
              <Form.Item name="countryId" label="Candidate Country">
                <SuperSelect
                  className="super-select-tag-render"
                  maxTagCount="responsive"
                  maxTagCount="responsive"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  fetchOptions={getCountry}
                  listHeight={128}
                  tagRender={TagRender}
                  onSelect={(c) => {
                    setCountryId(c);
                  }}
                />
              </Form.Item>
            </Col>
            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
              style={{ zIndex: 470 }}
            >
              <Form.Item
                name="currentLocationsId"
                label="Candidate Location (you can choose multiple)"
              >
                <SuperSelect
                  disabled={countryId === null}
                  dependencyId={countryId}
                  className="super-select-tag-render"
                  maxTagCount="responsive"
                  maxTagCount="responsive"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  keys={["id", "title"]}
                  fetchOptions={getCityByCountryId}
                  listHeight={128}
                  tagRender={TagRender}
                  onSelect={(c) => {
                    setCityId(c);
                  }}
                />
              </Form.Item>
            </Col>
            {/* <Row className="filter-name-row" justify="center"> */}
            <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}
            >
              <Form.Item name="title" label="Filter name" className="c-input">
                <Input
                  placeholder="Enter filter name here"
                  autoComplete={"off"}
                />
              </Form.Item>
            </Col>
            {/* </Row> */}
            {/* <Col
              className="gutter-row"
              span={8}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              xl={{ span: 8 }}>
              <Form.Item
                name="desiredLocationsId"
                label="Desired locations to work in"
                className="c-input c-input-with-icon">
                <img
                  className="input-icon"
                  src={require("../../assets/images/icons/country-select-icon.svg")}
                  alt=""
                />
                <Input
                  autoComplete={"" + Math.random()}
                  onClick={() => setCountriesCitiesModal(true)}
                  placeholder="Select countries and cities"
                  className="ant-input-lg"
                  value={getCitiesTitle()}></Input>
              </Form.Item>
            </Col> */}
          </Row>

          {/* <Row className="filter-name-row" justify="center">
            <Col span={12} lg={{ span: 14 }} xs={{ span: 24 }}>
              <Form.Item name="title" label="Filter name" className="c-input">
                <Input
                  placeholder="Enter filter name here"
                  autoComplete={"off"}
                />
              </Form.Item>
            </Col>
          </Row> */}

          <Row
            justify="end"
            wrap
            gutter={[32, 32]}
            className="row-reverse actions-container"
          >
            <Col
              span={16}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 16 }}
            >
              <Row gutter={[32, 32]} justify="end">
                <Col>
                  <Button
                    loading={isLoading}
                    htmlType="submit"
                    onClick={() => setButtonCalled("save")}
                    themecolor="outlined-green"
                    // style={{ border: "1px solid #59d424" }}
                  >
                    {filterId ? "Update" : "Save"}
                  </Button>
                </Col>
                {/* <p className="mt-1">or</p> */}
                <Col>
                  <Button
                    loading={isLoading}
                    htmlType="submit"
                    onClick={() => setButtonCalled("save&apply")}
                    themecolor="outlined"
                  >
                    Apply
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
      <Modal
        backdropClassName="country-city-modal-backdrop"
        className="country-city-modal-parent center lg"
        show={countriesCitiesModal}
        onHide={() => setCountriesCitiesModal(false)}
      >
        <CountriesCityModal
          setSelectedCitiesIds={setSelectedCitiesIds}
          countriesCitiesModal={countriesCitiesModal}
          setCountriesCitiesModal={saveCountryCitiesModal}
          setSelectedCountryIds={setSelectedCountryIds}
          selectedCountryIds={selectedCountryIds}
          selectedCitiesIds={selectedCitiesIds}
        />
      </Modal>
    </Modal>
  );
};

export default FilterModal;
