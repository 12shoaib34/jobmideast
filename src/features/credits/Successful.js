import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  emptyCart,
  selectCart,
  defaultBuyCartSuccess,
  selectPackageBoughtAmount,
} from "./slice";
import Button from "./../../shared-ui/Button/Button";
const Successfull = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const packageBoughtAmount = useAppSelector(selectPackageBoughtAmount);

  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    console.log("amount from backend", packageBoughtAmount);
  }, [packageBoughtAmount]);
  useEffect(() => {
    return () => {
      dispatch(emptyCart());
      dispatch(defaultBuyCartSuccess());
      // history.push("/credits");
    };
  }, []);

  useEffect(() => {
    //var totalAmount = cart.map((item) => item.quantity * item.amount);
    // var addTotal = totalAmount.reduce(
    //   (accummulator, currentValue) => accummulator + currentValue,
    //   0
    // );
    // setTotalAmount(addTotal);
    packageBoughtAmount && setTotalAmount(packageBoughtAmount.Amount);
  }, [cart]);
  return (
    <div className="main-div-success ">
      <div className="box">
        <div className="top">
          <div className="in-line">
            <img
              className="check-icon"
              src={require("../../assets/images/icons/check-icon.svg")}
            />{" "}
            <p>
              Your payment has been Successful. Your order has now been added to
              your profile.
            </p>
          </div>
        </div>
        <div className="px-3 d-flex w-100 justify-content-between">
          <h1 style={{ fontFamily: `Gordita-bold` }}>Order summary:</h1>
          {/* <h1>Quantity</h1> */}
        </div>
        {console.log("bought cart", cart)}
        {cart?.map((item) => (
          <>
            {item.quantity > 0 && (
              <div className="px-3 d-flex w-100 justify-content-between">
                <p>{item.title} </p>
                <p>{item.quantity}</p>
              </div>
            )}
          </>
        ))}
        {packageBoughtAmount?.VAT ? (
          <div className="px-3 d-flex w-100 justify-content-between">
            <p>VAT </p>
            <p>£{packageBoughtAmount?.VAT}</p>
          </div>
        ) : null}

        <div className="px-3 d-flex w-100 justify-content-between">
          <p style={{ fontFamily: `Gordita-bold` }}>Total:</p>
          <p>&#xa3;{totalAmount}</p>
        </div>
        <p style={{ fontSize: "11px" }}>
          We Will send you an email confirmation with your order details
          attached. Alternatively you can download your transaction by going to{" "}
          <strong>My credits</strong> and click on <strong>Transactions</strong>
        </p>
        <div
          className="flex go-to-my-jobs"
          onClick={() => {
            history.push("/my-jobs");
          }}>
          <Button themecolor="outlined-green ">Go to my jobs</Button>
        </div>
      </div>
    </div>
  );
};
export default Successfull;
