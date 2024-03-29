"use client";
import React from "react";
import { SelectProps } from "./props";

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  name,
  defaultProperty,
  className,
}) => {
  return (
    <div className={"w-full  md:pl-2 " + className ? className : "md:w-2/5"}>
      <label htmlFor="property-type" className="sr-only">
        Property Type
      </label>
      <select
        id="property-type"
        defaultValue={defaultProperty}
        name={name}
        onChange={onChange}
        className="w-full px-4 border py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
      >
        {options.map((v, i) => (
          <option key={v.label + i} value={v.value}>
            {v.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
