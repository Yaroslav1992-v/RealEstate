import { ChangeEvent } from "react";
export interface SelectProps {
  options: {
    value: string;
    label: string;
  }[];
  name: string;
  defaultProperty: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}
export interface InputProps {
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  name: string;
  className?: string;
  required?: boolean;
  label?: string;
  type?: string;
  error?: string;
  onlyColor?: boolean;
}
export interface CheckBoxProps extends Omit<InputProps, "onChange"> {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}
export interface ImageFieldProps {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
export interface TextAreaProps extends InputProps {
  label: string;
  rows: number;
}
export const propertyTypes = [
  { value: "Apartment", label: "Apartment" },
  { value: "Condo", label: "Condo" },
  { value: "House", label: "House" },
  { value: "Cabin Or Cottage", label: "Cabin or Cottage" },
  { value: "Room", label: "Room" },
  { value: "Studio", label: "Studio" },
  { value: "Other", label: "Other" },
];
export interface PropertyFormErrors {
  type?: string;
  name: string;
  description: string;
  sellerName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  rates: string;
  amenities: string;
  beds: string;
  baths: string;
  square_feet: string;
}
