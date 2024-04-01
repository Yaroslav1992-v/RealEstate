import React from "react";

import SearchForm from "@/components/form/SearchForm";
import Properties from "@/components/Property/Properties";

const PropertiesPage = async () => {
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <SearchForm />
        </div>
      </section>
      <Properties />
    </>
  );
};

export default PropertiesPage;
