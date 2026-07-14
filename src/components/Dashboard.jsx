import {
  Users,
  IndianRupee,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);

  const [stats, setStats] = useState({
    totalUsers: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch Dashboard Stats
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(response.data.data);
      } catch (error) {
        console.log("Dashboard Error:", error);
      }
    };

    // Fetch Recent Products
   const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/admin/products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Products API:", response.data);

    setProducts(response.data.data);

    console.log("Products Array:", response.data.data);
  } catch (error) {
    console.log("Products Error:", error.response?.data || error);
  }
};

    fetchDashboard();
    fetchProducts();
  }, [API_URL]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back, Admin
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* Total Users */}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Total Users
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats.totalUsers}
              </h2>
            </div>

            <div className="bg-blue-100 p-4 rounded-full">
              <Users
                className="text-blue-600"
                size={32}
              />
            </div>
          </div>
        </div>

        {/* Revenue */}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Revenue
              </p>

              <h2 className="text-4xl font-bold mt-2">
                ₹{stats.revenue}
              </h2>
            </div>

            <div className="bg-green-100 p-4 rounded-full">
              <IndianRupee
                className="text-green-600"
                size={32}
              />
            </div>
          </div>
        </div>

        {/* Orders */}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Orders
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {stats.orders}
              </h2>
            </div>

            <div className="bg-orange-100 p-4 rounded-full">
              <ShoppingCart
                className="text-orange-500"
                size={32}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Products */}

      <div className="bg-white rounded-xl shadow-sm mt-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            Recent Products
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4">
                  S.No
                </th>

                <th className="text-left px-6 py-4">
                  Product
                </th>

                <th className="text-left px-6 py-4">
                  Vendor
                </th>

                <th className="text-left px-6 py-4">
                  Price
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-b"
                >
                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    {product.name}
                  </td>

                  <td className="px-6 py-4">
                    {product.vendor_name}
                  </td>

                  <td className="px-6 py-4">
                    ₹{product.unit_price}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;