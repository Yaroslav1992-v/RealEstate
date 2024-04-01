"use client";
import React, { useEffect, useState } from "react";
import { Property } from "@/props";
import Spinner from "@/components/Spinner";
import propertyService from "@/services/propertyService";
import PropertyCard from "@/components/PropertyCard";
import Pagination from "../Pagination";
const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [totatalItems, setTotatalItems] = useState<number>(3);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await propertyService.fetchProperties(page, pageSize);
        if (!res) {
          throw new Error("failed to fetch data");
        }
        setProperties(res.properties);
        setTotatalItems(res.total);
      } catch (e) {
        throw new Error("failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, pageSize]);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No Properties Found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        )}
        <Pagination
          onPageChange={handlePageChange}
          page={page}
          pageSize={pageSize}
          totalItems={totatalItems}
        />
      </div>
    </section>
  );
};

export default Properties;
