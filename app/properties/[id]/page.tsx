"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/request";
import { Property } from "@/props";
import PropertyHeaderImage from "@/components/Property/PropertyHeaderImage";
import GoBack from "@/components/GoBack";
import PropertyC from "@/components/Property/Property";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/Property/PropertyImages";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) {
        return;
      }
      try {
        const property = await fetchProperty(
          typeof id === "string" ? id : id[0]
        );
        setProperty(property);
      } catch (error) {
        console.log("fetch error", error);
      } finally {
        setLoading(false);
      }
    };
    if (!property) {
      fetchPropertyData();
    }
  }, [id, property]);
  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }
  return (
    <>
      {loading && <Spinner loading={loading} />}
      {property && !loading && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <GoBack href="/properties" text="Back to Properties" />
          <PropertyC property={property} />
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
