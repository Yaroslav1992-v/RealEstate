import { Property } from "@/props";
import React from "react";
import PropertyDetailts from "./PropertyDetailts";
import PropertyAside from "./PropertyAside";

const PropertyC: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <div className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <PropertyDetailts property={property} />
          <PropertyAside property={property} />
        </div>
      </div>
    </div>
  );
};

export default PropertyC;
