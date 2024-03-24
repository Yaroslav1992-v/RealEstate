import React from "react";
import { MenuItemProps } from "./NavBar/props";
import Link from "next/link";

const ProfileDropDownItem: React.FC<{ items: MenuItemProps }> = ({ items }) => {
  const { action, text } = items;
  return (
    <li className="flex">
      {typeof action === "string" ? (
        <Link
          href={action}
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          id="user-menu-item-0"
        >
          {text}
        </Link>
      ) : (
        <button
          onClick={action}
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          id="user-menu-item-0"
        >
          {text}
        </button>
      )}
    </li>
  );
};

export default ProfileDropDownItem;
