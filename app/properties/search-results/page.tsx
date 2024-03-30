"use client";
import GoBack from "@/components/GoBack";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import SearchForm from "@/components/form/SearchForm";
import { Property } from "@/props";
import propertyService from "@/services/propertyService";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const SearchResults = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (location && propertyType) {
          const res = await propertyService.searchProperties(
            location,
            propertyType
          );
          res ? setProperties(res) : setProperties([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);
  console.log(properties);
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <SearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <GoBack href="/properties" text="Back To Properties" />
            <h1 className="text-2xl mb-4">Search Results</h1>
            {properties.length === 0 ? (
              <p>No Search Results Found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((p) => (
                  <PropertyCard key={p._id} property={p} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SearchResults;
