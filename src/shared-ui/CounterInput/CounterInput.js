import { Input } from "antd";
import React from "react";
import Button from "../Button/Button";

const CounterInput = ({ inputValue, setValue, min = 1, max = 20 }) => {
  return (
    <>
      <Button
        onClick={
          inputValue > min
            ? () => setValue(inputValue - 1)
            : () => setValue(min)
        }
        className="rounded minus">
        -
      </Button>
      <Button
        onClick={
          inputValue <= max
            ? () => setValue(inputValue + 1)
            : () => setValue(max)
        }
        className="rounded plus">
        +
      </Button>
      <Input autoComplete={"off"} value={inputValue} />
    </>
  );
};

export default CounterInput;
