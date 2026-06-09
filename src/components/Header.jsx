import React, { useEffect, useState } from 'react';
import { FiAlignJustify } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import indianFlag from "../assets/indian flag.png";

const Header = () => {
const [time,setTime] = useState(new Date);

useEffect(()=>{
const timer = setInterval(()=>{
setTime(new Date);
},[])

return () => clearInterval(timer)
},[])

const formattedTime = time.toLocaleTimeString('en-IN', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});

const formattedDate = time.toLocaleDateString('en-IN', {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      {/* Left Action Buttons */}
      <div className="flex items-center gap-3">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
         <FiAlignJustify className='cursor-pointer text-3xl' />
        </button>
       
        <button className="bg-[#1a4da1] hover:bg-blue-800 text-white px-5 py-2 rounded shadow-sm text-sm font-semibold transition-colors cursor-pointer">
          Visit Website
        </button>
      </div>

      {/* Right User Info & Time */}
      <div className="flex items-center gap-8">
        {/* Real-time Clock Style */}
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800 leading-none">{formattedTime}</div>
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{formattedDate}</div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-5">
            <img src={indianFlag} alt="INDIA" className="w-10 h-8 shadow-sm " />
            <div className="relative cursor-pointer">
                <FaBell className='text-2xl'/>
                <span className="absolute -top-1 -right-2 bg-[#28a745] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">2</span>
            </div>
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800 leading-none">Example Admin</p>
            <p className="text-[11px] text-gray-400 font-medium mt-1">Super Admin</p>
          </div>
          <div className="relative">
            <img 
                src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" 
                alt="Avatar" 
                className="w-10 h-10 rounded-full border-2 border-[#28a745]" 
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;