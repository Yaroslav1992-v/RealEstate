import React from "react";
import { FaBath, FaBed, FaRulerCombined } from "react-icons/fa";
interface PropertyDescriptionProps {
  beds: number;
  baths: number;
  sqft: number;
  desc: string;
}
const PropertyDescription: React.FC<PropertyDescriptionProps> = ({
  beds,
  baths,
  sqft,
  desc,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-bold mb-6">Description & Details</h3>
      <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
        <div className="flex items-center">
          <FaBed className="inline-block mr-2" /> {beds}{" "}
          <span className="hidden sm:inline">Beds</span>
        </div>
        <div className="flex items-center">
          <FaBath className="inline-block mr-2" /> {baths}{" "}
          <span className="hidden sm:inline">Baths</span>
        </div>
        <div className="flex items-center">
          <FaRulerCombined className="inline-block mr-2" />
          {sqft} <span className="hidden sm:inline">sqft</span>
        </div>
      </div>
      <p className="text-gray-500 mb-4 text-center">{desc}</p>
    </div>
  );
};

export default PropertyDescription;
