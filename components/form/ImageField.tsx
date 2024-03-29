import React from "react";
import { ImageFieldProps } from "./props";
import { ErrorMsg } from "../ErrorMsg";

const ImageField: React.FC<ImageFieldProps> = ({ label, onChange, error }) => {
  return (
    <div className="mb-4">
      <label htmlFor="images" className={"block text-gray-700 font-bold mb-2 "}>
        {label}
      </label>
      <input
        type="file"
        id="images"
        onChange={onChange}
        name="images"
        className={
          "border rounded w-full py-2 px-3" +
          (error ? "outline-red-500 mb-2" : "border-gray-300")
        }
        accept="image/*"
        multiple
      />
      {error && <ErrorMsg text={error} />}
    </div>
  );
};

export default ImageField;
