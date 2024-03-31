import React from "react";
import ContactForm from "../form/ContactForm";
import BookmarkBtn from "./BookmarkBtn";
import ShareBtn from "./ShareBtn";
import { Property } from "@/props";

const PropertyAside: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <aside className="space-y-4">
      <BookmarkBtn />
      <ShareBtn property={property} />
      <ContactForm property={property} />/
    </aside>
  );
};

export default PropertyAside;
