import React from "react";

import defaultImage from "../../assets/images/user.png";

const Avatar = ({ size, userStatus, image, onClick }) => {
  return (
    <div className="ava-container">
      <img
        onClick={onClick}
        className={`${
          size === "small" ? "small" : size === "medium" ? "medium" : "large"
        } `}
        src={image || defaultImage}
        alt="dp"
      />
      <i
        className={`${size === "small" && "small"} ${userStatus && userStatus}`}
      ></i>
    </div>
  );
};

export default Avatar;
