import { Radio } from "antd";
import React from "react";
import "./CardNumberComponent.scss";

const CardNumberComponent = ({ cardId, cardNumber = 4242 }) => {
  return (
    <div className="saved-credit-card-number">
      <Radio value={cardId} />
      <img
        className="card-service-logo"
        src={require("../../assets/images/icons/visa_icon.svg")}
        alt=""
      />
      <span> **** **** **** {cardNumber}</span>
    </div>
  );
};

export default CardNumberComponent;
