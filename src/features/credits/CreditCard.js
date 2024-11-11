import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Cards from "react-credit-cards";
import { Button, Divider, Input, Form, Spin } from "antd";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import SharedButton from "../../shared-ui/Button/Button";
import { showErrorMessage, showWarningMessage } from "../../utils/message";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { buyAddOns, buyPackage, getTransactionHistory } from "./thunk";
import { selectError, selectStatus, selectTransactionHistory } from "./slice";
import { readableDateCredits, readableShortDate } from "../../utils/helper";
import {
  selectEmployerProfile,
  selectIsAdmin,
  selectIsMainAdmin,
} from "./../auth/slice";
import { removeStripe } from "./service";
import { getEmployerProfle } from "../auth/thunk";

// useEffect( async () => {
//   try {

//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.setContent(pdfOutput);
//     await page.emulateMedia("screen");
//     await page.pdf({
//       path: "routes/planiton/pdf/mypdf.pdf",
//       format: "A4",
//       printBackground: true
//     });

//     console.log('done');
//     await browser.close();
//     //process.exit();

//   } catch (e) {
//     console.log("Our Error", e)
//   }
// },[])

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      // color: "#fff",
      fontSize: "13px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#c9c9c9",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

// 2323 2323 2323 2327
const PricingCard = ({
  selectedPackage,
  selectedAddOn,
  transactionHistory,
  onCheckout,
}) => {
  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [card, setCardData] = useState({});
  const [isCardFormVisible, setCardFormVisible] = useState(false);
  const [isCardCreateLoading, setCardCreateLoading] = useState(false);
  // const transactionHistory = useAppSelector(selectTransactionHistory);
  const errorMessage = useAppSelector(selectError);
  const isLoading = useAppSelector(selectStatus);
  const { user, companyProfile } = useAppSelector(selectEmployerProfile);
  const isMainAdmin = useAppSelector(selectIsMainAdmin);
  const isAdmin = useAppSelector(selectIsAdmin);
  const baseURL = process.env.REACT_APP_BASE_URL;

  const onFinish = async (values) => {
    if (!values.name) {
      showWarningMessage("Please enter name");
      return;
    }
    if (!card.elementType) {
      showWarningMessage("Please add card details");
      return;
    }
    if (card.error) {
      showWarningMessage(card.error.message);
      return;
    }
    if (!selectedPackage && !selectedAddOn) {
      showWarningMessage("No package Selected");
      return;
    }

    try {
      setCardCreateLoading(true);
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: values.name,
      });

      const stripeToken = stripeResponse.token.id;
      if (selectedPackage) {
        const payload = { stripeToken };
        await dispatch(
          buyPackage({ id: selectedPackage?.id, payload: payload })
        );
        dispatch(getEmployerProfle());
      } else {
        const payload = { stripeToken };
        await dispatch(buyAddOns({ id: selectedAddOn?.id, payload: payload }));
        dispatch(getEmployerProfle());
      }

      setCardFormVisible(false);
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      setCardCreateLoading(false);
    }
  };

  const purchase = () => {
    if (!selectedPackage && !selectedAddOn) {
      showWarningMessage("No package Selected");
      return;
    }

    try {
      setCardCreateLoading(true);

      if (selectedPackage) {
        const payload = {};
        dispatch(buyPackage({ id: selectedPackage?.id, payload: payload }));
      } else {
        const payload = {};
        dispatch(buyAddOns({ id: selectedAddOn?.id, payload: payload }));
      }

      setCardFormVisible(false);
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      setCardCreateLoading(false);
    }
  };

  const removeCard = () => {
    removeStripe().then((res) => {
      console.log("Card removed : ", res);
      dispatch(getEmployerProfle());
    });
  };

  const onCardFieldsChange = (data) => {
    setCardData({ ...card, ...data });
  };
  const onNameChange = (e) => {
    const name = e.target.value;
    if (name) {
      setCardData({ ...card, name });
    }
  };

  return (
    <div className="pricing-card">
      <div className="credit-card-section">
        <div className="heading">
          <div className="text">Shopping Cart</div>
          <img
            class="tag"
            src="/static/media/group-path-32.a65bc2fa.svg"
            alt=""
          />
        </div>

        <div className="overflow-container">
          <div className="second-box">
            <div>
              <div className="sub-heading">
                <div>
                  <span>X</span> Standard Ad
                </div>
                <div className="right-text">
                  <div className="input-box">
                    <button>-</button>
                    <input value="2" />
                    <button>+</button>
                  </div>
                </div>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              recusandae distinctio, corporis voluptas impedit soluta veniam,
              numquam nulla libero quod culpa
            </p>
          </div>

          <div className="second-box">
            <div>
              <div className="sub-heading">
                <div>
                  <span>X</span> Additional Credits
                </div>
                <div className="right-text">
                  <span>10</span>
                </div>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              recusandae distinctio, corporis voluptas impedit soluta veniam,
              numquam nulla libero quod culpa
            </p>
          </div>
        </div>
        <div className="buton-box">
          <div className="buttons">
            <div className="total">Total: ₤750</div>
            {/* <Link to="/payment-method"> */}
            <button onClick={onCheckout}>
              <a href="#credit-id">Checkout</a>
            </button>
            {/* </Link> */}
          </div>
        </div>
        {/* <div className="credit-header">Card registered</div>

        <div className="credit-card">
          <div id="PaymentForm">
            <Cards
              preview={true}
              name={card.name}
              issuer={card.brand}
              number=""
              expiry=""
              cvc=""
            />
          </div>
        </div> */}

        {/* <div
          style={{ fontSize: "12px", marginTop: "15px", textAlign: "center" }}>
          {" "}
          {selectedPackage ? (
            <>
              <span>You are buying: &nbsp;</span>
              <span
                className="mt-3"
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                  color: "#5271FF",
                }}>
                {selectedPackage ? selectedPackage?.numberOfConnect : ""}{" "}
                Connects in {selectedPackage ? selectedPackage?.title : ""}
              </span>
            </>
          ) : null}
          {selectedAddOn ? (
            <span
              className="mt-3"
              style={{ fontSize: "12px", textAlign: "center" }}>
              Number of Connects:
              {selectedAddOn ? selectedAddOn?.title : ""}
            </span>
          ) : null}
        </div>
        <div className="add-card-container">
          <div>
            {companyProfile?.stripeId && (isAdmin || isMainAdmin) && (
              <SharedButton themecolor="red" onClick={removeCard}>
                Remove
              </SharedButton>
            )}
          </div>
          <div>
            {(isAdmin || isMainAdmin) && (
              <Button
                type="link"
                className="add-btn"
                onClick={() => setCardFormVisible(true)}>
                Add a new card
              </Button>
            )}
          </div>
        </div>

        <Divider
          type="horizontal"
          style={{ marginTop: 20, marginBottom: 0, height: 20 }}
        />

        {isCardFormVisible && (
          <Spin spinning={isCardCreateLoading}>
            <div className="credit-card-inputs">
              <Form onFinish={onFinish}>
                <Form.Item name="name" className="c-input w-100 pr-2">
                  <Input
                    autoComplete={"" + Math.random()}
                    className="ant-input-w100"
                    placeholder="Enter Your Name"
                    onChange={onNameChange}
                  />
                </Form.Item>
                <div className="stripe-card">
                  <CardElement
                    options={CARD_OPTIONS}
                    onChange={onCardFieldsChange}
                  />
                </div>
                <SharedButton className="float-right" htmlType="submit">
                  Purchase
                </SharedButton>
              </Form>
            </div>
          </Spin>
        )}
        {companyProfile?.stripeId &&
          !isCardFormVisible &&
          (selectedPackage || selectedAddOn) && (
            <Spin spinning={isCardCreateLoading}>
              <div className="credit-card-inputs">
                <Form onFinish={purchase}>
                  <SharedButton className="float-right" htmlType="submit">
                    Purchase
                  </SharedButton>
                </Form>
              </div>
            </Spin>
          )}
      </div>

      <div className="history-section">
        <div className="history-heading">
          <p>Transaction History</p>
        </div>

        <div className="table">
          <div className="labels">
            <span className="labels-items">Date</span>
            <Divider type="vertical" style={{ margin: 0, height: 20 }} />
            <span className="labels-items">Amount</span>
            <Divider type="vertical" style={{ margin: 0, height: 20 }} />
            <span className="labels-items">Services</span>
            <Divider type="vertical" style={{ margin: 0, height: 20 }} />
            <span className="labels-items">VAT</span>
          </div>
          <div className="items">
            {transactionHistory?.map((d) => (
              <div className="d-flex justify-content-between">
                <span className="labels-items">
                  {readableDateCredits(d?.date)}
                </span>
                <span className="labels-items">{d?.amount} &nbsp; GBP</span>
                <span className="labels-items">{d?.serviceName}</span>
                <span className="labels-items">{d?.vat}</span>
                <br />
              </div>
            ))}
          </div>
        </div>

        <Divider />

        <div className="download-transaction-section">
          <a
            href={`${baseURL}/employer-transaction-history/download-pdf/${user?.shareProfileId}`}
            target="_blank">
            <div className="download-container">
              <div className="transaction-icon">
                <FaCloudDownloadAlt />
              </div>
              <p>Download transactions</p>
            </div>
          </a>
          <a
            href={`${baseURL}/employer-transaction-history/print-pdf/${user?.shareProfileId}`}
            target="_blank">
            <div className="print-container">
              <div className="transaction-icon">
                <FaCloudDownloadAlt />
              </div>
              <p>Print transactions</p>
            </div>
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default PricingCard;
