import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
const API_URL = import.meta.env.VITE_API_URL;
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const newErrors = validateForm();
  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     // Logic for standard email/password signup goes here
  //     await new Promise(resolve => setTimeout(resolve, 1500));
  //     console.log('Manual Signup:', { name, email, password });
  //   } catch (error) {
  //     setErrors({ submit: 'Signup failed. Please try again.' });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Google Success Handler
 const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = validateForm();

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post(
      `${API_URL}/api/v10/create-vendor`,
      {
        name,
        email,
        password,
      }
    );

    console.log(response.data);

    if (response.data.success) {
      alert("Vendor registered successfully");

      setName("");
      setEmail("");
      setPassword("");

      navigate("/dashboard");
    }
  } catch (error) {
    console.error(error);

    setErrors({
      submit:
        error.response?.data?.message ||
        "Signup failed. Please try again.",
    });
  } finally {
    setLoading(false);
  }
};

 
  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("Google Token:", credentialResponse.credential);
    /* TODO: Send credentialResponse.credential to your Express backend 
       POST /api/auth/google { token: credentialResponse.credential }
    */

       navigate('/dashboard');
  };

  const handleGoogleError = () => {
    setErrors({ submit: 'Google Sign-Up failed. Please try again.' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-8 md:p-10">
          
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              {/* <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-xl">
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
                  <circle cx="16" cy="16" r="14" fill="currentColor" />
                  <path d="M12 10 L14 12 L12 14 M18 10 L16 12 L18 14" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 18 Q16 22 22 18" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </div> */}
              <span className="text-2xl font-bold text-gray-900">WIKCART</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Join Admin Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name, Email, Password Inputs (Unchanged) */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-600 ${errors.name ? 'ring-2 ring-red-500' : ''}`} />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-600 ${errors.email ? 'ring-2 ring-red-500' : ''}`} />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-600 ${errors.password ? 'ring-2 ring-red-500' : ''}`} />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            {errors.submit && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">{errors.submit}</div>}

            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-lg transition-all shadow-lg">
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            {/* --- VISUAL SEPARATOR --- */}
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-gray-200 w-full"></div>
              <span className="bg-white px-3 text-xs text-gray-400 uppercase absolute">Or continue with</span>
            </div>

            {/* --- GOOGLE LOGIN BUTTON --- */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                shape="pill"
                width="100%"
                text="signup_with"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}