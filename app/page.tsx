import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
import FeaturedPropeties from "@/components/Property/FeaturedPropeties";
import React from "react";
const HomePage = () => {
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
      <FeaturedPropeties />
    </div>
  );
};

export default HomePage;
