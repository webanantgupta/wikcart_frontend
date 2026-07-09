import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdSpeedometer, IoMdPhotos, IoMdListBox, IoMdMail, IoMdCube, IoMdCart, IoMdPeople, IoMdAirplane, IoMdCard, IoMdMegaphone, IoMdSettings, IoMdPhonePortrait } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import axios from 'axios';

const SideNavbar = () => {
  // Track which menu is currently open by its label
  const [openMenu, setOpenMenu] = useState(null);
  const [logoName, setLogoName] = useState("Wikcart");
  const navigate = useNavigate(); // ADD THIS

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v4/getlogo`);
        console.log(res.data);

        if (res.data.success && res.data.data) {
          setLogoName(res.data.data[0].logo_name)
        }
      } catch (error) {
        console.log("Error in fetching logo heading", error);
      }
    }
    fetchLogo();
  }, []);

  const handleToggle = (label) => {
    setOpenMenu(prev => (prev === label ? null : label));
  };

  // ADD THIS FUNCTION
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="w-64 h-screen bg-[#111c2d] text-gray-400 flex flex-col overflow-y-auto shrink-0">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-white p-1.5 rounded-full flex items-center justify-center text-[#111c2d]">
          <IoMdCart size={24} />
        </div>
        <span className="text-white text-3xl font-bold tracking-tight">{logoName}</span>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search in Menu"
            className="w-full bg-[#2a3547] text-xs py-2.5 pl-3 pr-10 rounded text-gray-300 focus:outline-none placeholder-gray-500 border border-transparent"
          />
          <div className="absolute right-3 text-gray-500 pointer-events-none">
            <CiSearch size={18} />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 space-y-1">
        <NavItem
          label="Dashboard"
          icon={<IoMdSpeedometer />}
          onClick={() => handleNavigate('/dashboard')}
        />
        <NavItem label="Media" icon={<IoMdPhotos />} 
        // onClick={() => handleNavigate('/media')}
         />

        <NavItem
          label="Products"
          icon={<IoMdCube />}
          hasSub
          isOpen={openMenu === "Products"}
          onClick={() => handleToggle("Products")}
          subItems={[
            { name: "Add New Products", path: "/add-product" },
            { name: "Inhouse Products", path: "/inhouse-product" }
          ]}
          onSubItemClick={handleNavigate}
        />

        <NavItem
          label="Orders"
          icon={<IoMdCart />}
          hasSub
          isOpen={openMenu === "Orders"}
          onClick={() => handleToggle("Orders")}
          subItems={[
            { name: "Inhouse Orders", path: "/inhouse-order" },
            { name: "Seller Orders", path: "/seller-order" }
          ]}
          onSubItemClick={handleNavigate}
        />

        <NavItem
          label="Customer"
          icon={<IoMdPeople />}
          hasSub
          isOpen={openMenu === "Customer"}
          onClick={() => handleToggle("Customer")}
          subItems={[
            { name: "Customer List", path: "" },
            { name: "Classified Products", path: "" }
          ]}
          onSubItemClick={handleNavigate}
        />

        <NavItem
          label="Shipping"
          icon={<IoMdAirplane />}
          hasSub
          isOpen={openMenu === "Shipping"}
          onClick={() => handleToggle("Shipping")}
          subItems={[]}
          onSubItemClick={handleNavigate}
        />
        <NavItem
          label="Payments"
          icon={<IoMdCard />}
          hasSub
          isOpen={openMenu === "Payments"}
          onClick={() => handleToggle("Payments")}
          subItems={[]}
          onSubItemClick={handleNavigate}
        />
        <NavItem
          label="Referral"
          icon={<IoPeopleSharp />}
          hasSub
          isOpen={openMenu === "Marketing"}
          onClick={() => handleToggle("Marketing")}
          subItems={[
               { name: "Refer ", path: "/refer" },
          ]}
          onSubItemClick={handleNavigate}
        />
        <NavItem
          label="Ecommerce Settings"
          icon={<IoMdSettings />}
          hasSub
          isOpen={openMenu === "Ecommerce Settings"}
          onClick={() => handleToggle("Ecommerce Settings")}
          subItems={[]}
          onSubItemClick={handleNavigate}
        />
        <NavItem
          label="App Configuration"
          icon={<IoMdPhonePortrait />}
          hasSub
          isOpen={openMenu === "App Configuration"}
          onClick={() => handleToggle("App Configuration")}
          subItems={[
           { name: "WhatsApp Login" , path: "/whatsapp"},
             { name: "Comission" , path: "/comission"}
          ]}
          onSubItemClick={handleNavigate}
        />
      </nav>
    </div>
  );
};

const NavItem = ({ label, icon, isOpen, hasSub, onClick, subItems = [], onSubItemClick }) => (
  <div className="flex flex-col">
    {/* Main Clickable Area */}
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-all group ${
        isOpen && hasSub ? 'bg-[#007bff] text-white' : 'text-gray-400 hover:bg-[#2a3547] hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl opacity-70 group-hover:opacity-100 flex items-center">
          {icon}
        </span>
        <span className="text-sm font-medium">{label}</span>
      </div>

      {hasSub && (
        <span className={`text-lg font-light leading-none transition-all ${isOpen ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>
          {isOpen ? "−" : "+"}
        </span>
      )}
    </div>

    {/* Sub-menu mapping */}
    {hasSub && isOpen && (
      <div className="mt-1 flex flex-col pl-11 space-y-2 py-2">
        {subItems.map((item, index) => (
          <div
            key={index}
            onClick={() => onSubItemClick(item.path)}
            className="text-[13px] text-gray-400 hover:text-white cursor-pointer py-1 flex items-center justify-between pr-2 hover:bg-[#1a2a3d] px-2 rounded transition-colors"
          >
            <span>{item.name}</span>
            {item.badge && (
              <span className="bg-red-500 text-[9px] text-white px-1.5 py-0.5 rounded font-bold uppercase">
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default SideNavbar;