import { Divider, Form, Input, Upload, Select, Dropdown, Menu, Row, Col } from "antd";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Modal from "../../shared-ui/Modal/Modal";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";

import Button from "../../shared-ui/Button/Button";
import { showSuccessMessage, showWarningMessage } from "../../utils/message";

import "./_ApplyToJobModal.scss";
import "./_Responsive.scss";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const { Dragger } = Upload;
const { TextArea } = Input;

const ApplyToJobModal = ({ applyToJobModal, setApplyToJobModal }) => {
  const [feePercentage, setFeePercentage] = useState(2);
  const [applyModalSubmit, setapplyModalSubmit] = useState(false);
  const [showCV, setshowCV] = useState(false);
  const [file, setFile] = useState(null);

  const props = {
    name: "Resume",
    multiple: false,
    accept: ".pdf",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    showUploadList: false,
    onChange(info) {
      const { status } = info.file;

      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        showSuccessMessage(`${info.file.name} file uploaded successfully.`);
        setFile(info.file);
      } else if (status === "error") {
        showWarningMessage(`${info.file.name} file upload failed.`);
      }
    },
  };

  const uploadMediaMenu = (
    <Menu>
      <Menu.Item>
        <div>Upload profile photo</div>
      </Menu.Item>
      <Menu.Item>
        <div>Upload video intro (up to 60secs)</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Modal forceRender className="center x-lg apply-job-modal" show={applyToJobModal} onHide={() => setApplyToJobModal(false)}>
      <Form className="main-wrapper">
        {applyModalSubmit ? (
          <>
            <div className="left-section-2">
              <div className="header">
                <img
                  onClick={() => setapplyModalSubmit(false)}
                  src={require("../../assets/images/icons/back-button-black.svg").default}
                  alt=""
                />
                <Divider type="horizontal" />
              </div>
              <>
                <div className="selected-person">
                  <img className="selected-cv-img" src={require("../../assets/images/ms/ms-11.png").default} alt="" />
                  <div className="fee-form">
                    <div className="name">John Adams</div>
                    <div className="fee-row">
                      <Form.Item name="id" className="c-input w-100 counter">
                        <label htmlFor="">Fee Percentage</label>
                        <Button
                          onClick={feePercentage >= 1 ? () => setFeePercentage(feePercentage - 1) : () => setFeePercentage(0)}
                          className="rounded minus"
                        >
                          -
                        </Button>
                        <Button
                          onClick={feePercentage <= 7 ? () => setFeePercentage(feePercentage + 1) : () => setFeePercentage(8)}
                          className="rounded plus"
                        >
                          +
                        </Button>
                        <Input className="ant-input-w100" value={feePercentage} autoComplete={"" + Math.random()} />
                      </Form.Item>
                      <span className="px-2 mb-2">or</span>
                      <Form.Item name="id" className="c-input w-100">
                        <label htmlFor="">Fixed fee</label>
                        <Input className="ant-input-w100" autoComplete={"" + Math.random()} />
                      </Form.Item>

                      <Divider type="vertical" />

                      <Form.Item name="id" className="select-w100">
                        <label htmlFor="">Fee applied</label>
                        <Select></Select>
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <Divider type="horizontal" />
              </>
              <Button className="ml-auto mr-4">Submit</Button>
            </div>
            <div className="right-section-2">
              <img className="logo" src={require("../../assets/images/logo/logo-md.png").default} alt="" />
              <div className="text-section">
                <ul>
                  <li>
                    Choose from profiles on <a href="jobsmideast.com">Jobsmideast.com</a> or upload CV's
                  </li>
                  <li>Set a percentage or a fixed fee per candidate.</li>
                  <li>Submit profiles to an employer</li>
                  <li>Get paid directly to ypur bank account.</li>
                  <li>10% percent of the fee will be taken by Jobsmideast.com and 90% will be released to the agency.</li>
                </ul>
                <div>
                  <div className="title">Note:</div>
                  <div className="content">
                    Agencies can charge employers up to 8% of the Candidates annual salary, or offer employers a fixed fee per CV.
                  </div>
                  <br />
                  <div className="content">
                    Employers can choose agencies based on the lowest rates, or the lowest rates offered per placement. Keep your rates
                    competitive, and your applicants quality high!
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="left-section">
              <Form.Item name="id" className="select-lg pb-4">
                <div className="title">Search Candidates</div>
                <Select className="scroll-to-smooth" placeholder="Search"></Select>
              </Form.Item>
              <Form.Item name="id" className="upload-cv">
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">DROP CV'S HERE</p>
                  <p className="ant-upload-hint">or</p>
                  <Button className="mx-auto" themecolor="primary">
                    Browse
                  </Button>
                  {/* {file ? <p className="ant-upload-hint mt-1">{file}</p> : <p className="ant-upload-hint mt-1">no file selected</p>} */}
                </Dragger>
              </Form.Item>
              <div className="selected-div">
                <div className="header">
                  <span>Select All</span>
                  <Divider type="vertical" />
                  <span>Deselect</span>
                  <Divider type="vertical" />
                  <span>Delete</span>
                </div>
                <div className="selected-cv">
                  <img
                    onClick={() => setshowCV(true)}
                    className="selected-cv-img"
                    src={require("../../assets/images/ms/ms-10.png")}
                    alt=""
                  />
                  <img className="selected-cv-img" src={require("../../assets/images/ms/ms-8.png").default} alt="" />
                  <img className="selected-cv-img" src={require("../../assets/images/ms/ms-5.png").default} alt="" />
                  <img className="selected-cv-img" src={require("../../assets/images/icons/add-cv-icon.svg").default} alt="" />
                  <img className="selected-cv-img" src={require("../../assets/images/icons/add-cv-icon.svg").default} alt="" />
                </div>
              </div>
              {showCV ? (
                <div className="cv-wrapper">
                  <div className="header">
                    <img onClick={() => setshowCV(false)} src={require("../../assets/images/icons/back-button-black.svg").default} alt="" />
                  </div>
                  <Document file={require("../../assets/pdf/Hassan Resume.pdf")}>
                    <Page pageNumber={1} />
                    {/* {console.log("hi")} */}
                  </Document>
                </div>
              ) : null}
            </div>

            <div className="right-section">
              <img className="selected-cv-img" src={require("../../assets/images/ms/ms-10.png").default} alt="" />
              <Dropdown
                className="add-media-btn"
                getPopupContainer={(trigger) => trigger.parentNode}
                overlay={uploadMediaMenu}
                overlayClassName={"profile-menu"}
                placement="bottomRight"
                trigger={["click"]}
              >
                <Button themecolor="rounded-outlined" className="primary outlined">
                  <PlusOutlined />
                </Button>
              </Dropdown>
              <Form className="w-100">
                <Form.Item name="id" className="c-input w-100 pb-3">
                  <label htmlFor="">Name</label>
                  <Input placeholder="John Adams" className="ant-input-w100" autoComplete={"off"} />
                </Form.Item>
                <Form.Item name="id" className="c-input w-100 pb-3">
                  <label htmlFor="">Job Title</label>
                  <Input placeholder="John Adams" className="ant-input-w100" autoComplete={"off"} />
                </Form.Item>
                <Form.Item name="id" className="c-text-box pb-3">
                  <label htmlFor="">Candidate Description</label>
                  <TextArea rows={5} className="c-text-area" />
                </Form.Item>
                <Button themecolor="green" className="ml-auto">
                  Update
                </Button>
              </Form>
              <Button onClick={() => setapplyModalSubmit(true)} className="mt-5">
                Next
              </Button>
            </div>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default ApplyToJobModal;
