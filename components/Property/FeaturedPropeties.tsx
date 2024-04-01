"use client";
import { Property } from "@/props";
import propertyService from "@/services/propertyService";
import React, { useEffect, useState } from "react";
import PropertyCard from "../PropertyCard";

const FeaturedPropeties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await propertyService.loadFeaturedProperties();
        if (res) {
          setProperties(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProperties();
  }, []);
  console.log(properties);
  return (
    properties.length > 0 && (
      <section className="bg-blue-50 px-4 pt-6 pb-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((p) => (
              <PropertyCard key={p._id} property={p} featured />
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default FeaturedPropeties;
