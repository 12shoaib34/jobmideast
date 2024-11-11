import React, { useEffect, useState } from "react";

import CounterInput from "../../shared-ui/CounterInput/CounterInput";
import { Form } from "antd";
import * as rules from "../../utils/rules";
import { useAppDispatch } from "../../store/hooks";
import { changeQuantities } from "../../features/credits/slice";

const CartItem = ({ name = "Standard Ad", type = "package", packageId }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (quantity || quantity === 0) {
      const payload = { id: packageId, quantity, type };
      // console.log(payload, "payload payload payload");
      dispatch(changeQuantities(payload));
    }
  }, [quantity]);

  const removeFromCart = () => {
    const payload = { id: packageId, quantity: 0, type };
    dispatch(changeQuantities(payload));
  };

  return (
    <div className="second-box cart-item">
      <div>
        <div className="sub-heading">
          <div>
            <span className="cross-icon" onClick={removeFromCart}>
              x
            </span>{" "}
            {name}
          </div>
          <div className="right-text">
            <Form.Item
              name="id"
              rules={rules.requiredRule}
              className="c-input counter counter-input">
              <CounterInput
                min={0}
                max={20}
                setValue={setQuantity}
                inputValue={quantity}
              />
            </Form.Item>
          </div>
        </div>
      </div>
      <p>
        {type === "package"
          ? "Ads will expire in 30 days once they have been posted. You can purchase multiple ads at once and use them as and when needed."
          : "Additional credits can be used at any time by, any member of your team, and will apply to any job. Additional credits allow you to connect with more candidates."}
      </p>
    </div>
  );
};

export default CartItem;
