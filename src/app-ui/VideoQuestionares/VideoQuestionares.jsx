import React, { useEffect, useState } from "react";
import Modal from "../../shared-ui/Modal/Modal";
import { FaVideo, FaMicrophoneAlt } from "react-icons/fa";
import { MdTextFields } from "react-icons/md";
import Button from "../../shared-ui/Button/Button";
import { Input, Form } from "antd";
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";
import MediaPicker from "../../shared-ui/MediaPicker/MediaPicker";

const { TextArea } = Input;

const VideoQuestionare = () => {
  const [questionareSteps, setQuestionareSteps] = useState("option");
  const [audioDetails, setAudioDetails] = useState({
    audioDetails: {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    },
  });

  let handleAudioStop = (data) => {
    console.log(data);
    setAudioDetails({ audioDetails: data });
  };
  let handleAudioUpload = (file) => {
    console.log(file);
  };

  let handleReset = () => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    };
    setAudioDetails({ audioDetails: reset });
  };

  const [file, setFile] = useState(null);

  const onRemove = (file) => {
    setFile((prevState) => {
      const index = prevState.indexOf(file);

      const newFile = prevState.slice();

      newFile.splice(index, 1);

      return newFile;
    });
  };

  let Switch = () => {
    switch (questionareSteps) {
      case "option":
        return (
          <div className="options-wrapper">
            <p>
              Whitch option you would prefer <br /> for the question
            </p>
            <div className="select-options">
              <div
                onClick={() => setQuestionareSteps("video")}
                className="options"
              >
                <FaVideo />
              </div>
              <div
                onClick={() => setQuestionareSteps("audio")}
                className="options"
              >
                <FaMicrophoneAlt />
              </div>
              <div
                onClick={() => setQuestionareSteps("text")}
                className="options"
              >
                <MdTextFields />
              </div>
            </div>
          </div>
        );

      case "video":
        return (
          <div className="video-option-wrapper">
            <div className="video-option-wrapper">
              <p className="instruction">
                Seems you don't have a camera of microphone <br /> connected on
                this devices
              </p>
              <p>please enable microphone permissions</p>
              <div className="file-picker">
                <MediaPicker
                  fileList={file}
                  setFileList={setFile}
                  onRemove={onRemove}
                  onPicked={() => console.log("files", file)}
                  type="file"
                />
              </div>
              <p>Or</p>
              <div className="file-picker">
                <MediaPicker
                  fileList={file}
                  setFileList={setFile}
                  onRemove={onRemove}
                  onPicked={() => console.log("files", file)}
                  type="file"
                />
              </div>
              <div className="share-btns">
                <Button>Cancel</Button>
                <Button>Share</Button>
              </div>
            </div>
          </div>
        );
      case "audio":
        return (
          <div className="audio-option-wrapper">
            <p className="instruction">
              Seems you don't have a camera of microphone <br /> connected on
              this devices
            </p>
            <p>please enable microphone permissions</p>
            <label className="required" htmlFor="">
              Upload company logo
            </label>
            <Recorder
              record={true}
              title={"Hit Record to start !"}
              audioURL={audioDetails.audioDetails.url}
              showUIAudio
              handleAudioStop={(data) => handleAudioStop(data)}
              handleAudioUpload={(data) => handleAudioUpload(data)}
              handleReset={() => handleReset()}
              mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
            />
          </div>
        );
      case "text":
        return (
          <div className="text-option-wrapper">
            <div classname="id">
              <Form.Item name="id" className="c-text-box pb-3">
                <label className="color-white " htmlFor="">
                  Type your Question
                </label>
                <TextArea
                  placeholder="Type here"
                  className="c-text-area"
                  rows={6}
                />
              </Form.Item>
            </div>
            <div className="buttons-secs">
              <Button>Cancel</Button>
              <Button>Save</Button>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Modal className="rm-padding md" show={true}>
        <div className="video-questionare-main">
          <div className="head">
            <h1>Video Questionare</h1>
          </div>

          {Switch()}
        </div>
      </Modal>
    </>
  );
};

export default VideoQuestionare;
