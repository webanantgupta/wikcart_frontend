import React from "react";

const PolicyCard = ({ icon, title, content ,className=""}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-6  md:p-7 mb-5 border border-gray-100 hover:shadow-md transition-all duration-300 ${className}`}>
      
      {/* Icon */}
      <div className="text-3xl mb-4">
        {icon}
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-[#1f2937] mb-3">
        {title}
      </h2>

      {/* Content */}
      <p className="text-gray-600 text-base leading-8">
        {content}
      </p>
    </div>
  );
};

export default PolicyCard;