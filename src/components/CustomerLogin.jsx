// CustomerLogin.jsx

import React, { useState } from "react";
import axios from "axios";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // LOGIN SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);
      const res = await axios.post(
        `${API_URL}/api/v9/customer-login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log(res.data);

      // STORE USER DATA
      localStorage.setItem(
        "customer",
        JSON.stringify(res.data.customer)
      );

      alert(res.data.message);

      // REDIRECT
      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message || "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-5">

      <div className="w-full max-w-6xl bg-gray-100 rounded-3xl shadow-lg overflow-hidden">

        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* LEFT IMAGE SECTION */}
          <div className="flex items-center justify-center p-10">

            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-illustration-download-in-svg-png-gif-file-formats--app-developer-web-mobile-pack-design-illustrations-6430773.png"
              alt="login"
              className="w-full max-w-md object-contain"
            />

          </div>

          {/* RIGHT FORM SECTION */}
          <div className="flex items-center justify-center p-8 md:p-14">

            <div className="w-full max-w-md">

              {/* HEADING */}
              <h1 className="text-4xl font-bold text-gray-900 mb-10">
                Customer Login
              </h1>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >

                {/* EMAIL */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none py-3 text-lg"
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none py-3 text-lg"
                    required
                  />
                </div>

                {/* REMEMBER */}
                <div className="flex items-center gap-3">

                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="w-5 h-5 accent-blue-500"
                  />

                  <label className="text-gray-700 text-lg">
                    Remember me
                  </label>

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white py-4 rounded-xl text-xl font-semibold disabled:opacity-70"
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>

                {/* SOCIAL ICONS */}
                <div className="flex items-center gap-5 pt-4">

                  <button
                    type="button"
                    className="w-12 h-12 rounded-lg bg-blue-700 text-white flex items-center justify-center text-xl hover:scale-105 transition-all"
                  >
                    <FaFacebookF />
                  </button>

                  <button
                    type="button"
                    className="w-12 h-12 rounded-lg bg-sky-500 text-white flex items-center justify-center text-xl hover:scale-105 transition-all"
                  >
                    <FaTwitter />
                  </button>

                  <button
                    type="button"
                    className="w-12 h-12 rounded-lg bg-red-500 text-white flex items-center justify-center text-xl hover:scale-105 transition-all"
                  >
                    <FaGoogle />
                  </button>
 
                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CustomerLogin;