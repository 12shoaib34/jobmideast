import { Button } from "antd";
import React, { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart, selectPackagesAddOns } from "./slice";
import { getPackageAddOns } from "./thunk";

const ConnectionCredits = ({ scroll, setShowCardModal, noAddOns, setPackage }) => {
  const dispatch = useAppDispatch();
  const packagesAddOns = useAppSelector(selectPackagesAddOns);
  const scrollRef = useRef(null);

  const executeScroll = () => {
    scrollRef.current.scrollIntoView();
    // console.log(scrollRef.current, "events");
  };

  useEffect(() => {
    dispatch(getPackageAddOns());
    noAddOns && executeScroll();
  }, []);

  const handleSelectAddOn = (v) => {
    const payload = { ...v, type: "addOn" };
    dispatch(addToCart(payload));
  };

  return (
    <div className="connection-credits">
      <div className="connection-left">
        <img src={require("../../assets/images/sample/connection-credit.png").default} alt="connection" />
      </div>
      <div className="connection-right">
        <div id="connection-id" className="connection-items">
          <h2>Additional connection credits</h2>
          <p>
            You can view unlimited applications, and once you find the right person to connect with you will need to use a connection
            credit.{" "}
          </p>
          <p>
            Connection credits allow you to connect with job seekers directly. Once you or anyone in your team has made a connection with a
            job seeker you will also be given access to their profile. Only 1 credit will be charged per connection.
          </p>
        </div>

        <div ref={scrollRef} className="connection-pricing">
          {packagesAddOns?.map((p, i) => (
            <div key={i} className="connection-pricing-item">
              <p>{p?.numberOfConnect} Credits</p>
              <Button
                href="#credit-id"
                onClick={() => {
                  // scroll();
                  handleSelectAddOn(p);
                }}
                className="connection-pricing-item-btn"
              >
                £{p?.amount}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectionCredits;
