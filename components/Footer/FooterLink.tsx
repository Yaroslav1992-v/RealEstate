import React from "react";
import { FotterItemPops } from "../NavBar/props";
import Link from "next/link";

const FooterLink: React.FC<FotterItemPops> = ({ text, href }) => {
  return (
    <li>
      <Link href={href}>{text}</Link>
    </li>
  );
};

export default FooterLink;
