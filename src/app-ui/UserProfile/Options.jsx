import React, { useState, useEffect, useRef } from "react";
import { Input, Form, Select, Dropdown, Empty, Divider, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Button from "../../shared-ui/Button/Button";
import { useWindowSize } from "../../utils/helper";
import { showWarningMessage } from "../../utils/message";
import { PlusOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as rules from "../../utils/rules";

//{----------Slice---------}
import {
  selectFilterTeamNotes,
  selectNoteTags,
  selectStatus,
  selectTeamNotes,
  selectUpdateTeamNoteSuccess,
  selectCreateTeamNoteSuccess,
  selectDeleteNoteSuccess,
  selectIsAdmin,
  selectIsMainAdmin,
  selectEmployerProfile,
  selectIsTeamNotesLoading,
  selectJobseekerProfileById,
} from "../../features/auth/slice";
//{----------Thunks---------}
import {
  getNoteTags,
  getTeamNotes,
  addTeamNote,
  updateTeamNote,
  filterTeamNote,
  deleteNote,
  searchTeamNote,
} from "../../features/auth/thunk";
import ProfileNotes from "../../shared-ui/ProfileNotes/profileNotes";
// const { TextArea } = Input;
const Option = Select;
const Options = (props) => {
  let { profileOption, profileId, setProfileOption } = props;
  const dispatch = useAppDispatch();
  const teamNoteTab = useRef(null);
  const [tabs, setTabs] = useState("tab1");
  const [teamModalShow, setTeamModalShow] = useState(false);
  const [teamNoteData, setTeamNoteData] = useState({});
  const [selectedForEdit, setselectedForEdit] = useState(false);
  const teamNotes = useAppSelector(selectTeamNotes);
  const noteTags = useAppSelector(selectNoteTags);
  const isLoading = useAppSelector(selectStatus);
  const updateTeamNoteSuccess = useAppSelector(selectUpdateTeamNoteSuccess);
  const createTeamNoteSuccess = useAppSelector(selectCreateTeamNoteSuccess);
  const isTeamNotesLoading = useAppSelector(selectIsTeamNotesLoading);
  const deleteNoteSuccess = useAppSelector(selectDeleteNoteSuccess);
  const filteredTeamNotes = useAppSelector(selectFilterTeamNotes);
  const [editTeamNoteObject, setEditTeamNoteObject] = useState(null);
  const [noteId, setNoteId] = useState(null);
  const [teamNoteFilter, setTeamNoteFilter] = useState(teamNotes);
  const [tagId, setTagId] = useState(1);
  const [form] = Form.useForm();
  const { width, height } = useWindowSize();
  const { confirm } = Modal;

  useEffect(() => {
    if (profileId) {
      dispatch(getTeamNotes(profileId));
    }
  }, [profileId]);

  useEffect(() => {
    if (profileId) {
      dispatch(getTeamNotes(profileId));
    }
    // if (
    //   updateTeamNoteSuccess === true ||
    //   createTeamNoteSuccess === true ||
    //   deleteNoteSuccess === true
    // ) {
    //   if (updateTeamNoteSuccess === true) {
    //     showSuccessMessage("updated teamnote successfully");
    //   }
    //   if (createTeamNoteSuccess === true) {
    //     showSuccessMessage("created teamnote successfully");
    //   }
    //   if (deleteNoteSuccess === true) {
    //     showSuccessMessage("deleted teamnote successfully");
    //   }
    // }
  }, [updateTeamNoteSuccess, createTeamNoteSuccess, deleteNoteSuccess]);

  useEffect(() => {
    setTeamNoteFilter(teamNotes);
  }, [teamNotes]);

  useEffect(() => {
    setTeamNoteData(teamNoteData);
  }, [teamNoteData]);

  useEffect(() => {
    if (selectedForEdit) {
      setEditTeamNoteObject(editTeamNoteObject);
      form.setFieldsValue(editTeamNoteObject);
    }
  }, [editTeamNoteObject]);

  useEffect(() => {
    dispatch(getNoteTags());
  }, []);

  useEffect(() => {
    if (tagId && profileId) {
      dispatch(filterTeamNote({ id: tagId, jobseekerId: profileId }));
    }
  }, [tagId , profileId]);

  useEffect(() => {
    if (filteredTeamNotes) setTeamNoteFilter(filteredTeamNotes);
  }, [filteredTeamNotes]);

  useEffect(() => {
    if (updateTeamNoteSuccess) {
      dispatch(getTeamNotes(profileId));
    }
  }, [updateTeamNoteSuccess]);

  const handleVisibleChange = (flag) => {
    setTeamModalShow(flag);
  };

  const onFinish = (values) => {
    values.jobseekerId = profileId;
    if (!selectedForEdit) {
      values.jobseekerId = profileId;
      const payload = values;
      dispatch(addTeamNote({ payload }));
      dispatch(getTeamNotes(profileId));
      setTeamModalShow(false);
      form.resetFields();
    } else {
      if (!values) {
        showWarningMessage("Not should not be empty");
      }
      values.jobseekerId = profileId;
      dispatch(updateTeamNote({ id: noteId, body: values }));
      dispatch(getTeamNotes(profileId));
      setselectedForEdit(false);
      setNoteId(null);
      setTeamModalShow(false);
      form.resetFields();
    }
  };

  const HandleProfileOption = () => {
    setProfileOption(false);
  };

  const getTeamNoteForEditFunction = (id) => {
    setselectedForEdit(true);

    setNoteId(id);
    setEditTeamNoteObject(teamNotes.find((t) => t.id == id));

    setTeamModalShow(true);
    form.setFieldsValue(editTeamNoteObject);
  };

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNote(noteId));
  };

  const teamNoteFilterSorted = teamNoteFilter
    ?.slice()
    .sort((a, b) => a.id - b.id);

  const addTeamNoteModal = (
    <div className="team-note-modal">
      <Divider />
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          required
          rules={rules.requiredRule}
          name="comment"
          style={{ zIndex: 210 }}
          label={"Add Notes"}
          className="checking-ck"
          valuePropName="data"
          getValueFromEvent={(event, editor) => {
            const data = editor.getData();
            return data;
          }}>
          <CKEditor
            id="content"
            name="template"
            editor={ClassicEditor}
            config={{
              toolbar: ["bold", "italic", "numberedList", "bulletedList"],
            }}
            onReady={(editor) => { }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log(data);
              console.log(data.replace(new RegExp("<p>&nbsp;</p>", "g"), ""));
            }}
          />
        </Form.Item>
        {/* <Form.Item name="comment" className="c-text-box">
          <TextArea
            className="pb-3 c-text-area"
            rows={3}
            placeholder="type here"
          />
        </Form.Item> */}
        <Form.Item
          rules={[{ required: true, message: "This field is required" }]}
          style={{ zIndex: 100 }}
          name="tagId"
          className="select-lg py-3">
          <Select
            className="scroll-to-smooth"
            getPopupContainer={(trigger) => trigger.parentNode}
            placeholder="Select tag">
            {noteTags?.map((tag, i) => (
              <Option value={tag.id}>{tag.title}</Option>
            ))}
          </Select>
        </Form.Item>

        <Button
          style={{ padding: "7px 27px" }}
          loading={isTeamNotesLoading}
          htmlType="submit"
          themecolor="outlined-green ml-auto">
          {selectedForEdit ? "Edit Note" : "Add Note"}
        </Button>
      </Form>
    </div>
  );

  const showConfirm = (id) => {
    confirm({
      title: "Do you want to delete this note?",
      zIndex: "1050",
      onOk() {
        handleDeleteNote(id);
      },
    });
  };

  const handleSearchNote = (e) => {
    const payload = {};
    payload.id = profileId;
    payload.query = e;
    dispatch(searchTeamNote(payload));
    // dispatch(filterTeamNote({ id: tagId, jobseekerId: profileId }));
  };

  const tab1 = () => {
    return (
      <>
        <div className="tab-section" ref={teamNoteTab}>
          <Form className="option-form">
            <div className="tab-cells flex-end">
              <div
                style={{ zIndex: "100", position: "relative" }}
                className="add-notes">
                Add notes
                <Dropdown
                  overlay={addTeamNoteModal}
                  overlayClassName={"add-team-note"}
                  getPopupContainer={() => teamNoteTab.current}
                  trigger={["click"]}
                  visible={teamModalShow}
                  onVisibleChange={handleVisibleChange}>
                  <Button
                    themecolor="rounded-outlined"
                    className="primary outlined add-note-btn ml-2">
                    <PlusOutlined />
                  </Button>
                </Dropdown>
              </div>
            </div>
            <div className="tab-cells d-flex flex-column align-items-center">
              <Form onFinish={handleSearchNote}>
                <Form.Item name="search" className="c-input pb-3">
                  <Input
                    placeholder="Search"
                    className="ant-input-lg"
                    autoComplete="off"
                    type="text"></Input>
                </Form.Item>
              </Form>
              <Form.Item name="id" className="select-lg">
                <Select
                  className="scroll-to-smooth"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select"
                  onChange={(value) => {
                    setTagId(value);
                  }}>
                  {noteTags?.map((tag, i) => (
                    <Option value={tag.id}>{tag.title}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            {!teamNoteFilterSorted?.length && (
              <p style={{ display: "grid", placeContent: "center" }}>
                No team notes
              </p>
            )}
            <div className="conntection-wrapper">
              {teamNoteFilterSorted?.map((note, index) => (
                <ProfileNotes
                  note={note}
                  i={index}
                  getTeamNoteForEditFunction={getTeamNoteForEditFunction}
                  showConfirm={showConfirm}
                />
              ))}
            </div>
          </Form>
        </div>
      </>
    );
  };
  const tab2 = () => {
    return (
      <div className="main-media-conainer">
        <div className="user-media">
          <span className="items">
            <span className="files">
              <b className="mr-2">X</b>
              <img
                className="user-media-files mr-2"
                src={require("../../assets/images/icons/filetypes/Wfile.svg")}
                alt=""
              />
              <p className="user-file-name">Documents</p>
            </span>
            <span className="files-details">
              <p>02-02-2021 - 6:31 pm </p>
              <p>- 5.7 mb</p>
            </span>
          </span>
          <span className="download-media">
            <img
              classname="id"
              src={require("../../assets/images/icons/download-icon.svg")}
              alt=""
            />
            <a href="#" className="download">
              Download
            </a>
            <p className="user-items-expire">Expires in 29 days.</p>
          </span>
        </div>
        <div className="user-media">
          <span className="items">
            <span className="files">
              <b className="mr-2">X</b>

              <img
                className="user-media-files mr-2"
                src={require("../../assets/images/icons/filetypes/Wfile.svg")}
                alt=""
              />

              <p className="user-file-name">Documents</p>
            </span>

            <span className="files-details">
              <p>02-02-2021 - 6:31 pm </p>
              <p>- 5.7 mb</p>
            </span>
          </span>

          <span className="download-media">
            <img
              classname="id"
              src={require("../../assets/images/icons/download-icon.svg")}
              alt=""
            />
            <a href="#" className="download">
              Download
            </a>
            <p className="user-items-expire">Expires in 29 days.</p>
          </span>
        </div>
        <div className="user-media">
          <span className="items">
            <span className="files">
              <b className="mr-2">X</b>
              <img
                className="user-media-files mr-2"
                src={require("../../assets/images/icons/filetypes/Wfile.svg")}
                alt=""
              />
              <p className="user-file-name">Documents</p>
            </span>
            <span className="files-details">
              <p>02-02-2021 - 6:31 pm </p>
              <p>- 5.7 mb</p>
            </span>
          </span>
          <span className="download-media">
            <img
              classname="id"
              src={require("../../assets/images/icons/download-icon.svg")}
              alt=""
            />
            <a href="#" className="download">
              Download
            </a>
            <p className="user-items-expire">Expires in 29 days.</p>
          </span>
        </div>
      </div>
    );
  };
  const tab3 = () => {
    return (
      <div className="main-media-conainer">
        <div className="user-media">
          <span className="items">
            <span className="files">
              <b className="mr-2">X</b>
              <img
                className="user-media-files mr-2"
                src={require("../../assets/images/icons/filetypes/Wfile.svg")}
                alt=""
              />
              <p className="user-file-name">Documents</p>
            </span>
            <span className="files-details">
              <p>02-02-2021 - 6:31 pm </p>
              <p>- 5.7 mb</p>
            </span>
          </span>
          <span className="download-media">
            <img
              classname="id"
              src={require("../../assets/images/icons/download-icon.svg")}
              alt=""
            />
            <a href="#" className="download">
              Download
            </a>
            <p className="user-items-expire">Expires in 29 days.</p>
          </span>
        </div>
        <div className="user-media">
          <span className="items">
            <span className="files">
              <b className="mr-2">X</b>

              <img
                className="user-media-files mr-2"
                src={require("../../assets/images/icons/filetypes/Wfile.svg")}
                alt=""
              />

              <p className="user-file-name">Documents</p>
            </span>

            <span className="files-details">
              <p>02-02-2021 - 6:31 pm </p>
              <p>- 5.7 mb</p>
            </span>
          </span>

          <span className="download-media">
            <img
              classname="id"
              src={require("../../assets/images/icons/download-icon.svg")}
              alt=""
            />
            <a href="#" className="download">
              Download
            </a>
            <p className="user-items-expire">Expires in 29 days.</p>
          </span>
        </div>
        <div className="user-media">
          <span className="items">
            <span className="files">
              <b className="mr-2">X</b>
              <img
                className="user-media-files mr-2"
                src={require("../../assets/images/icons/filetypes/Wfile.svg")}
                alt=""
              />
              <p className="user-file-name">Documents</p>
            </span>
            <span className="files-details">
              <p>02-02-2021 - 6:31 pm </p>
              <p>- 5.7 mb</p>
            </span>
          </span>
          <span className="download-media">
            <img
              classname="id"
              src={require("../../assets/images/icons/download-icon.svg")}
              alt=""
            />
            <a href="#" className="download">
              Download
            </a>
            <p className="user-items-expire">Expires in 29 days.</p>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="tabs-main">
      <div className="buttons-section">
        {width < 1025 && (
          <div className="flex" onClick={HandleProfileOption}>
            {" "}
            <img
              src={`${require("../../assets/images/icons/white-back.svg")}`}
              height={10}
              className="profile-back-btn"
            />
          </div>
        )}
        {/* <div className="flex" onClick={HandleProfileOption}> <img  src={`${require("../../assets/images/icons/Back.svg")}`} height={10} className="profile-back-btn"/></div> */}
        <button
          onClick={() => setTabs("tab1")}
          style={{ height: "60px", width: "100%" }}
          className={`buttons ${tabs === "tab1" ? "active-btn" : ""}`}>
          Team notes
        </button>
        {/* <button
          onClick={() => setTabs("tab2")}
          className={`buttons ${tabs === "tab2" ? "active-btn" : ""}`}>
          Files recevied
        </button>
        <button
          onClick={() => setTabs("tab3")}
          className={`buttons ${tabs === "tab3" ? "active-btn" : ""}`}>
          Files shared
        </button> */}
      </div>
      <>
        {tabs === "tab1"
          ? tab1()
          : tabs === "tab2"
            ? tab2()
            : tabs === "tab3"
              ? tab3()
              : null}
      </>
    </div>
  );
};

export default Options;
