import React from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthProvider } from "../NavBar/props";

const AuthButton: React.FC<{
  provider: AuthProvider;
  onClick: (id: string) => void;
}> = ({ provider, onClick }) => {
  return (
    <button
      onClick={() => onClick(provider.id)}
      className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4"
    >
      <FaGoogle className="hidden text-white mr-2 md:block" />
      <span>Login or Register</span>
    </button>
  );
};

export default AuthButton;
