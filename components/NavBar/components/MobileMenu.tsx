import React, { useState } from "react";
import { MenuItemProps } from "../props";
import { DesktopMobileItem } from "./DesktopMobileItem";
import AuthButton from "../../buttons/AuthButton";
const MobileMenu: React.FC<{ items: MenuItemProps[] }> = ({ items }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <div className="block" id="mobile-menu">
      <ul className="space-y-1 px-2 pb-3 pt-2">
        {items.map((item) => (
          <DesktopMobileItem
            href={item.href}
            text={item.text}
            key={item.href}
            requiresAuth={item.requiresAuth}
          ></DesktopMobileItem>
        ))}
        {!isLoggedIn && (
          <li className="flex">
            <AuthButton />
          </li>
        )}
      </ul>
    </div>
  );
};

export default MobileMenu;
