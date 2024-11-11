import React, { useState } from "react";
import { Slide } from "react-reveal";
import MediaPicker from "../../shared-ui/NewMediaPicker/NewMediaPicker";
import { Select, Col, Row, Form, Upload, Input } from "antd";
import { SuperSelect } from "../../shared-ui/SuperSelect/SuperSelect";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import SearchLocationInput from "../../app-ui/SearchLocationInput/SearchLocationInput";
import Button from "../../shared-ui/Button/Button";
import TagRender from "../../shared-ui/TagRender/TagRender";
import { Map } from "../../shared-ui/Map/Map";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as Rules from "../../utils/rules";
import PhoneInput from "react-phone-input-international";

import "./_Company.scss";
import "./_Responsive.scss";
import { getCountry, getCitiesByCountryWithParams } from "../auth/service";

const EditCompanyForm = React.memo((props) => {
  const {
    setCompanyLogoFile,
    setEditCompanyProfile,
    handleCompanyProfileEdit,
    editCompanyForm,
    EditCompanyProfile,
    getSector,
    checkLength,
    companyPhotos,
    removeImage,
    pictureListBeforeUpload,
    companyLocationAddress,
    setCompanyLocationAddress,
    selectPlace,
    companyProfile,
    companyLocation,
    setCompanyBannerFile,
    companyLogoAndBannerBeforeUpload,
    onRemove,
    categoryId,
    handleLocationSelect,
    setCategoryId,
    companyLogo,
    companyBanner,
  } = props;
  const { Option } = Select;
  const { Dragger } = Upload;
  const [errorFlag, setErrorFlag] = useState(false);

  const containsForbiddenCharacters = (text) => {
    let isDirty = false;
    // const forbiddenText = ["www", "http://", "https://", "@"];
    // forbiddenText.forEach((element) => {
    //   if (text.indexOf(element) > -1) isDirty = true;
    // });
    const pattern =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if (pattern.test(text)) return (isDirty = true);
  };

  return (
    <>
      <Slide right duration={350} when={EditCompanyProfile}>
        <div
          className={`edit-company-page ${
            EditCompanyProfile && "edit-company-page-show"
          }`}>
          <div className="header">
            <span
              className="back-btn"
              onClick={() => setEditCompanyProfile(false)}>
              <img
                className="back-icon"
                src={require("../../assets/images/icons/Back.svg")}
                alt=""
              />
            </span>
          </div>

          <div classname="id">
            {/* <div className="form-rows"> */}

            <Form
              onFinish={handleCompanyProfileEdit}
              form={editCompanyForm}
              layout="vertical"
              className="edit-company-form">
              <Row gutter={[32, 50]} className="mb-5">
                {/* <Col
                  xs={{ span: 24 }}
                  lg={{ span: 8 }}
                  md={{ span: 8 }}
                  span={8}>
                  <Form.Item label="Upload company logo" className="c-input">
                    <MediaPicker onPicked={setCompanyLogoFile} type="input" />
                  </Form.Item>
                </Col> */}
                <Col
                  className="upload-container"
                  span={8}
                  xs={24}
                  sm={24}
                  lg={8}>
                  <Form.Item
                    name="companyLogo"
                    label="Upload company logo"
                    className="c-input">
                    <Dragger
                      // name={"file"}
                      accept=".jpg, .jpeg, .png"
                      // multiple={multiple}
                      // fileList={fileList}
                      maxCount={1}
                      tooltipVisible={false}
                      onRemove={(file) => onRemove(file, "logo")}
                      beforeUpload={(file) =>
                        companyLogoAndBannerBeforeUpload(
                          file,
                          "logo",
                          ".upload-compnay-logo"
                        )
                      }
                      // onChange={(info) => {
                      //   const { status } = info.file;
                      //   if (status !== "uploading") {
                      //     console.log(info.file, info.fileList);
                      //   }
                      //   if (status === "done") {
                      //     message.success(`${info.file.name} file uploaded successfully.`);
                      //   } else if (status === "error") {
                      //     message.error(`${info.file.name} file upload failed.`);
                      //   }
                      // }}
                    >
                      <img
                        className="upload-compnay-logo"
                        src={`${companyProfile?.companyLogo}`}
                        alt="icon"
                      />
                      <p className="ant-upload-text">
                        <span>Upload your logo</span>{" "}
                        <span style={{ color: "#5271ff" }}>browse</span>
                      </p>
                      {/* <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                      </p> */}
                    </Dragger>
                  </Form.Item>
                </Col>
                <Col
                  className="upload-container"
                  span={16}
                  xs={24}
                  sm={24}
                  lg={16}>
                  <Form.Item label="Upload company banner" className="c-input">
                    <Dragger
                      // name={"file"}
                      accept=".jpg, .jpeg, .png"
                      // multiple={multiple}
                      // fileList={fileList}
                      tooltipVisible={false}
                      maxCount={1}
                      onRemove={(file) => onRemove(file, "banner")}
                      beforeUpload={(file) =>
                        companyLogoAndBannerBeforeUpload(
                          file,
                          "banner",
                          ".upload-compnay-banner"
                        )
                      }
                      // onChange={(info) => {
                      //   const { status } = info.file;
                      //   if (status !== "uploading") {
                      //     console.log(info.file, info.fileList);
                      //   }
                      //   if (status === "done") {
                      //     message.success(`${info.file.name} file uploaded successfully.`);
                      //   } else if (status === "error") {
                      //     message.error(`${info.file.name} file upload failed.`);
                      //   }
                      // }}
                    >
                      <img
                        className="upload-compnay-banner"
                        // src={require(`"../../assets/images/icons/imgupload-icon.svg"`)}
                        src={`${companyProfile?.companyBanner}`}
                        alt="icon"
                      />
                      <p className="ant-upload-text">
                        <span disabled>Upload your company banner </span>
                        <span style={{ color: "#5271ff" }}>browse</span>
                      </p>
                      {/* <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                     </p> */}
                    </Dragger>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[32, 32]}>
                {/* <Col lg={8} md={12} sm={24} className="antd-col">
                  <Form.Item
                    name="id"
                    label="Upload company logo"
                    className="c-input antd-picker">
                    <MediaPicker onPicked={setCompanyLogoFile} type="input" />
                  </Form.Item>
                </Col>
                <Col lg={8} md={12} sm={24} className="antd-col">
                  <Form.Item
                    name="id"
                    extra={"Recommended size 1430 x 436"}
                    label="Upload company banner"
                    className="c-input antd-picker">
                    <MediaPicker onPicked={setCompanyBannerFile} type="input" />
                  </Form.Item>
                </Col> */}
                {/* <Col
                xs={{ span: 24 }}
                lg={{ span: 8 }}
                md={{ span: 8 }}
                span={8}>
                <Form.Item
                  label=" Upload company photos"
                  className="c-input c-input-multiple">
                  <img
                    onClick={HandleImageUploader}
                    className="input-icon-right"
                    src={require("../../assets/images/icons/upload-icon.svg")}
                    alt=""
                  />
                  <Input
                    autoComplete={"" + Math.random()}
                    disabled
                    value={getCompanyPhotosText()}
                  />
                </Form.Item>
              </Col> */}

                <Col
                  style={{ zIndex: 200 }}
                  span={8}
                  lg={8}
                  md={12}
                  xs={24}
                  className="antd-col">
                  <Form.Item
                    name="companyType"
                    rules={Rules.requiredRule}
                    className="c-input"
                    label="Registered as">
                    <Select
                      // disabled={true}
                      getPopupContainer={(trigger) => trigger.parentNode}
                      defaultValue=""
                      allowClear="true">
                      {/* <Option value="">Select</Option> */}
                      <Option value="single-company">Single company</Option>
                      <Option value="headquarters">Headquarters</Option>
                      <Option value="branch">Branch within the company</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={8} md={12} sm={24} className="antd-col">
                  <Form.Item
                    rules={Rules.requiredRule}
                    label="Company name"
                    name="companyName"
                    className="c-input">
                    <Input autoComplete={"" + Math.random()} />
                  </Form.Item>
                </Col>
                <Col lg={8} md={12} sm={24} className="antd-col">
                  <Form.Item
                    name="companyPhone"
                    rules={Rules.phoneRule}
                    label="Company phone number"
                    className="c-input">
                    <PhoneInput />
                  </Form.Item>
                </Col>
                <Col
                  lg={8}
                  md={12}
                  sm={24}
                  className="antd-col"
                  style={{ zIndex: 190 }}>
                  <Form.Item
                    name="companySize"
                    rules={Rules.requiredRule}
                    label="Company Size">
                    <Select
                      className="scroll-to-smooth"
                      defaultValue=""
                      getPopupContainer={(trigger) => trigger.parentNode}
                      placeholder="Select"
                      allowClear="true">
                      <Option value="0-1 employees">0-1 employees</Option>
                      <Option value="2-10 employees">2-10 employees</Option>
                      <Option value="11-50 employees">11-50 employees</Option>
                      <Option value="51-200 employees">51-200 employees</Option>
                      <Option value="201-500 employees">
                        201-500 employees
                      </Option>
                      <Option value="501-1,000 employees">
                        501-1000 employees
                      </Option>
                      <Option value="1,001-5000 employees">
                        1001-5000 employees
                      </Option>
                      <Option value="5,001-10,000 employees">
                        5,001-10,000 employees
                      </Option>
                      <Option value="10,000+ employees">
                        10,000+ employees
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
                {/* ///////////////////////////////////////////// */}
                {/* <Col span={8} md={{ span: 12 }} sm={{ span: 24 }} lg={{ span: 8 }} xs={{ span: 24 }} style={{ zIndex: 330 }}>
                  <Form.Item
                    // rules={Rules.optional}
                    name="companyNameTypesId"
                    label={"Company Type"}>
                    <Select className="scroll-to-smooth" allowClear={true} getPopupContainer={(trigger) => trigger.parentNode} placeholder="Select">
                      {companyNameType?.map((d, i) => (
                        <Option key={i} value={d?.id}>
                          {d?.title}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col> */}
                {/* /////////////////////////////////////////////////////////////////// */}
                <Col
                  lg={8}
                  md={12}
                  sm={24}
                  className="antd-col"
                  style={{ zIndex: 180 }}>
                  <Form.Item
                    name="categoryId"
                    required
                    rules={Rules.requiredRule}
                    label="Company sector">
                    <SuperSelect
                      getPopupContainer={(trigger) => trigger.parentNode}
                      defaultValue=""
                      fetchOptions={getSector}
                    />
                  </Form.Item>
                </Col>
                <Col
                  style={{ zIndex: 170 }}
                  lg={8}
                  md={12}
                  sm={24}
                  className="antd-col">
                  <Form.Item
                    label="Country"
                    name="countryId"
                    className="c-input"
                    rules={Rules.requiredRule}>
                    <SuperSelect
                      getPopupContainer={(trigger) => trigger.parentNode}
                      fetchOptions={getCountry}
                      onChange={() => {
                        editCompanyForm.resetFields(["cityId"]);
                        // setCategoryId(false);
                      }}
                      onClear={() => {
                        editCompanyForm.resetFields(["cityId"]);
                        setCategoryId(false);
                      }}
                      onSelect={handleLocationSelect}
                    />
                  </Form.Item>
                </Col>

                <Col
                  style={{ zIndex: 160 }}
                  lg={8}
                  md={12}
                  sm={24}
                  className="antd-col">
                  <Form.Item
                    label="City"
                    name="cityId"
                    className="c-input"
                    rules={Rules.requiredRule}>
                    <SuperSelect
                      disabled={categoryId ? false : true}
                      dependencyId={categoryId}
                      getPopupContainer={(trigger) => trigger.parentNode}
                      fetchOptions={getCitiesByCountryWithParams}
                    />
                  </Form.Item>
                </Col>
                <Col lg={8} md={12} sm={24} className="antd-col">
                  <Form.Item
                    name="videoUrl"
                    label="Company video URL"
                    className="c-input">
                    <Input autoComplete={"off"} />
                  </Form.Item>
                </Col>
                <Col lg={8} md={24} sm={24} className="antd-col">
                  <Form.Item
                    rules={Rules.requiredRule}
                    label="Tag line"
                    name="tagLine"
                    extra={"Characters limit bound to 100"}
                    className="c-input ">
                    <Input
                      autoComplete={"off"}
                      placeholder="e.g The largest educational company in the Middle East"
                      maxLength={100}
                      onChange={(e) => checkLength(e, "tagLineLen")}
                    />
                  </Form.Item>
                </Col>
                <Col
                  lg={24}
                  md={24}
                  sm={24}
                  className="antd-col"
                  style={{ zIndex: 80 }}
                  className="antd-col">
                  <Form.Item
                    rules={Rules.requiredRule}
                    name="specialities"
                    label="Specialties"
                    extra={
                      "Press enter to create tags and maximum 5 tags are allowed"
                    }>
                    <Select
                      className="scroll-to-smooth"
                      getPopupContainer={(trigger) => trigger.parentNode}
                      tagRender={TagRender}
                      mode="tags"
                      maxTagCount="5"
                      open={false}
                      onChange={(e) => checkLength(e, "specialTag")}></Select>
                  </Form.Item>
                </Col>
                <Col lg={24} md={24} sm={24} className="antd-col">
                  <Form.Item
                    rules={Rules.requiredRule}
                    label="About Company"
                    name="introduction"
                    className="checking-ck"
                    valuePropName="data"
                    getValueFromEvent={(event, editor) => {
                      const data = editor.getData();
                      if (containsForbiddenCharacters(data)) setErrorFlag(true);
                      else if (errorFlag) setErrorFlag(false);
                      return data;
                    }}>
                    <CKEditor
                      id="content"
                      name="template"
                      editor={ClassicEditor}
                      config={{
                        toolbar: [
                          "bold",
                          "italic",
                          "numberedList",
                          "bulletedList",
                        ],
                      }}
                      onReady={(editor) => {}}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        // console.log({ event, editor, data });
                      }}
                    />
                  </Form.Item>
                  {errorFlag && (
                    <p className="text-error">
                      Please remove all website links, phone numbers from this
                      section or any other link which directs candidates outside
                      of Jobsmideast.com
                    </p>
                  )}
                </Col>

                {/* ----------- Upload company photo ---------- */}
                <div
                  className="upload-label"
                  style={{
                    fontSize: "14px",
                    marginTop: "12px",
                    padding: "0 12px",
                  }}>
                  Upload Company photo's{" "}
                  <p
                    className="mt-1"
                    style={{ fontSize: "10px", color: "rgba(0, 0, 0, 45%)" }}>
                    {" "}
                    Recommended size 1920 x 1080
                  </p>
                </div>
                <Col
                  lg={24}
                  md={24}
                  sm={24}
                  classname="id"
                  className="antd-col image-uploader-section">
                  {[0, 1, 2, 3, 4].map((el, i) => (
                    <div className="upload-wrapper">
                      {companyPhotos[i] ? (
                        <div className="avatar-upload">
                          <div className="photo-square">
                            {companyPhotos && (
                              <img src={companyPhotos[i]} alt="" />
                            )}
                            <CloseCircleOutlined
                              className="button"
                              onClick={() => removeImage(companyPhotos[i], i)}
                            />
                          </div>
                        </div>
                      ) : (
                        <Upload
                          accept=".jpg, .jpeg, .png"
                          multiple={false}
                          beforeUpload={pictureListBeforeUpload}
                          showUploadList={false}>
                          <div className="avatar-upload">
                            <div className="photo-square">
                              <PlusOutlined className="button" />
                            </div>
                          </div>
                        </Upload>
                      )}
                    </div>
                  ))}
                </Col>

                {/* <Col span={24} className="h-88 image-uploader-section">
                  <div className="w-100">
                    <ImageCropper
                      removeIMG={(arr) => setCompanyImages(arr)}
                      companyImages={companyImages}
                      removeImage={removeImage}
                      pictureListBeforeUpload={pictureListBeforeUpload}
                    />
                  </div>
                </Col> */}
                <Col span={24} className="antd-col">
                  <Form.Item
                    // rules={Rules.requiredRule} //this rule wont work on this because the location component is nested twice
                    label="Company full address *"
                    name="location"
                    className="c-input">
                    {/* <Input onChange={(e) => setSearchQuery(e.target.value)} /> */}

                    {/* <SuperSelect
                    getPopupContainer={(trigger) => trigger.parentNode}
                    defaultValue=""
                    fetchOptions={getPlaces}
                  /> */}
                    <SearchLocationInput
                      placeholder="Search"
                      companyLocationAddress={companyLocationAddress}
                      setCompanyLocationAddress={setCompanyLocationAddress}
                      onSelect={selectPlace}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} className="antd-col">
                  <Form.Item name="id" label="Map Area" className="c-input">
                    <div className="block-map">
                      <Map data={companyProfile} location={companyLocation} />
                    </div>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="id" className="c-input">
                    <Button
                      htmlType="submit"
                      className="ml-auto"
                      themecolor="outlined-green">
                      Update
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Slide>
    </>
  );
});

export default EditCompanyForm;
