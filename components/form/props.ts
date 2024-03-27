import { ChangeEvent } from "react";
export interface SelectProps {
  options: {
    value: string;
    label: string;
  }[];
  name: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}
export interface InputProps {
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  name: string;
  required?: boolean;
  label?: string;
  type?: string;
  className?: string;
}
export interface CheckBoxProps extends Omit<InputProps, "onChange"> {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}
export interface ImageFieldProps {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
