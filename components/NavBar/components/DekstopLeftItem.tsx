import React, { useState } from "react";
import { MenuItemProps } from "../props";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const DekstopLeftItem: React.FC<MenuItemProps> = ({
  href,
  text,
  requiresAuth,
}) => {
  const pathName = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <li
      className={`${requiresAuth ? (isLoggedIn ? "flex" : "hidden") : "flex"}`}
    >
      <Link
        href={href}
        className={`text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 ${
          pathName === href ? "bg-black" : ""
        }`}
      >
        {text}
      </Link>
    </li>
  );
};
