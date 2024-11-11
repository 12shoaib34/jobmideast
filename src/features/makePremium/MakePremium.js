import React from "react";
import "./_MakePremium.scss";
import "./_Responsive.scss";
import { Checkbox, Form } from "antd";
import Button from "../../shared-ui/Button/Button";

const MakePremium = () => {
  return (
    <>
      <div className="make-premium-container" wrap={true}>
        <div className="make-premium">
          <div className="heading-section">
            <h1>
              {" "}
              Stay on{" "}
              <span>
                Top
                <img
                  src={require("../../assets/images/icons/mountain.svg")}
                  alt=""
                />
              </span>{" "}
              of the <br /> competition
            </h1>
          </div>
          <div className="options-premium">
            <h1>Premium jobs benefits</h1>
            <p>- Premium jobs will be seen before standard jobs </p>
            <p>
              - Users are 70% more likely to engage with jobs on the first page{" "}
            </p>
            <p>
              - Your jobs will be shown in other standard jobs posted by others
              in your sectors
            </p>
          </div>
          <div className="post">
            <span>
              <Button>50.00</Button> <p>per job</p>
            </span>
            <Form className="make-premium-check" layout={"vertical"}>
              <Form.Item name="id" label="Make my feature job posts premium.">
                <Checkbox />
              </Form.Item>
            </Form>
          </div>
          <Button className="skip-btn"> Skip</Button>
        </div>
        <div className="make-premium-video">
          <div className="video-section">
            <div className="aspect-ratio">
              <video autoPlay={true}>
                <source
                  src={require("../../assets/images/sample/Premium Feature_1.mp4")}
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakePremium;
