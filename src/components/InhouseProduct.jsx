import React, { useEffect, useState } from "react";
import axios from "axios";

const InhouseProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // FETCH API
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v2/get-products`
      );

      setProducts(res.data.data);
      setFilteredProducts(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // FILTER
  const handleFilter = () => {
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen p-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        
        {/* TITLE */}
        <h1 className="text-2xl font-bold text-[#0f172a] mb-6">
          Added Products
        </h1>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button className="bg-blue-500 text-white px-5 py-2 rounded text-sm font-medium border border-blue-300">
            All
          </button>

          <button className="bg-indigo-700 text-white px-5 py-2 rounded text-sm font-medium">
            Pending
          </button>

          <button className="bg-sky-500 text-white px-5 py-2 rounded text-sm font-medium">
            Processing
          </button>

          <button className="bg-emerald-500 text-white px-5 py-2 rounded text-sm font-medium">
            Ready To Ship
          </button>

          <button className="bg-blue-600 text-white px-5 py-2 rounded text-sm font-medium">
            To Shipped
          </button>

          <button className="bg-green-500 text-white px-5 py-2 rounded text-sm font-medium">
            Delivered
          </button>

          <button className="bg-yellow-400 text-white px-5 py-2 rounded text-sm font-medium">
            Unpaid
          </button>

          <button className="bg-green-600 text-white px-5 py-2 rounded text-sm font-medium">
            Paid
          </button>

          <button className="bg-pink-500 text-white px-5 py-2 rounded text-sm font-medium">
            Cancelled
          </button>
        </div>

        {/* FILTER */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select className="border border-gray-300 px-3 py-2 rounded text-sm w-[170px] outline-none">
            <option>Delivery status</option>
            <option>Pending</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          <select className="border border-gray-300 px-3 py-2 rounded text-sm w-[170px] outline-none">
            <option>Payment status</option>
            <option>Paid</option>
            <option>Unpaid</option>
          </select>

          <input
            type="text"
            placeholder="Enter order code"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded text-sm w-[240px] outline-none"
          />

          <button
            onClick={handleFilter}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-medium"
          >
            Filter
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full">
            
            {/* HEAD */}
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-4">
                  <input type="checkbox" />
                </th>

                <th className="p-4 text-sm font-semibold">
                  Order Code
                </th>

                <th className="p-4 text-sm font-semibold">
                  Order Date
                </th>

                <th className="p-4 text-sm font-semibold">
                  Customer
                </th>

                <th className="p-4 text-sm font-semibold">
                  Amount
                </th>

                <th className="p-4 text-sm font-semibold">
                  Commission
                </th>

                <th className="p-4 text-sm font-semibold">
                  Earnings
                </th>

                <th className="p-4 text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-8 text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((item) => {
                  const amount = Number(item.unit_price || 0);
                  const commission = 4;
                  const earnings = amount - commission;

                  return (
                    <tr
                      key={item.id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <input type="checkbox" />
                      </td>

                      {/* ORDER */}
                      <td className="p-4 font-semibold text-sm">
                        ORD{5000 + item.id}
                      </td>

                      {/* DATE */}
                      <td className="p-4 text-sm">
                        {new Date(
                          item.created_at
                        ).toLocaleDateString()}
                      </td>

                      {/* CUSTOMER */}
                      <td className="p-4 text-sm">
                        {item.name || "Customer"}
                      </td>

                      {/* AMOUNT */}
                      <td className="p-4 font-semibold text-sm">
                        ₹{amount.toFixed(2)}
                      </td>

                      {/* COMMISSION */}
                      <td className="p-4">
                        <div className="text-red-500 font-semibold text-sm">
                          -₹{commission}
                        </div>

                        <div className="text-gray-400 text-xs mt-1">
                          ₹{commission}
                        </div>
                      </td>

                      {/* EARNINGS */}
                      <td className="p-4 text-green-600 font-bold text-sm">
                        ₹{earnings.toFixed(2)}
                      </td>

                      {/* STATUS */}
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-xs font-medium w-fit">
                            Pending
                          </span>

                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-medium w-fit">
                            Paid
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-8 text-red-500"
                  >
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InhouseProduct;