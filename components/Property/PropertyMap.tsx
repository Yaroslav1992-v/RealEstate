"use client";
import React, { useEffect, useState } from "react";
import { Property } from "@/props";
import "mapbox-gl/dist/mapbox-gl.css";
import { fromAddress, setDefaults } from "react-geocode";
import Map, { Marker } from "react-map-gl";
import Spinner from "../Spinner";
import pin from "@/assets/images/pin.svg";
import Image from "next/image";
type CustomSetDefaults = (options: {
  key: string;
  language: string;
  region: string;
}) => void;
const PropertyMap: React.FC<{ property: Property }> = ({ property }) => {
  const customSetDefaults = setDefaults as CustomSetDefaults;
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [geocodeError, setGeogoderError] = useState<boolean>(false);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState<boolean>(true);
  customSetDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY || "",
    language: "en",
    region: "us",
  });
  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );
        if (res?.results?.lenght === 0) {
          setGeogoderError(true);
          setLoading(false);
          return;
        }
        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setGeogoderError(true);
        setLoading(false);
      }
    };
    fetchCoords();
  }, []);
  if (loading) {
    return <Spinner loading={loading} />;
  }
  if (geocodeError) {
    return <div className="text-xl">No Location Data found</div>;
  }
  return (
    !loading &&
    lng &&
    lat && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15,
        }}
        style={{ width: "100%", height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
