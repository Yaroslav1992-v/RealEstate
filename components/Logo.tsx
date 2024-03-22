import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo-white.png";
import Link from "next/link";
const Logo = () => {
  return (
    <Link className="flex flex-shrink-0 items-center" href="/">
      <Image className="h-10 w-auto" src={logo} alt="PropertyPulse" />
      <span className="hidden md:block text-white text-2xl font-bold ml-2">
        Yaroslav
      </span>
    </Link>
  );
};

export default Logo;
