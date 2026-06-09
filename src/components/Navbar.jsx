import React, { useState } from 'react';
import { FiHeart, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import {Link} from "react-router-dom";
// Assuming your logo is located here, adjust the path as needed
import logoImg from '../assets/wikcartlogo.jpeg'; 
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'SHOP', href: '#' },
    { name: 'ABOUT', href: '#' },
    { name: 'CONTACT', href: '#' },
    { name: 'LOGIN', href: '/customer-login' },
    { name: 'Refer', href: '#' },
    { name: 'CUSTOMER REGISTER', href: '/customer-register' },
    { name: 'VENDOR REGISTER', href: '/signup' },
  ];

  const cartItems = useSelector(
  (state) => state.cart.cartItems
);

const totalCartItems = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

  return (
    <nav className="w-full bg-white border-b border-gray-100 font-sans shadow-sm sticky top-0 z-50">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#">
              <img 
                src={logoImg} 
                alt="WIKCART Logo" 
                className="h-12 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] font-bold text-gray-800 hover:text-orange-500 tracking-wide transition-colors duration-200 uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Icons Section (Wishlist & Cart) */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Wishlist Icon */}
            <a href="#" className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors">
              <FiHeart className="w-6 h-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-bold leading-none text-white bg-red-500 rounded-full min-w-[18px] h-[18px]">
                0
              </span>
            </a>

            {/* Cart Icon */}
            <Link to="/addtocart" className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors">
              <FiShoppingBag className="w-6 h-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-bold leading-none text-white bg-red-500 rounded-full min-w-[18px] h-[18px]">
                  {totalCartItems}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-4">
            {/* Quick-access icons for mobile */}
            <a href="#" className="relative p-1 text-gray-700">
              <FiHeart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-[9px] font-bold text-white bg-red-500 rounded-full w-4 h-4">
                0
              </span>
            </a>
            <a href="#" className="relative p-1 text-gray-700">
              <FiShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-[9px] font-bold text-white bg-red-500 rounded-full w-4 h-4">
                  {totalCartItems}
              </span>
            </a>
            
            {/* Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-500 p-2 focus:outline-none"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sidebar/Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-fadeIn">
          <div className="px-4 pt-2 pb-4 space-y-2 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2.5 rounded-md text-sm font-bold text-gray-800 hover:bg-gray-50 hover:text-orange-500 transition-all duration-150 uppercase"
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;