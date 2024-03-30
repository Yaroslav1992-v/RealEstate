"use client";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { Property } from "@/props";
import bookmarkService from "@/services/bookmarkService";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await bookmarkService.fetchBookMarks();
        console.log(res);
        if (res) {
          setProperties(res);
        }
      } catch (error) {
        toast.error("Failed to fetch saved properties");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProperties();
  }, []);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <h1 className="text-2xl mb-4">Saved Properties</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No Saved Properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
