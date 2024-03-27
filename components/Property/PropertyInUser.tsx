import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Location } from "@/props";
import propertyService from "@/services/propertyService";
import { toast } from "react-toastify";
const PropertyInUser: React.FC<{
  name: string;
  address: Location;
  image: string;
  _id: string;
  deleteProperty: (id: string) => void;
}> = ({ image, name, address, _id, deleteProperty }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are You Sure you want to delete that property"
    );
    if (!confirmed) {
      return;
    }
    const res = await propertyService.deleteProperty(_id);
    if (res?.status === 200) {
      deleteProperty(_id);
      toast.success(res.data);
    }
  };
  return (
    <div className="mb-10">
      <Link href={`/properties/${_id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={image}
          alt="Property 1"
          width={500}
          height={100}
          priority={true}
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-gray-600">
          {address.state} {address.street} {address.city}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={`/properties/${_id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PropertyInUser;
