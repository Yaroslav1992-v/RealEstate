import React from "react";
import { SelectProps } from "./props";

const Select: React.FC<SelectProps> = ({ values }) => {
  return (
    <div className="w-full md:w-2/5 md:pl-2">
      <label htmlFor="property-type" className="sr-only">
        Property Type
      </label>
      <select
        id="property-type"
        className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
      >
        {values.map((v, i) => (
          <option key={v+i} value={v}>
           {v}
          </option>
        ))}

      </select>
    </div>
  );
};

export default Select;
