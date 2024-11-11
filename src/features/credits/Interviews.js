import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Interviews = () => {
  return (
    <>
      {/* <div className="interview-container">
        <div className="interview-left">
          <h3>COMING SOON...</h3>
          <p className="sub-head">
            Make your interviews personal, without even being there!
          </p>
          <p>
            Our video platform allows you to attend your interviews even if
            you're not there! Simply write your interview questions, record them
            as voice notes, or record them as a video.
          </p>
          <p>
            You can then save them as templates, and send them out to up to 200
            people per month, and recieve your answers back in video format!{" "}
          </p>
          <p>
            You can export all videos, or share them with team members for
            updates and reviews.
          </p>
        </div>

        <div className="interview-right">
          {" "}
          <img
            src={require("../../assets/images/sample/interview.png")}
            alt="interview"
          />
        </div>
      </div> */}
      <div className="interview-details">
        <div>
          <div className="pricings">
            <FaCheckCircle className="check-icon" />
            <p>Number of questions: 10</p>
          </div>
        </div>
        <div>
          <div className="pricings">
            <FaCheckCircle className="check-icon" />
            <p>
              Video allowance: 30 secs minimum and up to 5 minutes per video
              answer
            </p>
          </div>
        </div>
        <div>
          <div className="pricings">
            <FaCheckCircle className="check-icon" />
            <p>Users per account: 3</p>
          </div>
        </div>
        <div>
          <div className="pricings">
            <FaCheckCircle className="check-icon" />
            <p>Number of questionnaries per month: 200</p>
          </div>
        </div>
        <div>
          <div className="pricings">
            <FaCheckCircle className="check-icon" />
            <p>Site integration: Yes</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interviews;
