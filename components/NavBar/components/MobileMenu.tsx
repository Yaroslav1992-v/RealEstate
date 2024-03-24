import React from "react";
import { DesktopMobileItem } from "./DesktopMobileItem";
import AuthButton from "../../buttons/AuthButton";
import { MenuItems } from "../props";
import { signIn, useSession } from "next-auth/react";
import { AuthProvider } from "@/components/NavBar/props";
const MobileMenu: React.FC<{
  provider?: AuthProvider;
  items: MenuItems[];
}> = ({ items, provider }) => {
  const { data: session } = useSession();

  return (
    <div className="block" id="mobile-menu">
      <ul className="space-y-1 px-2 pb-3 pt-2">
        {items.map((item, i) => (
          <DesktopMobileItem
            action={item.action}
            text={item.text}
            key={item.text + i}
            requiresAuth={item.requiresAuth}
          ></DesktopMobileItem>
        ))}
        {!session && provider && (
          <li className="flex">
            {Object.values(provider).map((p, i) => (
              <AuthButton onClick={signIn} key={i} provider={provider} />
            ))}
          </li>
        )}
      </ul>
    </div>
  );
};

export default MobileMenu;
