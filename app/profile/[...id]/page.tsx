"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import profileDefault from "@/assets/images/profile.png";
import User from "@/components/User";
import { Property } from "@/props";
import propertyService from "@/services/propertyService";
import { useParams } from "next/navigation";
import PropertyInUser from "@/components/Property/PropertyInUser";
import Spinner from "@/components/Spinner";

const ProfielPage = () => {
  const { data: session } = useSession();
  const [properties, setProperties] = useState<Property[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const filterPropeties = (id: string) => {
    const updatedProperties = properties.filter((p) => p._id !== id);
    setProperties(updatedProperties);
  };
  useEffect(() => {
    const loadProperties = async (userId: string) => {
      if (!userId) {
        return;
      }
      try {
        const data = await propertyService.loadUserProperties(userId);
        if (data) {
          setProperties(data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    if (session && session.user) {
      loadProperties(typeof id === "string" ? id : id[0]);
    }
  }, [session]);
  return (
    <section className="bg-blue-50">
      <div className="container mx-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            {session && session.user && (
              <User
                image={session.user.image || ""}
                name={session.user.name || ""}
                email={session.user.email || ""}
              />
            )}

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!loading && properties.length === 0 && (
                <p>You have no property listings</p>
              )}
              {loading ? (
                <Spinner loading={loading} />
              ) : (
                properties.map((p) => (
                  <PropertyInUser
                    deleteProperty={filterPropeties}
                    key={p._id}
                    _id={p._id}
                    name={p.name}
                    address={p.location}
                    image={p.images[0]}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfielPage;
