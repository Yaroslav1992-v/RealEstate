import React from "react";
import { FaGoogle } from "react-icons/fa";

const AuthButton = () => {
  return (
    <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4">
      <FaGoogle className="hidden text-white mr-2 md:block" />
      <span>Login or Register</span>
    </button>
  );
};

export default AuthButton;
