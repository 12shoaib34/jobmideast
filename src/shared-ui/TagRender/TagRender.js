import React from "react";
import { Tag } from "antd";

const TagRender = (props) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      className="tag-style-class"
      style={{
        marginRight: 3,
        backgroundColor: "#5271FF",
        color: "white",
        borderRadius: "15px",
      }}
    >
      {label}
    </Tag>
  );
};
export default TagRender;
