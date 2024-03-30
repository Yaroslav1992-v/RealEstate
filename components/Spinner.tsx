"use client";
import React from "react";
import { ClipLoader } from "react-spinners";
const Spinner: React.FC<{
  loading: boolean;
  size?: number;
  color?: string;
}> = ({ loading, size = 150, color }) => {
  const override = {
    display: "block",
    margin: "auto",
  };
  return (
    <ClipLoader
      color={color || "#3b82f6"}
      loading={loading}
      cssOverride={override}
      size={size}
      aria-label="Loadig Spinner"
    />
  );
};

export default Spinner;
