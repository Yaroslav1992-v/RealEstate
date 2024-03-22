import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo-white.png";
import FooterLink from "./FooterLink";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerItems = [
    {
      text: "Properties",
      href: "/properties",
    },

    {
      text: "Terms of Service",
      href: "/terms",
    },
  ];
  return (
    <footer className="bg-gray-200 py-4 mt-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <Image src={logo} alt="Logo" className="h-8 w-auto" />
        </div>
        <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
          <ul className="flex space-x-4">
            {footerItems.map((f, i) => (
              <FooterLink key={i + f.href} text={f.text} href={f.text} />
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {currentYear} PropertyPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
