import React from "react";

interface QuantityProps {
  value: number;
  minQuantity: number;
  onChange: (newValue: number) => void;
}

const Quantity = ({ value, minQuantity, onChange }: QuantityProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
};

export default Quantity;
