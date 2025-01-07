import React, { useState } from "react";
import styled from "styled-components";

export const QuantityWrapper = styled.div<{ $isError: boolean }>`
  width: fit-content;
  min-width: 5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  transition: all 0.3s;
  z-index: 2;

  p {
    color: ${(props) =>
      props.$isError ? props.theme.colors.orange : props.theme.colors.gray};
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5rem;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }

  input {
    display: flex;
    max-width: fit-content;
    width: 4.5625rem;
    padding: 0.5rem 0rem;
    justify-content: center;
    align-items: center;
    border-radius: 0.3125rem;
    border: none;
    text-align: center;
  }

  .error {
    position: absolute;
    width: 16rem;
    bottom: -1.2rem;
    right: 0;

    text-align: right;

    opacity: ${(props) => (props.$isError ? 1 : 0)};
  }
`;

interface QuantityProps {
  value: number;
  minQuantity: number;
  title: string;
  error: string;
  onChange: (newValue: number) => void;
}

const Quantity = ({
  value,
  minQuantity,
  title,
  error,
  onChange,
}: QuantityProps) => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/^0+/, "");

    if (inputValue === "") {
      onChange(0);
      setIsError(false);
      return;
    }

    const newValue = parseInt(inputValue, 10);
    console.log("newValue", newValue);

    if (isNaN(newValue)) {
      return;
    }

    setIsError(newValue < minQuantity);
    onChange(newValue);
  };

  const handleBlur = () => {
    if (value < minQuantity) {
      setIsError(true);
      onChange(minQuantity);
    } else {
      setIsError(false);
    }
  };

  return (
    <QuantityWrapper $isError={isError}>
      <p>{title}</p>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <p className="error">
        {error}
        {minQuantity}
      </p>
    </QuantityWrapper>
  );
};

export default Quantity;
