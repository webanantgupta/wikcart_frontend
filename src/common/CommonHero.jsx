import React from "react";

const CommonHero = ({
  title,
  bgColor = "from-pink-400 to-orange-400",
  textColor = "text-white",
}) => {
  return (
    <section
      className={`w-full bg-gradient-to-r ${bgColor} h-[220px] md:h-[280px] flex items-center justify-center`}
    >
      <div className="text-center px-4">
        <h1
          className={`text-3xl md:text-5xl font-bold tracking-wide ${textColor}`}
        >
          {title}
        </h1>
      </div>
    </section>
  );
};

export default CommonHero;