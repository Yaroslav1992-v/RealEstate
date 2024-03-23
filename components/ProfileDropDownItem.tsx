import React from "react";
import { MenuItemProps } from "./NavBar/props";
import Link from "next/link";

const ProfileDropDownItem: React.FC<{ items: MenuItemProps }> = ({ items }) => {
  const { href, text } = items;
  return (
    <li className="flex">
      <Link
        href={href}
        className="block px-4 py-2 text-sm text-gray-700"
        role="menuitem"
        id="user-menu-item-0"
      >
        {text}
      </Link>
    </li>
  );
};

export default ProfileDropDownItem;
