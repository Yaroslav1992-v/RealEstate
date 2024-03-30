import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const GoBack: React.FC<{ href: string; text: string }> = ({ href, text }) => {
  return (
    <div>
      <div className="container m-auto py-6 px-6">
        <Link
          href={href}
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className=" mr-2"></FaArrowLeft>
          {text}
        </Link>
      </div>
    </div>
  );
};

export default GoBack;
