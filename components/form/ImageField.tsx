import React from "react";
import { ImageFieldProps } from "./props";

const ImageField: React.FC<ImageFieldProps> = ({ label, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="images" className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <input
        type="file"
        id="images"
        onChange={onChange}
        name="images"
        className="border rounded w-full py-2 px-3"
        accept="image/*"
        multiple
      />
    </div>
  );
};

export default ImageField;
