import React, { useState, useEffect } from "react";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import "antd/dist/antd.css";
import "./imageCropper.scss";

const ImageCropper = (props) => {
  const { pictureListBeforeUpload, removeImage, companyImages, removeIMG } = props;
  const [fileList, setFileList] = useState([]);

  useEffect(()=>{
    setFileList(companyImages)
  },[companyImages])

  const onChange = ({file, fileList: newFileList }) => {
    if(file.status === "removed"){
      removeIMG(newFileList);
      return
    }
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);

    if (imgWindow) {
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };


  return (
    <div className="image-crop-wrapper">
      <ImgCrop grid>
        <Upload
          beforeUpload={pictureListBeforeUpload}
          action=""
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>
    </div>
  );
};

export default ImageCropper;
