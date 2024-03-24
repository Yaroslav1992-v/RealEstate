import React from "react";
import { DekstopLeftItem } from "./DekstopLeftItem";
import { MenuItems } from "../props";

const DesktopMenuLeft: React.FC<{ items: MenuItems[] }> = ({ items }) => {
  return (
    <div className="hidden md:ml-6 md:block">
      <ul className="flex space-x-2">
        {items.map((item, i) => (
          <DekstopLeftItem
            action={item.action}
            text={item.text}
            key={item.text + i}
            requiresAuth={item.requiresAuth}
          ></DekstopLeftItem>
        ))}
      </ul>
    </div>
  );
};

export default DesktopMenuLeft;
