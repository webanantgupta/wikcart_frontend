import { useState } from "react";
import axios from "axios";
import logo from "../assets/wikcartlogo.jpeg";
import {Link} from "react-router-dom"; 


const CustomerRegister = () => {

  const [formData, setFormData] = useState({
    full_name: "",
    mobile_number: "",
    city: "",
    state: "",
    pincode: "",
    email: "",
    full_address: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
const API_URL = import.meta.env.VITE_API_URL;
  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/v9/customer-register`,
        formData
      );

      console.log(res.data);

      alert("Customer Registered Successfully");

      // Reset Form
      setFormData({
        full_name: "",
        mobile_number: "",
        city: "",
        state: "",
        pincode: "",
        email: "",
        full_address: "",
        password: "",
      });

    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-6 md:p-12">
      
      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-5xl w-full flex flex-col md:flex-row items-center p-8 md:p-12 gap-12">

        {/* Left Side Image */}
        <div className="w-full md:w-5/12 flex justify-center">
          <img
            src={logo}
            alt="Registration Illustration"
            className="w-full max-w-sm h-auto object-contain"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-7/12">

          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-left">
            Customer Create Account
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6"
          >

            {/* Full Name */}
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-300 pb-2 pt-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col">
              <input
                type="number"
                placeholder="Mobile Number"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-300 pb-2 pt-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-300 pb-2 pt-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            {/* State */}
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-300 pb-2 pt-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            {/* Pincode */}
            <div className="flex flex-col">
              <input
                type="number"
                placeholder="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-300 pb-2 pt-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-300 pb-2 pt-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col sm:col-span-2">
              <textarea
                placeholder="Full Address"
                rows="2"
                name="full_address"
                value={formData.full_address}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-300 pb-1 pt-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors resize-none"
              ></textarea>
            </div>

            {/* Password */}
            <div className="flex flex-col sm:col-span-2">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-300 pb-2 pt-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium tracking-wide text-lg rounded-lg py-3 transition duration-200 shadow-sm cursor-pointer disabled:opacity-70"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>

          </form>

          {/* Login */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/customer-login"
                className="text-gray-800 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>

          {/* Forgot Password */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Forgot Password?{" "}
              <a
                href="#login"
                className="text-gray-800 hover:underline font-medium"
              >
                Generate OTP
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;