import { ValidationConfig } from "./validator";

export const propertyValidator: ValidationConfig = {
  type: {
    isRequired: { message: "Property Type is required" },
  },
  name: {
    isRequired: { message: "Property Name is required" },
  },
  description: {
    isRequired: { message: "Property Description is required" },
  },

  beds: {
    isRequired: { message: "Beds amount is required" },
    min: {
      message: "Beds must be at least 0",
      value: 0,
    },
  },
  baths: {
    isRequired: { message: "Baths amount is required" },
    min: {
      message: "Baths must be at least 0",
      value: 0,
    },
  },
  square_feet: {
    isRequired: { message: "Square feet amount is required" },
    min: {
      message: "Square feet must be at least 0",
      value: 0,
    },
  },
  amenities: {
    isRequired: { message: "At least one Amenitie is required" },
  },
  street: {
    isRequired: { message: "Street is required" },
  },
  city: {
    isRequired: { message: "City is required" },
  },
  images: {
    isRequired: { message: "At least one image is Required" },
  },
  state: {
    isRequired: { message: "State is required" },
  },
  zipcode: {
    isRequired: { message: "Zipcode is required" },
  },
  sellerName: {
    isRequired: { message: "Seller name is required" },
  },
  email: {
    isRequired: { message: "Seller email is required" },
    isEmail: { message: "Invalid email format" },
  },
  phone: {
    isRequired: { message: "Seller phone is required" },
  },
  rates: {
    isRequired: { message: "Please select at least one property rate" },
  },
};
