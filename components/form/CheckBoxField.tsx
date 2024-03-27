import React from "react";
import { CheckBoxProps } from "./props";

const CheckBoxField: React.FC<CheckBoxProps> = ({
  name,
  onChange,
  value,
  checked,
  label,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        className="mr-2"
        checked={checked}
      />
      <label className="capitalize" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default CheckBoxField;
