"use client";
import { Property, amenities, propertyWithId } from "@/props";
import React, { ChangeEvent, useEffect, useState } from "react";
import Select from "./Select";
import { propertyTypes } from "./props";
import InputField from "./InputField";
import TextArea from "./TextArea";
import CheckBoxField from "./CheckBoxField";
import { useRouter, useParams } from "next/navigation";
import propertyService from "@/services/propertyService";
import { toast } from "react-toastify";
export const PropertyEditForm = () => {
  const { id } = useParams();
  const [mounted, setMounted] = useState<boolean>(false);
  const router = useRouter();
  const [fields, setFields] = useState<Property>(propertyWithId);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setMounted(true);

    const fetchPropertyData = async (id: string) => {
      const property = await propertyService.loadProperty(id);
      if (property) {
        setLoading(false);
        setFields(property);
      }
    };
    if (!fields.name && id) {
      fetchPropertyData(typeof id === "string" ? id : id[0]);
    }
  }, []);
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { target } = event;
    if (target.name.includes(".")) {
      const [outerKey, innerKey] = target.name.split(".");
      setFields((prev) => ({
        ...prev,
        [outerKey]: { ...(prev as any)[outerKey], [innerKey]: target.value },
      }));
    } else {
      setFields((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };
  const handleAmenetiesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    let updatedAmenities = [...fields.amenities];
    if (target.checked) {
      updatedAmenities.push(target.value);
    } else {
      updatedAmenities = updatedAmenities.filter((a) => a !== target.value);
    }
    setFields((prev) => ({
      ...prev,
      amenities: [...updatedAmenities],
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await propertyService.updateProperty(fields);
    if (res) {
      toast.success("Property Updated");
      router.push(`/properties/${res._id}`);
    }
  };
  console.log(fields);
  return (
    mounted &&
    !loading && (
      <form onSubmit={handleSubmit} className="w-full">
        <h2 className="text-3xl text-center font-semibold mb-6">
          Edit Property
        </h2>
        {
          <Select
            options={propertyTypes}
            name={"type"}
            onChange={handleChange}
            defaultProperty={fields.type}
          />
        }
        <InputField
          onChange={handleChange}
          placeholder="Property Nmae"
          name="name"
          value={fields.name}
          required
          label="Property Name"
        />
        <TextArea
          label="Description"
          onChange={handleChange}
          name={"description"}
          value={fields.description}
          rows={4}
          placeholder="Add an optional description of your property"
        />
        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">Location</label>
          {Object.keys(fields.location).map((f: string) => (
            <InputField
              key={f}
              name={`location.${f}`}
              onChange={handleChange}
              placeholder={f}
              required
              value={(fields.location as any)[f]}
            />
          ))}
        </div>
        <div className="mb-4 flex flex-wrap">
          <InputField
            value={fields.beds.toString()}
            name={"beds"}
            type={"number"}
            onChange={handleChange}
            label={"Beds"}
            className="w-full sm:w-1/3 pr-2"
          />
          <InputField
            value={fields.baths.toString()}
            name={"baths"}
            type={"number"}
            onChange={handleChange}
            label={"baths"}
            className="w-full sm:w-1/3 pr-2"
          />
          <InputField
            value={fields.square_feet.toString()}
            name={"square_feet"}
            type={"number"}
            onChange={handleChange}
            label={"Square Feet"}
            className="w-full sm:w-1/3 pr-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Amenities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {amenities.map((a, i) => (
              <CheckBoxField
                name={a}
                label={a}
                key={a}
                value={a}
                checked={fields.amenities.includes(a)}
                onChange={handleAmenetiesChange}
              />
            ))}
          </div>
        </div>
        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">
            Rates (Leave blank if not applicable)
          </label>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            {Object.keys(fields.rates).map((r) => (
              <InputField
                name={`rates.${r}`}
                type="number"
                label={r}
                key={r}
                className="flex items-center"
                onChange={handleChange}
                value={(fields.rates as any)[r] || 0}
              />
            ))}
          </div>
        </div>
        <h3 className="block text-gray-700 font-bold mb-2">Seller Info</h3>
        {Object.keys(fields.seller_info).map((s) => (
          <InputField
            type={s === "phone" ? "tel" : ""}
            name={`seller_info.${s}`}
            label={s}
            key={s}
            onChange={handleChange}
            value={(fields.seller_info as any)[s]}
          />
        ))}
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Edit Property
          </button>
        </div>
      </form>
    )
  );
};
