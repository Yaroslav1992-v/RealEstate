"use client";
import React, { Provider, useEffect, useState } from "react";
import MenuButton from "../buttons/MenuButton";
import Logo from "../Logo";
import DesktopMenuLeft from "./components/DesktopMenuLeft";
import DekstopRightMenu from "./components/DekstopRightMenu";
import MobileMenu from "./components/MobileMenu";
import AuthButton from "../buttons/AuthButton";
import { getProviders, signIn, useSession } from "next-auth/react";
import { AuthProvider } from "./props";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobalMenuOpen] = useState<boolean>(false);
  const openMobalMenu = () => {
    setIsMobalMenuOpen((prev) => !prev);
  };
  const desktopLeftItems = [
    {
      text: "Home",
      action: "/",
      requiresAuth: false,
    },
    {
      text: "Properties",
      action: "/properties",
      requiresAuth: false,
    },

    {
      text: "Add Property",
      action: "/properties/add",
      requiresAuth: true,
    },
  ];
  const [providers, setProviders] = useState<AuthProvider | null>(null);
  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res as unknown as AuthProvider);
    };
    setAuthProviders();
  }, []);
  // ${typeof id === "string" ? id : id[0]}
  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <MenuButton onClick={openMobalMenu} />
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Logo />
            <DesktopMenuLeft items={desktopLeftItems} />
          </div>
          {!session && (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                {providers &&
                  Object.values(providers).map((p, i) => (
                    <AuthButton onClick={signIn} key={i} provider={providers} />
                  ))}
              </div>
            </div>
          )}
          {session && (
            <DekstopRightMenu
              id={(session as any)["user"]["id"] || ""}
              image={session.user?.image || undefined}
              session={session ? true : false}
            />
          )}
        </div>
      </div>
      {isMobileMenuOpen && (
        <MobileMenu
          provider={providers || undefined}
          items={desktopLeftItems}
        />
      )}
    </nav>
  );
};

export default Navbar;
