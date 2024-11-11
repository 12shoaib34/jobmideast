import React, { useEffect } from "react";
import { Spin } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { getPackages, getTransactionHistory } from "./thunk";
import CreditCard from "./CreditCard";
import { getCounter } from "../dashboard/thunk";
import { selectCounter } from "../dashboard/slice";
import Button from "../../shared-ui/Button/Button";
import {
  selectError,
  selectPackageBoughtSuccess,
  selectPackages,
  selectStatus,
  selectAddOnBoughtSuccess,
  addToCart,
} from "./slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectTransactionHistory } from "./slice";
import { showErrorMessage, showSuccessMessage } from "../../utils/message";

const Pricing = ({ myRef }) => {
  const dispatch = useAppDispatch();
  const packages = useAppSelector(selectPackages);
  const errorMessage = useAppSelector(selectError);
  const isLoading = useAppSelector(selectStatus);
  // const counter = useAppSelector(selectCounter);
  // const transactionHistory = useAppSelector(selectTransactionHistory);
  // const [showCardModal, setShowCardModal] = useState(false);
  // const [selectedPackage, setPackage] = useState(null);

  useEffect(() => {
    dispatch(getCounter());
    dispatch(getPackages());
    dispatch(getTransactionHistory());
  }, []);

  useEffect(() => {
    if (errorMessage) {
      showErrorMessage(errorMessage.toString());
    }
  }, [errorMessage]);

  const handleSelectPackage = (v) => {
    console.log("PAYLOAD", v);
    const payload = { ...v, type: "package" };
    dispatch(addToCart(payload));
  };

  return (
    <div className={`pricing-container justify-content-center}`}>
      <Spin spinning={isLoading} size="default">
        <div className={`spin-fix  pricing-right`}>
          <div className="pricing-left">
            {/* Header */}

            <div className="heading-section">
              <div>
                <p>Choose the plan that's right for your business.</p>
              </div>
            </div>
            <div className="save-upto-date" >
              {" "}
              <div >OFFER ENDS 31ST OF DECEMBER 2021</div>
            </div>

            {/* Packages */}
            <div className="pricing-main">
              <div className="pricing-section">
                <div className="pricing-row">
                  <div className="pricing-card pricing-first">
                    <div className="pricing-header">
                      <div className="top-items-head"></div>
                      <div className="top-items-head color-blue"></div>
                    </div>
                    <div className="pricing-items">
                      <div className="pricing-typs">Duration</div>
                      <div className="pricing-typs">Number of adverts</div>
                      <div className="pricing-typs">Profile view</div>
                      <div className="pricing-typs">Contact credits</div>
                      <div className="pricing-typs">Direct chat</div>
                      <div className="pricing-typs">Premium jobs</div>
                      <div className="pricing-typs">Calling features</div>
                      <div className="pricing-typs">Video questioner</div>
                      <div className="pricing-typs">Add team members</div>
                      <div className="pricing-typs">Customer support</div>
                    </div>
                  </div>
                  {console.log("PACKAGES", packages)}

                  {packages?.map((p, i) => (
                    <div key={i} className="pricing-card">
                      <div className="pricing-header">
                        <div className="top-items-head">{p?.title}</div>
                        {p.amount == 0 && (
                          <div className="top-items-head">&nbsp;</div>
                        )}

                        {p.amount > 0 && (
                          <div className="top-items-head">
                            <Button
                              onClick={() => handleSelectPackage(p)}
                              themecolor="blue mx-auto mb-2 custom-button"
                            >
                              Select
                            </Button>
                          </div>
                        )}
                        <div className="top-items-head  color-blue">
                          <h4 className="amount">
                            £{p.amount}
                            <br></br>
                            <span className="save-upto">
                              {p.title === "Job bundle"
                                ? "Save £500"
                                : p.title === "Premium bundle"
                                ? "Save £1000"
                                : ""}
                            </span>
                          </h4>
                        </div>
                      </div>
                      <div className="pricing-items">
                        <div className="pricings">{p?.duration} days</div>
                        <div className="pricings">
                          {i === 0
                            ? `${p?.numberOfJob} per company`
                            : p?.numberOfJob}{" "}
                        </div>
                        <div className="pricings">
                          {p?.title === "Free adverts" ? "50" : "Unlimited"}
                        </div>
                        <div className="pricings">{p?.numberOfConnect}</div>
                        <div className="pricings">
                          {p.title === "Premium bundle" ? "2" : "0"}
                        </div>
                        <div className="pricings">
                          <FaCheckCircle className="check-icon" />
                        </div>
                        <div className="pricings">
                          <FaCheckCircle className="check-icon" />
                        </div>
                        <div className="pricings">
                          <FaCheckCircle className="check-icon" />
                        </div>
                        <div className="pricings">
                          <FaCheckCircle className="check-icon" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default React.memo(Pricing);
