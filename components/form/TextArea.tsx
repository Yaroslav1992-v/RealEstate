import React from "react";
import { TextAreaProps } from "./props";

const TextArea: React.FC<TextAreaProps> = ({
  label,
  onChange,
  placeholder,
  value,
  name,
  rows,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <textarea
        onChange={onChange}
        id={name}
        name={name}
        className="border rounded w-full py-2 px-3"
        rows={rows}
        value={value}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default TextArea;
