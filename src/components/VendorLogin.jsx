import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const VendorLogin = () => {
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await axios.post(
                `${API_URL}/api/v1/vendor-admin-login`,
                formData
            );

            console.log(response.data);

            // Save Token
            localStorage.setItem("token", response.data.token);

            // Save User Details
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login Successful");

            navigate("/dashboard");

        } catch (err) {

            console.log(err);

            setError(
                err.response?.data?.message ||
                "Login Failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">

            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-10">

                {/* Logo */}

                <h1 className="text-4xl font-bold text-center text-slate-900">
                    WIKCART
                </h1>

                {/* Heading */}

                <h2 className="text-5xl font-bold text-center text-slate-900 mt-10">
                    Vendor Login
                </h2>

                <p className="text-center text-gray-500 mt-3 text-lg">
                    Access Vendor Dashboard
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-6"
                >

                    {/* Email */}

                    <div>
                        <label className="block font-semibold mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-gray-100 px-4 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}

                    <div>
                        <label className="block font-semibold mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="********"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-gray-100 px-4 py-4 outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Error */}

                    {error && (
                        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Button */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl transition duration-300 shadow-lg"
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>

                      <div className="text-center mt-1">
                                <p className="text-gray-600 text-sm">
                                  Admin login?{" "}
                                  <Link
                                    to="/admin-login"
                                    className="text-gray-800 hover:underline font-medium"
                                  >
                                    Login
                                  </Link>
                                </p>
                              </div>

                </form>

            </div>

        </div>
    );
};

export default VendorLogin;