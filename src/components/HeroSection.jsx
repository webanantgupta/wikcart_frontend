import React from "react";
import heroimage from "../assets/heroimage.png";

const HeroSection = () => {
  return (
    <section className="w-full">
      {/* Hero Banner */}
      <div className="w-full h-[300px] md:h-[500px] overflow-hidden">
        <img
          src={heroimage}
          alt="Hero Banner"
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
};

export default HeroSection;