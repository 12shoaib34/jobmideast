import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./_LightBox.scss";

const LightBox = ({ images = [] }) => {
  return (
    <div className="slider-main">
      <Carousel>
        {images.map((url, i) => (
          <div key={i} className="slides">
            <div
              style={{ backgroundImage: `url(${url})` }}
              className="bg-blur"
            ></div>
            <img className="slide-imgs" src={url} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default LightBox;
