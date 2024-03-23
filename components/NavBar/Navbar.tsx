"use client";
import React, { useState } from "react";
import MenuButton from "../buttons/MenuButton";
import Logo from "../Logo";
import DesktopMenuLeft from "./components/DesktopMenuLeft";
import DekstopRightMenu from "./components/DekstopRightMenu";
import MobileMenu from "./components/MobileMenu";
import { FaGoogle } from "react-icons/fa";
import AuthButton from "../buttons/AuthButton";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobalMenuOpen] = useState<boolean>(false);
  const [isProfileMenuOpen, setsProfileMenuOpen] = useState<boolean>(false);
  const openMobalMenu = () => {
    setIsMobalMenuOpen((prev) => !prev);
  };
  const desktopLeftItems = [
    {
      text: "Home",
      href: "/",
      requiresAuth: false,
    },
    {
      text: "Properties",
      href: "/properties",
      requiresAuth: false,
    },

    {
      text: "Add Property",
      href: "/add-property",
      requiresAuth: true,
    },
  ];
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <MenuButton onClick={openMobalMenu} />
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Logo />
            <DesktopMenuLeft items={desktopLeftItems} />
          </div>
          {!isLoggedIn && (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                <AuthButton />
              </div>
            </div>
          )}
          {isLoggedIn && <DekstopRightMenu />}
        </div>
      </div>
      {isMobileMenuOpen && <MobileMenu items={desktopLeftItems} />}
    </nav>
  );
};

export default Navbar;
