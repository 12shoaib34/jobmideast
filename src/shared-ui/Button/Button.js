import React from "react";
import { Button as AntdButton } from "antd";

function CButton(props) {
  const {
    children,
    type = "small",
    themecolor = "",
    className = "",
    style = null,
  } = props;
  return (
    <AntdButton
      {...props}
      className={`c-button ${
        type === "large" ? "large" : ""
      } ${themecolor} ${className}`}>
      {children}
    </AntdButton>
  );
}

export default CButton;
