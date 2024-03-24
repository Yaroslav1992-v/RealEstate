import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItems } from "../props";
import { useSession } from "next-auth/react";
export const DesktopMobileItem: React.FC<MenuItems> = ({
  text,
  action,
  requiresAuth,
}) => {
  const pathName = usePathname();
  const { data: session } = useSession();
  return (
    <li className={`${requiresAuth ? (session ? "flex" : "hidden") : "flex"}`}>
      <Link
        href={action}
        className={`text-white w-full hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 ${
          pathName === action ? "bg-black" : ""
        }`}
      >
        {text}
      </Link>
    </li>
  );
};
