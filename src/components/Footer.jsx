import React from 'react';
import { 
  FaHome, 
  FaShoppingBag, 
  FaInfoCircle, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaFileContract, 
  FaLock, 
  FaUndoAlt, 
  FaTimesCircle
} from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a2232] text-gray-300 font-sans pt-12 pb-6 border-t border-gray-800">
      {/* Top Section / Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
        
        {/* Column 1: About */}
        <div className="flex flex-col space-y-4">
          <div className="relative pb-2">
            <h3 className="text-white font-bold tracking-wider text-sm uppercase">WIKCART</h3>
            <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-purple-600"></div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed pt-2">
            From everyday wear to special occasion outfits, WikCart makes shopping for kids easy, secure, and enjoyable for every parent.
          </p>
        </div>

        {/* Column 2: Products */}
        <div className="flex flex-col space-y-4">
          <div className="relative pb-2">
            <h3 className="text-white font-bold tracking-wider text-sm uppercase">Products</h3>
            <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-purple-600"></div>
          </div>
          <ul className="space-y-3 pt-2 text-sm">
            <li>
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                {/* <FaShirt className="text-green-500 text-base" /> */}
                <span>T Shirt</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Useful Links */}
        <div className="flex flex-col space-y-4">
          <div className="relative pb-2">
            <h3 className="text-white font-bold tracking-wider text-sm uppercase">Useful Links</h3>
            <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-purple-600"></div>
          </div>
          <ul className="space-y-3 pt-2 text-sm">
            <li>
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                <FaHome className="text-orange-400 text-base" />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                <FaShoppingBag className="text-slate-400 text-base" />
                <span>Shop</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                <FaInfoCircle className="text-blue-400 text-base" />
                <span>About</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                <FaPhoneAlt className="text-pink-500 text-sm" />
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Policy */}
        <div className="flex flex-col space-y-4">
          <div className="relative pb-2">
            <h3 className="text-white font-bold tracking-wider text-sm uppercase">Policy</h3>
            <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-purple-600"></div>
          </div>
          <ul className="space-y-3 pt-2 text-sm">
            <li>
              <Link to="/term" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                <FaFileContract className="text-orange-300 text-base" />
                <span>Terms & Conditions</span>
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                <FaLock className="text-amber-500 text-base" />
                <span>Privacy Policy</span>
              </Link>
            </li>
            <li>
              <Link to="/refund" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                <FaUndoAlt className="text-emerald-500 text-base" />
                <span>Refund Policy</span>
              </Link>
            </li>
            <li>
              <Link to="/cancel" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                <FaTimesCircle className="text-rose-500 text-base" />
                <span>Cancellation Policy</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 5: Contact Details */}
        <div className="flex flex-col space-y-4">
          <div className="relative pb-2">
            <h3 className="text-white font-bold tracking-wider text-sm uppercase">Contact</h3>
            <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-purple-600"></div>
          </div>
          <ul className="space-y-3 pt-2 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-white mt-1 flex-shrink-0 text-base" />
              <span className="leading-relaxed">
                Amiliya Sikra Jaisinghpur, Sultanpur, Uttar Pradesh, 228141
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-white flex-shrink-0 text-base" />
              <a href="mailto:info@wikcart.com" className="hover:text-white transition-colors">
                info@wikcart.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-white flex-shrink-0 text-sm" />
              <a href="tel:+918423954942" className="hover:text-white transition-colors">
                +91 8423954942
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div className="w-full border-t border-gray-800/60 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs md:text-sm text-gray-400 tracking-wide">
          &copy; {currentYear} WIK CART Multivendor | All rights reserved | Powered by Digital Communique
        </div>
      </div>
    </footer>
  );
};

export default Footer;