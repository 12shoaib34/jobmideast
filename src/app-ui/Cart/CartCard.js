import { Divider, Empty } from "antd";
import Item from "antd/lib/list/Item";
import React, { useEffect, useState } from "react";
import {
  addToCart,
  selectCart,
  selectCards,
  selectIsCardsLoading,
} from "../../features/credits/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./CartCard.scss";
import Button from "../../shared-ui/Button/Button";
import CartItem from "./CartItem.js";
import { selectCompanyCountry } from "./../../features/auth/slice";

const CartCard = ({ onCheckOut, isUKCard }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const cards = useAppSelector(selectCards);
  const isCardLoading = useAppSelector(selectIsCardsLoading);
  const employerProfile = useAppSelector(selectCompanyCountry);
  const [totalAmount, setTotalAmount] = useState(0);
  const [forUKCards, setForUKCards] = useState(false);

  const checkCardIsOfUK = (cards) =>
    cards.some((card) => {
      if (
        card.id === isUKCard &&
        (card.country === "UK" || card.country === "GB")
      )
        return true;
      return false;
    });

  useEffect(() => {
    var totalAmount = cart.map((item) => item.quantity * item.amount);

    var addTotal = totalAmount.reduce(
      (accummulator, currentValue) => accummulator + currentValue,
      0
    );

    setTotalAmount(addTotal);
  }, [cart]);

  useEffect(() => {
    if (isCardLoading === false) {
      setForUKCards(checkCardIsOfUK(cards));
    }
  }, [isCardLoading]);

  return (
    <div className="cart-component">
      <img
        className="logo"
        src="/static/media/group-path-32.a65bc2fa.svg"
        alt=""
      />
      <div className="heading" id="credit-id">
        <div className="text">Shopping Cart</div>
      </div>

      <div className="overflow-container">
        {/* {!cart.find((item) => item.quantity > 0) && (
          <Empty description="Cart is empty" />
        )} */}
        {console.log("CARTS",cart)}
        {cart?.map((item, index) => (
          <>
            {item.quantity > 0 && (
              <>
                <CartItem
                  key={index}
                  packageId={item.id}
                  name={item.title}
                  type={item.type}
                />
                <Divider />
              </>
            )}
          </>
        ))}
      </div>
      <div className="buton-box">
        {Object.keys(employerProfile).length &&
          (employerProfile?.companyProfile?.country?.code === "UK" ||
            employerProfile?.companyProfile?.country?.code === "GB" ||
            forUKCards) && (
            <div className="vat">
              20% VAT(Value Added Tax) will be applied to companies, or
              cards/accounts registered in the United Kingdom.
            </div>
          )}

        <div className="buttons">
          <div className="total">Total: £{totalAmount}</div>

          <Button
            className="checkoutBtn"
            themecolor="blue"
            onClick={onCheckOut}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CartCard);
