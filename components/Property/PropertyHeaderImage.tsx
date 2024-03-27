import Image from "next/image";
import React from "react";

const PropertyHeaderImage: React.FC<{ image: string }> = ({ image }) => {
  return (
    <div>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt="image property"
            className="object-cover h-[400px] w-full"
            width={0}
            height={0}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
};
export default PropertyHeaderImage;
