import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CartCard from "../../app-ui/Cart/CartCard";
import ConnectionCredits from "./ConnectionCredits";
import Interviews from "./Interviews";
import Pricing from "./Pricing";
// import "./_Credits.scss";
import { getCounter } from "../dashboard/thunk";
import { selectCounter } from "../dashboard/slice";
import { Divider, Col, Row } from "antd";
import "./_Credits.scss";
import "./_Responsive.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FaCloudDownloadAlt } from "react-icons/fa";
import PaymentMethod from "./PaymentMethod";
import Successfull from "./Successful";
import { showSuccessMessage, showWarningMessage } from "../../utils/message";
import { emptyCart, selectCart, selectCartBuySuccess, selectCards, defaultBuyCartSuccess } from "./slice";
import { buyCart } from "./thunk";
import { selectEmployerProfile } from "./../auth/slice";
import { getTransactionHistoryDownload } from "../auth/thunk";

const Credits = ({ location: { noAddOns = false } }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const myRef = useRef(null);
  const history = useHistory();
  const cart = useAppSelector(selectCart);
  const buyCartSuccess = useAppSelector(selectCartBuySuccess);
  const cards = useAppSelector(selectCards);
  const { user } = useAppSelector(selectEmployerProfile);
  // const [showCardModal, setShowCardModal] = useState(false);
  const counter = useAppSelector(selectCounter);
  const dispatch = useAppDispatch();
  const [paymentSteps, setPaymentSteps] = useState(0);
  const [isUKCard, setIsUKCard] = useState("");

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_KEY ||
      "pk_test_51IsNBCHAwOqzN7PCEt9958UfKd21qeMySH5N1tM8YhxNLp3H6zYJ7ilRX5xVoZGOVKKlpP2n7zWl3IE0lSbUFu6g00APrSDkcZ"
  );

  const executeScroll = () =>
    setTimeout(
      () =>
        myRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "center",
        }),
      150
    );
  useEffect(() => {
    window.$crisp.push(["do", "chat:hide"]);
    // window.$crisp.push(["do", "chat:hide"]);
  }, []);

  useEffect(() => {
    dispatch(getCounter());
    dispatch(getTransactionHistoryDownload());
  }, []);

  useEffect(() => {
    if (buyCartSuccess) {
      showSuccessMessage("Package bought");
      dispatch(getCounter());
      history.push("/successful");
    }
  }, [buyCartSuccess]);

  const repeatIdByQuantity = (payload) => {
    const newArray = payload.map((item) => {
      var arr = [];
      for (let i = 0; i < item.quantity; i++) {
        arr.push(item.id);
      }
      return arr;
    });
    return newArray.flat(1);
  };

  const onCheckOut = () => {
    if (paymentSteps === 0 && cart.find((item) => item.quantity > 0)) {
      setPaymentSteps(1);
    } else if (paymentSteps === 0 && !cart.find((item) => item.quantity > 0)) {
      showWarningMessage("Cart is empty");
      return;
    }
    if (cards.length > 0 && paymentSteps === 1 && cart.find((item) => item.quantity > 0)) {
      const cartPayload = cart.filter((item) => item.quantity != 0);
      const payloadForPackage = cartPayload.filter((item) => item.type === "package");
      const payloadForAddOns = cartPayload.filter((item) => item.type === "addOn");
      const packages = repeatIdByQuantity(payloadForPackage);
      const addOns = repeatIdByQuantity(payloadForAddOns);
      const payload = { Packages: packages, Connects: addOns };
      document.querySelector(".checkoutBtn").disabled = true;
      document.querySelector(".checkoutBtn").style.background = "#5271ff";
      dispatch(buyCart({ payload }));
    } else if (cards.length == 0 && paymentSteps === 1) {
      showWarningMessage("Your card is empty");
    }
  };

  const Switch = () => {
    switch (paymentSteps) {
      case 1:
        return (
          <Elements stripe={stripePromise}>
            <PaymentMethod setIsUKCard={setIsUKCard} onBack={() => setPaymentSteps(0)} />
          </Elements>
        );
      case 2:
        return <Successfull />;
    }
  };
  return (
    <div className="credits">
      <Row justify={"space-between"}>
        <Col xl={14} lg={15} md={24} className="wrapper">
          {paymentSteps === 0 && <Pricing myRef={myRef} />}

          {Switch(paymentSteps)}
        </Col>
        <Col xl={8} lg={9} md={24} className="wrapper-carding">
          <div className="right-display">
            <div className="job-credits-container">
              <div className="job-credits-items">
                <h5>{counter?.jobCredits}</h5>
                <p>Job credits</p>
              </div>
              <Divider
                type="vertical"
                style={{
                  margin: 0,
                  marginBottom: 10,
                  height: 45,
                  borderLeft: "1px solid rgba(0, 0, 0, 0.5)",
                }}
              />
              <div className="job-credits-items">
                <h5>{counter?.contactCredits}</h5>
                <p>Contact credits</p>
              </div>
              <Divider
                type="vertical"
                style={{
                  margin: 0,
                  marginBottom: 10,
                  height: 45,
                  borderLeft: "1px solid rgba(0, 0, 0, 0.5)",
                }}
              />
              <div className="job-credits-items">
                <a href={`${baseURL}/employer-transaction-history/download-pdf/${user?.shareProfileId}`} target="_blank">
                  <div className="download-img">
                    <FaCloudDownloadAlt />
                  </div>
                  <p>Transactions</p>
                </a>
              </div>
            </div>
          </div>
          <CartCard isUKCard={isUKCard} onCheckOut={onCheckOut} />
        </Col>
      </Row>

      {paymentSteps === 0 && (
        <>
          <ConnectionCredits
            noAddOns={noAddOns}
            // setShowCardModal={setShowCardModal}
            scroll={executeScroll}
          />

          <Interviews />
        </>
      )}
    </div>
  );
};

export default Credits;
