import React, { useState, useEffect } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";

const PostJobFrom = (props) => {
  const { themeShadow, formImgae, formTitle, titleColor, children } = props;
  const [open, setOpen] = useState(false);
  const expandIconStyle = { color: "gray", fontSize: "25" };

  useEffect(() => {
    // if (open) {
    //   window.requestIdleCallback(function (deadline) {
    //     while (deadline.timeRemaining() > 0) {
    //       setCollapseOpen(true)
    //     }
    //   }, { timeout: 1000 })

    // }
    // setCollapseOpen(true)
    setOpen(false);
    // console.log("USEEFFECT CDM", collapseOpen, open)
  }, []);
  // useEffect(() => {
  //   console.log("USEEFFECT DEPNDE", collapseOpen, open)
  // }, [open, collapseOpen])

  return (
    <div
      className={`post-job-wrapper collpased ${`${
        open ? "expand-form" : ""
      }`}  ${themeShadow != null ? themeShadow : ""}`}>
      <div
        onClick={() => {
          // setCollapseOpen(true)
          setOpen(!open);
          // console.log("ICON CLICKED", collapseOpen, open)
        }}
        className={`expand-icon  ${open ? "right" : "bottom"}`}>
        <HiOutlineChevronRight style={expandIconStyle} />
      </div>

      <div
        onClick={() => {
          // setCollapseOpen(true)
          setOpen(!open);
          // console.log("DIV CLICKED", collapseOpen, open)
        }}
        className="clickable-div">
        <img
          className="form-header-image"
          src={require(`../../assets/images/auth/${formImgae}.png`)}
          alt=""
        />
        <h1 className={`form-title ${titleColor}`}>{formTitle}</h1>
      </div>
      {children}
    </div>
  );
};

export default PostJobFrom;
