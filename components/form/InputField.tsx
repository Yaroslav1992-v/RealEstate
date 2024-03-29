import React from "react";
import { InputProps } from "./props";
import { ErrorMsg } from "../ErrorMsg";

const InputField: React.FC<InputProps> = ({
  onChange,
  placeholder,
  name,
  required = false,
  type = "text",
  label,
  className,
  value,
  error,
  onlyColor,
}) => {
  const renderInput = () => {
    return (
      <>
        <input
          type={type}
          id={name}
          name={name}
          className={
            "border rounded w-full py-2 px-3 mb-2 capitalize " +
            (error || onlyColor ? "border-red-500 mb-2" : "border-gray-300")
          }
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={onChange}
        />
        {error && <ErrorMsg text={error} />}
      </>
    );
  };

  if (label) {
    return (
      <div className={className ? className : "mb-4"}>
        <label
          htmlFor={name}
          className={
            (type === "number"
              ? "mr-2 text-gray-800 "
              : "text-gray-700 font-bold ") + "block capitalize mb-2"
          }
        >
          {label}
        </label>
        {renderInput()}
      </div>
    );
  } else return renderInput();
};

export default InputField;
