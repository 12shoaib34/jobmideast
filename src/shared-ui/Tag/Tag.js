import { Tag } from "antd";
import React from "react";

const CTag = (props) => {
  const { status = "", tagName = "default" } = props;
  return (
    <Tag {...props} className={`custom-tag ${status}`}>
      {tagName}
    </Tag>
  );
};

export default CTag;
