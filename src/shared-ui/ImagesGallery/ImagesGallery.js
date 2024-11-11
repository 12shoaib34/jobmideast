import React, { useState } from "react";

import { Image } from "antd";

import Modal from "../Modal/Modal";
import { MappedElement } from "../../utils/helper";

const contentStyle = {
  height: "250px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

function ImagesGallery({ title = "Photos", images = [] }) {
  const [openAllImages, setOpenAllImages] = useState(false);

  return (
    <div className="c-images-gallery">
      <span className="c-images-gallery-header">
        <h6 className="title">{title}</h6>
        {!!images?.length && (
          <a onClick={() => setOpenAllImages(true)} className="action">
            See More
          </a>
        )}
      </span>

      {!!images?.length && (
        <span className="images-container">
          <MappedElement
            data={images.slice(0, 4)}
            renderElement={(obj, index) => {
              return <Image src={obj} />;
            }}
          />
        </span>
      )}

      {!images?.length && <span className="images-container"></span>}

      <Modal
        show={openAllImages}
        className="center lg c-media-picker"
        backdrop="static"
        keyboard={false}
        onHide={() => setOpenAllImages(false)}
      >
        <span className="images-container-modal">
          <MappedElement
            data={images}
            renderElement={(obj, index) => {
              return <Image key={index} src={obj} />;
            }}
          />
        </span>
      </Modal>
    </div>
  );
}

export default ImagesGallery;
