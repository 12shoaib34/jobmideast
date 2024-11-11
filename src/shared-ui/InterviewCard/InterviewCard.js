import React from "react";
import { Divider } from "antd";
import CButton from "../../shared-ui/Button/Button";

const interviewCardData = { title: "Interview Details", subtitle: "you have been sent an interview request" };

const CInterviewCard = (props) => {
  const { type = "accepted", btntype = "white shadowed" } = props;
  return (
    <div className="interview-card">
      <div className="card-left">
        <div className="mb-2">
          {type === "viewDetails" || type === "acceptReject" ? (
            <div>
              <div className="title">{interviewCardData.title}</div>
              <div className="subtitle">{interviewCardData.subtitle}</div>
            </div>
          ) : null}
        </div>
        {type === "viewDetails" ? <CButton className={`${btntype}`}>View Details</CButton> : null}
        {type === "acceptReject" ? (
          <div className="d-flex">
            <CButton className={`${btntype} accept`}>Accept</CButton>
            <CButton className={`${btntype} reject ml-2`}>Reject</CButton>
          </div>
        ) : null}
        {type === "accepted" ? (
          <div className="accepted">
            <img src={require("../../assets/images/icons/check-icon-green.svg").default} alt="" />
            <div className="left-text">
              <div>
                <div className="title">Congratulations!</div>
                <div className="subtitle">Your interview has been accepted</div>
              </div>

              <div className="sub-subtitle">
                Cant attend the interview?
                <br />
                <a>Click here to cancel</a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="card-right">
        <div className="column">
          <img src={require("../../assets/images/icons/calendar-white-icon.svg").default} alt="" />
          <div className="title">Interview Date</div>
          <div className="sub-title">02-02-2021</div>
        </div>

        <Divider type="vertical" className="c-divider" />

        <div className="column">
          <img src={require("../../assets/images/icons/clock-white-icon.svg").default} alt="" />
          <div className="title">Interview Time</div>
          <div className="sub-title">9:30</div>
        </div>

        <Divider type="vertical" className="c-divider" />

        <div className="column">
          <img src={require("../../assets/images/icons/face-to-face-white-icon.svg").default} alt="" />
          <div className="title">Interview Type</div>
          <div className="sub-title">Face to face</div>
        </div>
      </div>
    </div>
  );
};

export default CInterviewCard;
