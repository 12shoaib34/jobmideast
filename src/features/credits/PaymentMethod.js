import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { Col, Row, Spin } from "antd";
import { Radio, Checkbox, Form, Input } from "antd";
import CardNumberComponent from "../../shared-ui/CardNumberComponent/CardNumberComponent";
import Button from "../../shared-ui/Button/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addCard,
  deleteCard,
  getCards,
  getPaymentDetails,
  setDefaultCard,
} from "./thunk";
import {
  selectAddCardSuccess,
  selectCardDeleteSuccess,
  selectCards,
  selectIsCardsLoading,
  selectPaymentDetails,
} from "./slice";
import * as rules from "../../utils/rules";
import { showWarningMessage } from "../../utils/message";

const PaymentMethod = ({ onBack, setIsUKCard }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const [cardList] = Form.useForm();

  const cards = useAppSelector(selectCards);
  const isCardsLoading = useAppSelector(selectIsCardsLoading);
  const cardDeleteSuccess = useAppSelector(selectCardDeleteSuccess);
  const addCardSuccess = useAppSelector(selectAddCardSuccess);
  const paymentDetails = useAppSelector(selectPaymentDetails);

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [addNewCard, setaddNewCard] = useState(false);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [cardData, setCardData] = useState({});
  const [defaultPayment, setDefaultPayment] = useState(false);

  const cardStyle = {
    hidePostalCode: true,
    style: {
      base: {
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        fontSize: "12px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleDeleteCard = () => {
    const payload = cardList.getFieldsValue();
    dispatch(deleteCard({ payload }));
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : null);
    setCardData({ ...cardData, ...event });
  };

  useEffect(() => {
    if (paymentDetails) {
      const card = paymentDetails.default_source;
      cardList.setFieldsValue({ card });
    }
  }, [paymentDetails]);

  useEffect(() => {
    dispatch(getCards());
    dispatch(getPaymentDetails());
  }, [dispatch]);

  useEffect(() => {
    if (cardDeleteSuccess) {
      dispatch(getCards());
      setaddNewCard(false);
    }
  }, [cardDeleteSuccess]);

  useEffect(() => {
    if (addCardSuccess) {
      dispatch(getCards());
      setaddNewCard(false);
    }
  }, [addCardSuccess]);

  const handleAddCardSubmit = async (values) => {
    if (cardData.empty) {
      showWarningMessage("enter card details first");
      return;
    }
    document.querySelector("#add-card-btn").disabled = true;
    if (cardData.complete) {
      const cardElement = elements.getElement(CardElement);
      setProcessing(true);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: values.name,
      });
      const stripeToken = stripeResponse.token.id;
      const payload = {
        token: stripeToken,
        setDefault: values.setDefault ? values.setDefault : false,
      };
      dispatch(addCard({ payload }));
    }
  };

  const handleDefaultCard = (e) => {
    setIsUKCard(e?.card);
    const payload = e;
    dispatch(setDefaultCard({ payload }));
  };

  return (
    <Row className="payment-method">
      <div className="top-header">
        <div className="back-button mr-2">
          <img
            onClick={onBack}
            src={require("../../assets/images/icons/Back-white.svg")}
            alt=""
          />
        </div>
        <div className="heading-section">
          <div className="left-side">
            <p>Payment Method</p>
          </div>
        </div>
      </div>
      <Col span={24} className="flexes">
        <div className="content-left">
          <div className="field-width">
            <Spin spinning={isCardsLoading}>
              <Form form={cardList} onValuesChange={handleDefaultCard}>
                <Form.Item name="card">
                  <Radio.Group>
                    {cards?.map((card) => (
                      <CardNumberComponent
                        cardId={card.id}
                        cardNumber={card.last4}
                      />
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Spin>
            <div className="new-card">
              {cards.length < 5 && (
                <button
                  style={{ color: "#5271FF", fontSize: "12px" }}
                  onClick={() => setaddNewCard(true)}
                  // themecolor="transparent blue pl-0"
                >
                  Add new Card +
                </button>
              )}
              <div className="remove-card">
                {cards.length > 0 && (
                  <button
                    style={{ fontSize: "12px" }}
                    onClick={handleDeleteCard}
                    // themecolor="transparent red px-0"
                  >
                    Remove Card
                  </button>
                )}
                {/* <Button themecolor="light">Use Selected Card</Button> */}
              </div>
            </div>
            {addNewCard && (
              <Form
                className="pay-form"
                onFinish={handleAddCardSubmit}
                layout="vertical">
                <Form.Item
                  required
                  rules={rules.nameRule}
                  name="name"
                  className="c-input pb-3"
                  label="Name on card">
                  <Input autoComplete={"off"} />
                </Form.Item>

                <div className="c-input-credit-card">
                  <CardElement
                    id="card-element"
                    options={cardStyle}
                    onChange={handleChange}
                  />
                </div>

                <Form.Item name="setDefault" valuePropName="checked">
                  <Checkbox className="chkbox">
                    Set as default payment method
                  </Checkbox>
                </Form.Item>

                <div style={{ textAlign: "end" }}>
                  <button
                    id="add-card-btn"
                    htmlType="submit"
                    style={{ fontSize: "12px", color: "#e53262" }}>
                    Add Card
                  </button>
                </div>
              </Form>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default PaymentMethod;
