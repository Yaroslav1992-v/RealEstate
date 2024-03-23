"use client";
import React from "react";
import { ClipLoader } from "react-spinners";
const LoadingPage: React.FC<{ loading: boolean }> = ({ loading }) => {
  const override = {
    display: "block",
    margin: "100px auto",
  };
  return (
    <ClipLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loadig Spinner"
    />
  );
};

export default LoadingPage;
