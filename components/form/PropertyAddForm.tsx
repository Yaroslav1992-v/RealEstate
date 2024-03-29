"use client";
import { amenities, emptyProperty, newPropertyData } from "@/props";
import React, { ChangeEvent, useEffect, useState } from "react";
import Select from "./Select";
import { PropertyFormErrors, propertyTypes } from "./props";
import InputField from "./InputField";
import TextArea from "./TextArea";
import CheckBoxField from "./CheckBoxField";
import ImageField from "./ImageField";
import propertyService from "@/services/propertyService";
import { useRouter } from "next/navigation";
import { checkForsErros } from "@/utils/Validator/validator";
import { ErrorMsg } from "../ErrorMsg";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
const PropertyAddForm = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const router = useRouter();
  const [fields, setFields] = useState<newPropertyData>(emptyProperty);
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { target } = event;
    console.log(target.name);
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
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) {
      return;
    }
    const fileListArray = [...images, ...Array.from(files)];
    setImages(fileListArray);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const error = checkForsErros(fields, images.length);
    if (Object.keys(error).length !== 0) {
      setErrors(error);
      return;
    }
    setIsLoading(true);
    try {
      const newProperty = await propertyService.createProperty(fields, images);
      if (newProperty) {
        router.push(`${newProperty._id}`);
      }
    } catch (error: any) {
      const msg = error?.response?.data
        ? error.response.data
        : "failed to add property";
      toast.error(msg);
      setIsLoading(false);
    } finally {
      toast.success("Property added succesfully, redirecting to property ");
      setIsLoading(false);
    }
  };
  return (
    mounted && (
      <form onSubmit={handleSubmit} className="w-full">
        <h2 className="text-3xl text-center font-semibold mb-6">
          Add Property
        </h2>
        {
          <Select
            options={propertyTypes}
            name={"type"}
            onChange={handleChange}
            defaultProperty={fields.type}
            className="md:w-full"
          />
        }
        <InputField
          onChange={handleChange}
          placeholder="Property Name"
          name="name"
          value={fields.name}
          label="Property Name"
          error={errors?.name || undefined}
        />
        <TextArea
          label="Description"
          onChange={handleChange}
          name={"description"}
          value={fields.description}
          rows={4}
          placeholder="Add an optional description of your property"
          error={errors?.description || ""}
        />
        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">Location</label>
          {Object.keys(fields.location).map((f) => (
            <InputField
              key={f}
              name={`location.${f}`}
              onChange={handleChange}
              placeholder={f}
              value={(fields.location as any)[f]}
              error={(errors && (errors as any)[f]) || undefined}
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
            error={errors?.beds || undefined}
          />
          <InputField
            value={fields.baths.toString()}
            name={"baths"}
            type={"number"}
            onChange={handleChange}
            label={"baths"}
            className="w-full sm:w-1/3 pr-2"
            error={errors?.baths || undefined}
          />
          <InputField
            value={fields.square_feet.toString()}
            name={"square_feet"}
            type={"number"}
            onChange={handleChange}
            label={"Square Feet"}
            className="w-full sm:w-1/3 pr-2"
            error={errors?.square_feet || undefined}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Amenities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
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
          {errors?.amenities && <ErrorMsg text={errors.amenities} />}
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
                value={(fields.rates as any)[r]}
                onlyColor={errors && errors.rates && true}
              />
            ))}
          </div>
          {errors?.rates && <ErrorMsg text={errors.rates} />}
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
            error={errors && (s === "name" ? errors["sellerName"] : errors[s])}
          />
        ))}
        <ImageField
          onChange={handleImageChange}
          label="Images (Select up to 4 images)"
          error={errors?.images ? "At Least One Image Is Required" : ""}
        />
        <div>
          {isLoading ? (
            <Spinner loading={isLoading} size={50} />
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Property
            </button>
          )}
        </div>
      </form>
    )
  );
};

export default PropertyAddForm;
