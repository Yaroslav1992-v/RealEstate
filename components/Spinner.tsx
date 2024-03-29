"use client";
import React from "react";
import { ClipLoader } from "react-spinners";
const Spinner: React.FC<{ loading: boolean; size?: number }> = ({
  loading,
  size = 150,
}) => {
  const override = {
    display: "block",
    margin: "auto",
  };
  return (
    <ClipLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      size={size}
      aria-label="Loadig Spinner"
    />
  );
};

export default Spinner;
