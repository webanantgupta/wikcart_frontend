import React from 'react';

export default function CustomerHeader() {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* 1. LOGO SECTION */}
        <div className="flex items-center flex-shrink-0">
          <a href="#" className="flex items-center gap-2">
            <div className="flex items-center text-2xl font-black tracking-tight select-none">
              <span className="text-[#004799] italic">WIK</span>
              <span className="text-[#FF6600] italic">CART</span>
            </div>
          </a>
        </div>

        {/* 2. NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center lg:gap-8 md:gap-4 text-sm font-semibold tracking-wide text-gray-800 uppercase">
          <a href="#" className="hover:text-[#FF6600] transition-colors duration-200">Home</a>
          <a href="#" className="hover:text-[#FF6600] transition-colors duration-200">Shop</a>
          <a href="#" className="hover:text-[#FF6600] transition-colors duration-200">About</a>
          <a href="#" className="hover:text-[#FF6600] transition-colors duration-200">Contact</a>
          <a href="#" className="hover:text-[#FF6600] transition-colors duration-200">Login</a>
          <a href="#" className="hover:text-[#FF6600] transition-colors duration-200 whitespace-nowrap">Customer Register</a>
          <a href="#" className="hover:text-[#FF6600] transition-colors duration-200 whitespace-nowrap">Vendor Register</a>
        </nav>

        {/* 3. UTILITY ICONS (Pure SVGs) */}
        <div className="flex items-center gap-6 text-gray-700">
          
          {/* Wishlist Heart Icon */}
          <a href="#" className="relative group p-1 hover:text-[#FF6600] transition-colors duration-200">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.75" 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" 
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-[#FF4D4D] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white shadow-sm">
              1
            </span>
          </a>

          {/* Shopping Bag Icon */}
          <a href="#" className="relative group p-1 hover:text-[#FF6600] transition-colors duration-200">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.75" 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" 
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-[#FF4D4D] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white shadow-sm">
              0
            </span>
          </a>
          
        </div>

      </div>
    </header>
  );
}