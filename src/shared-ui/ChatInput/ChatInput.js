import React, { useRef, useState } from "react";

import "antd/dist/antd.css";
import Button from "../../shared-ui/Button/Button";
import MediaPicker from "../../shared-ui/MediaPicker/MediaPicker";
import { Upload, Form, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { uploadFile } from "../../features/company/service";
import { sizeInMB } from "../../utils/helper";
import { getSentFiles } from "../../features/auth/thunk";

const { Dragger } = Upload;

const ChatInput = ({ sendMessage, selectedChat }) => {
  const [form] = Form.useForm();
  const chatInputFormRef = useRef();

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [fileList, setFileList] = useState([]);
  const dispatch = useAppDispatch();
  const [fileModal, setFileModal] = useState(false);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const addEmoji = (emoji) => {
    const message = form.getFieldValue("message");
    const text = message ? `${message}${emoji.native}` : `${emoji.native}`;
    form.setFieldsValue({
      message: text,
    });
    toggleEmojiPicker();
  };

  const onFinish = (values) => {
    // console.log("values:", values.message.charCodeAt(0));
    sendMessage(values.message, "text");
    form.resetFields();
  };
  const enterToSend = (e) => {
    if (e.keyCode === 13 && e.shiftKey) {
      return null;
    }

    if (e.keyCode === 13) {
      form.submit();
      e.preventDefault();
    }
  };

  const [file, setFile] = useState(null);

  const onRemove = (file) => {
    setFileList((prevState) => {
      const index = prevState.indexOf(file);
      const newFileList = prevState.slice();
      newFileList.splice(index, 1);
      return newFileList;
    });
  };
  const beforeUpload = (file) => {
    console.log("FILE",file)
    setFileList((state) => [file]);
    fileUpload(file);
    return false;
  };
  const fileUpload = async (file) => {
    const payload = new FormData();
    let fileType = file.type.split("/")[0];
    let docType = file.name.split(".")[1];
    fileType = fileType === "application" ? "document" : fileType;
    docType =
      fileType === "application" || fileType === "document" ? docType : "";
    let filesize = sizeInMB(file.size);
    docType = file.type.split("/")[1];
    payload.append("file", file, file.name);
    const res = await uploadFile(payload);
    sendMessage(res.url, "file", fileType, docType, filesize);

    if (selectedChat) {
      const payload = { conversationId: selectedChat?.id };
      dispatch(getSentFiles({ payload }));
    }

    return false;
  };
  return (
    <>
      {showEmojiPicker ? (
        <Picker
          set="facebook"
          onSelect={addEmoji}
          style={{ position: "absolute", bottom: "50px", width: "345px" }}
        />
      ) : null}
      <div className="text-field-container">
        <div className="text-field">
          <Form
            tabIndex={0}
            onKeyDown={(e) => enterToSend(e)}
            ref={chatInputFormRef}
            form={form}
            onFinish={onFinish}
            autoComplete="off">
            <div className="items">
              <div className="buttons-wrapper">
                <div className="chat-btns-left">
                  {/* <button
                  onClick={() => alert("working")}
                  className="text-field-btns">
                  <img
                    src={require("../../assets/images/icons/pin.svg")}
                    alt="file"
                  />
                </button> */}
                  <Dragger
                    className="text-field-btns"
                    showUploadList={false}
                    fileList={fileList}
                    name="file"
                    onRemove={onRemove}
                    beforeUpload={beforeUpload}
                    onChange={(info) => {
                      const { status } = info.file;
                      if (info.file.status !== "uploading") {
                      }
                      if (info.file.status === "done") {
                        message.success(
                          `${info.file.name} file uploaded successfully.`
                          );
                        } else if (info.file.status === "error") {
                          message.error(`${info.file.name} file upload failed.`);
                      }
                    }}>
                    <img
                      src={require("../../assets/images/icons/pin.svg")}
                      alt="file"
                    />
                  </Dragger>

                  {/* <button
                  onClick={() => alert("working")}
                  className="text-field-btns">
                  <img
                    src={require("../../assets/images/icons/emoji.svg")}
                    alt="emoji"
                  />
                </button> */}
                  <button
                    type="button"
                    className="text-field-btns"
                    onClick={toggleEmojiPicker}>
                    <img
                      src={require("../../assets/images/icons/emoji.svg")}
                      alt="emoji"
                    />
                  </button>
                </div>
              </div>

              <Form.Item name="message" style={{ width: "100%" }}>
                <TextArea
                  autoFocus={true}
                  autoSize={{ minRows: 1, maxRows: 5 }}
                  className="type-text"
                  size="small"
                  type="text"
                  placeholder="Type something"
                />
              </Form.Item>

              <div className="buttons-wrapper">
                <div className="chat-btns-right">
                  {/* <button
                  onClick={() => alert("working")}
                  className="text-field-btns">
                  <img
                    className="voice-icon"
                    src={require("../../assets/images/icons/voice.svg")}
                    alt="voice"
                  />
                </button> */}
                  {/* <button type="button" className="text-field-btns">
                    <Popover content="coming soon">
                      <img
                        src={require("../../assets/images/icons/voice.svg")}
                        alt="voice"
                      />
                    </Popover>
                  </button> */}
                  <Button htmlType="submit" className="text-field-btns">
                    <img
                      style={{ width: 27, height: 28 }}
                      src={require("../../assets/images/icons/send.svg")}
                      alt="send"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
