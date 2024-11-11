import React, { useEffect, useState } from "react";
import Modal from "../../shared-ui/Modal/Modal";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Button from "../../shared-ui/Button/Button";
import { Input, Form, Upload, Button as AntdButton } from "antd";
import { PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import MediaPicker from "../../shared-ui/MediaPicker/MediaPicker";
import { uploadProfileImage } from "../../features/auth/thunk";
import { useAppSelector } from "../../store/hooks";
import { selectProfileImage } from "../../features/auth/slice";
import { uploadFile } from "../../features/company/service";
import "./_Responsiveness.scss";

const { TextArea } = Input;

const ImageUploader = ({
  showUploadMultiplePicsModal,
  HandleClick,
  photos,
  setPhotos,
}) => {
  const [fileList, setFileList] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const pictureListBeforeUpload = async (file) => {
    const payload = new FormData();
    payload.append("file", file, file.name);
    const res = await uploadFile(payload);
    if (photos?.length < 5) {
      setPhotos([...photos, res.url]);
    } else {
      const newArr = photos.slice(0, 3);
      setPhotos([...newArr, res.url]);
      // setPhotos([...photos.splice(4, 1, res.url)]);
    }
    // setPhotos([...photos, res.url]);
    return false;
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [showUploadMultiplePicsModal]);

  const removeImage = (indexSlide = null) => {
    if (indexSlide) {
      const updatedPhotos = photos.filter(
        (item, index) => index !== indexSlide
      );
      setPhotos(updatedPhotos);
    } else {
      const updatedPhotos = photos.filter(
        (item, index) => index !== selectedIndex
      );
      setPhotos(updatedPhotos);
    }

    setSelectedIndex(0);
  };

  // const profileImageBeforeUpload = (file) => {};

  return (
    <Modal
      show={showUploadMultiplePicsModal}
      onHide={HandleClick}
      className="image-uploader-modal-section rm-padding x-lg"
    >
      <div className="image-uploader-main">
        <div className="light-box-section">
          <Carousel
            renderThumbs={(item) =>
              item.map((imgurl, index) => (
                <div className="slider-image position-relative">
                  <CloseCircleOutlined
                    onClick={() => {
                      removeImage(index);
                    }}
                    className="close-icon"
                    color="#fff"
                    style={{ position: "absolute" }}
                  />
                  <img src={imgurl.key} />
                </div>
              ))
            }
            className="company-carousel"
            selectedItem={selectedIndex}
            onChange={setSelectedIndex}
          >
            {photos.map((photo) => (
              <div className="slides" key={photo}>
                <img className="slide-imgs" src={photo} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="image-upload-section flex">
          <div className="selected-image-container">
            <div className="selected-image">
              {photos?.length && <img src={photos[selectedIndex]} alt="" />}
            </div>
            {/* <Form.Item className="c-input my-4 w-100">
              <label className="color-white " htmlFor="">
                Company name
              </label>
              <Input
                placeholder=""
                className="ant-input-w100"
                type="text"></Input>
            </Form.Item>
            <Form.Item className="c-text-box pb-3">
              <label className="color-white " htmlFor="">
                Description
              </label>
              <TextArea className="c-text-area" rows={4} />
            </Form.Item> */}
            <div className="update-btn">
              <Button
                className="add-media-btn"
                onClick={() => removeImage(selectedIndex)}
              >
                <CloseCircleOutlined />
                Remove
              </Button>
            </div>
          </div>
          <div className="media-container">
            {/* <span > */}
            {/* <PlusCircleOutlined /> */}
            <Upload
              accept=".jpg, .jpeg, .png"
              multiple={false}
              beforeUpload={pictureListBeforeUpload}
              showUploadList={false}
            >
              <Button className="add-media-btn">
                <PlusCircleOutlined />
                Add media
              </Button>
              {/* <AntdButton icon={<PlusCircleOutlined />}>Add media</AntdButton> */}
            </Upload>
            {/* </span> */}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageUploader;
