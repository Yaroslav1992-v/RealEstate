"use client";
import React, { useState } from "react";
import Select from "./Select";
import { useRouter } from "next/navigation";
const options = [
  { value: "All", label: "All" },
  { value: "Apartment", label: "Apartment" },
  { value: "Studio", label: "Studio" },
  { value: "Condo", label: "Condo" },
  { value: "House", label: "House" },
  { value: "Cabin or Cottage", label: "Cabin or Cottage" },
  { value: "Loft", label: "Loft" },
  { value: "Room", label: "Room" },
  { value: "Other", label: "Other" },
];
const SearchForm = () => {
  const [location, setLocation] = useState<string>("");
  const [propertyType, setPropertyType] = useState(options[0].value);
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (location === "" && propertyType === "All") {
      router.push("/properties");
    } else {
      const query = `?location=${location}&propertyType=${propertyType}`;
      router.push(`/properties/search-results${query}`);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          id="location"
          placeholder="Enter Keywors or Location"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <Select
        options={options}
        name={"property"}
        defaultProperty={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
      />
      <button
        type="submit"
        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
