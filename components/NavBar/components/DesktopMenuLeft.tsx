import React from "react";
import { MenuItemProps } from "../props";
import { DekstopLeftItem } from "./DekstopLeftItem";

const DesktopMenuLeft: React.FC<{ items: MenuItemProps[] }> = ({ items }) => {
  return (
    <div className="hidden md:ml-6 md:block">
      <ul className="flex space-x-2">
        {items.map((item) => (
          <DekstopLeftItem
            href={item.href}
            text={item.text}
            key={item.href}
            requiresAuth={item.requiresAuth}
          ></DekstopLeftItem>
        ))}
      </ul>
    </div>
  );
};

export default DesktopMenuLeft;
