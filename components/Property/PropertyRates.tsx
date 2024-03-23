import React from "react";
import { FaTimes } from "react-icons/fa";
interface PropertyRatesProps {
  type: string;
  amount?: number;
}
const PropertyRates: React.FC<PropertyRatesProps> = ({ type, amount }) => {
  return (
    <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
      <div className="flex items-center">
        <div className="text-gray-500 mr-2 font-bold capitalize"> {type}</div>

        {amount ? (
          <div className="text-2xl font-bold text-blue-500">${amount}</div>
        ) : (
          <div className="text-2xl font-bold">
            <FaTimes className="text-red-700"></FaTimes>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyRates;
