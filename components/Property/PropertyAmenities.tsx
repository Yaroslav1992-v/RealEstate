import React from "react";
import { FaCheck } from "react-icons/fa";

const PropertyAmenities: React.FC<{ items: string[] }> = ({ items }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
      {items.map((item, i) => (
        <li key={i}>
          <FaCheck className="inline-block text-green-600 mr-2  " />
          {item}
        </li>
      ))}
    </ul>
  );
};

export default PropertyAmenities;
