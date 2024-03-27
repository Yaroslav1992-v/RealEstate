import React from "react";
import Image from "next/image";
import profileDefault from "@/assets/images/profile.png";
const User: React.FC<{ image?: string; name: string; email: string }> = ({
  image,
  name,
  email,
}) => {
  return (
    <div className="md:w-1/4 mx-20 mt-10">
      <div className="mb-4">
        <Image
          className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
          src={image ? image : profileDefault}
          alt="User"
          width={200}
          height={200}
        />
      </div>
      <h2 className="text-2xl mb-4">
        <span className="font-bold block">Name: </span> {name}
      </h2>
      <h2 className="text-2xl">
        <span className="font-bold block">Email: </span>
        {email}
      </h2>
    </div>
  );
};

export default User;
