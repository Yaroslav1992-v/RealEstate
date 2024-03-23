import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const GoBack = () => {
  return (
    <div>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className=" mr-2"></FaArrowLeft> Back to
          Properties
        </Link>
      </div>
    </div>
  );
};

export default GoBack;
