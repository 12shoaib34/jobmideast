import React from "react";
import { Modal as BSModal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";

const Modal = ({ show = false, className = "center lg c-media-picker", backdrop = "static", backdropClassName = null, keyboard = false, onHide = null, children, spacing }) => {
  return (
    <BSModal show={show} backdrop={backdrop} onHide={onHide} keyboard={keyboard} backdropClassName={backdropClassName} className={`c-modal ${className}`}>
      <button type="button" className="close" onClick={onHide}>
        <IoMdClose />
      </button>

      {children}
    </BSModal>
  );
};
export default Modal;
