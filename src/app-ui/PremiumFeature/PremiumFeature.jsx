import React from "react";
import { Checkbox } from "antd";
import Button from "../../shared-ui/Button/Button";

const PremiumFeature = () => {
  return (
    <>
      <div className="Feature-wrapper">
        <div className="feature">
          <div className="image-wrapper cell"></div>
          <div className="make-premium cell">
            <p>
              Premium jobs will appear at the top of search <br /> pages and job
              seekers dashboard
            </p>
            <div className="make-premium">
              <Checkbox onChange={null}>
                Turn on feature option for ₤50 per job
              </Checkbox>
              <div className="btns-cell my-3 d-flex">
                <Button className="mr-4">Preview job</Button>
                <Button themecolor="green">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumFeature;
