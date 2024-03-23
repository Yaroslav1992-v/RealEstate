import { Property } from "@/props";
import React from "react";
import PropertyApartment from "./PropertyApartment";
import PropertyDescription from "./PropertyDescription";
import PropertyAmenities from "./PropertyAmenities";

const PropertyDetailts: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <div>
      <PropertyApartment
        name={property.name}
        type={property.type}
        location={property.location}
        rates={property.rates}
      />
      <PropertyDescription
        baths={property.baths}
        beds={property.beds}
        sqft={property.square_feet}
        desc={property.description}
      />

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Amenities</h3>
        {<PropertyAmenities items={property.amenities} />}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <div id="map"></div>
      </div>
    </div>
  );
};

export default PropertyDetailts;
