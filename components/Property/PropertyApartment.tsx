import { Rates, Location } from "@/props";
import React from "react";
import { FaMapMarker } from "react-icons/fa";
import PropertyRates from "./PropertyRates";
interface PropertyApartmentProps {
  location: Location;
  rates: Rates;
  name: string;
  type: string;
}
const PropertyApartment: React.FC<PropertyApartmentProps> = ({
  location,
  rates,
  type,
  name,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
      <div className="text-gray-500 mb-4">{type}</div>
      <h1 className="text-3xl font-bold mb-4">{name}</h1>
      <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
        <FaMapMarker className="text-lg text-orange-700 mr-2"></FaMapMarker>
        <p className="text-orange-700">
          {location.street}, {location.city}, {location.state}
        </p>
      </div>

      <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
        Rates & Options
      </h3>
      <div className="flex flex-col md:flex-row justify-around">
        <PropertyRates type={"Monthly"} amount={rates.monthly} />
        <PropertyRates type={"Nightly"} amount={rates.nightly} />
        <PropertyRates type={"Weekly"} amount={rates.weekly} />
      </div>
    </div>
  );
};

export default PropertyApartment;
