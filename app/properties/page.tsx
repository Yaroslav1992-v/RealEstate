import React from "react";
import PropertyCard from "@/components/PropertyCard";
import { fethProperties } from "@/utils/request";
import SearchForm from "@/components/form/SearchForm";

const PropertiesPage = async () => {
  const properties = await fethProperties();
  if (!properties) {
    return <p>no properties</p>;
  }
  properties.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <SearchForm />
        </div>
      </section>
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
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;
