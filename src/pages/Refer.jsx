import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  HiChevronDown, 
  HiOutlineChevronLeft, 
  HiOutlineChevronRight, 
  HiOutlineRefresh 
} from "react-icons/hi";
import { BiColumns, BiExport, BiSearch } from "react-icons/bi";
import { MdOutlineCurrencyRupee } from "react-icons/md";

const Refer = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch referrals from API
  const fetchReferrals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v8/getall-referral`);
      // Adjusting based on standard API wrappers; defaults to empty array if data layout varies
      const data = response.data && response.data.success ? response.data.result : [];
      setReferrals(data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch referral data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  // Format timestamp helper
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toISOString().replace("T", " ").substring(0, 19);
  };

  // Filter items based on search input
  const filteredReferrals = referrals.filter(item => 
    item.referrer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.referred_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.referral_code?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 font-sans text-gray-700">
      {/* Container Box */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        
        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-b border-gray-100 gap-4">
          <h1 className="text-xl font-semibold text-gray-800">Referrals</h1>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* All Statuses Dropdown */}
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition">
              All Statuses <HiChevronDown className="text-gray-400 text-lg" />
            </button>
            
            {/* View Earnings Button */}
            <button className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition">
              <MdOutlineCurrencyRupee className="text-base" /> View Earnings
            </button>
            
            {/* Refresh Button */}
            <button 
              onClick={fetchReferrals}
              className="flex items-center gap-1.5 px-4 py-1.5 border border-[#1070e0] text-[#1070e0] font-medium rounded-md text-sm hover:bg-blue-50 transition"
            >
              <HiOutlineRefresh className="text-base" /> Refresh
            </button>
          </div>
        </div>

        {/* Action Toolbar Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white gap-4">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition">
              <BiColumns className="text-lg text-gray-500" /> Columns <HiChevronDown className="text-gray-400" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition">
              <BiExport className="text-lg text-gray-500" /> Export <HiChevronDown className="text-gray-400" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BiSearch className="text-gray-400 text-lg" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Table & Display Window */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20 text-gray-500">
              <HiOutlineRefresh className="animate-spin text-3xl mr-2 text-blue-500" /> Loading records...
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500 px-4">{error}</div>
          ) : filteredReferrals.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No referral history records found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-y border-gray-200 bg-gray-50/50 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  <th className="py-3 px-6 w-16">ID</th>
                  <th className="py-3 px-6">Referrer</th>
                  <th className="py-3 px-6">Referred</th>
                  <th className="py-3 px-6">Referral Code</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Total Earned</th>
                  <th className="py-3 px-6">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
                {filteredReferrals.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/70 transition bg-gray-50/20">
                    <td className="py-4 px-6 text-gray-500">{row.id}</td>
                    <td className="py-4 px-6">{row.referrer_name}</td>
                    <td className="py-4 px-6">{row.referred_name}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-600 rounded text-xs tracking-wide font-mono">
                        {row.referral_code}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-md text-xs border font-normal ${
                        row.status === "Completed" ? "bg-green-50 border-green-200 text-green-700" :
                        row.status === "Active" ? "bg-blue-50 border-blue-200 text-blue-700" :
                        "bg-gray-100 border-gray-200 text-gray-600" // Defaults to Pending styles matching UI image
                      }`}>
                        {row.status || "Pending"}
                      </span>
                    </td>
                    <td className="py-4 px-6 inline-flex items-center gap-0.5 text-gray-800">
                      ₹{parseFloat(row.total_earned || 0).toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-gray-500 whitespace-nowrap">
                      {formatDateTime(row.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-t border-gray-100 gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <div className="relative">
              <select className="appearance-none pl-3 pr-8 py-1 border border-gray-300 rounded bg-white focus:outline-none text-gray-700 cursor-pointer">
                <option>10</option>
              </select>
              <HiChevronDown className="absolute right-2 top-2 pointer-events-none text-gray-400" />
            </div>
            <span>per page</span>
          </div>

          <div className="flex items-center gap-4">
            <span>
              1-{filteredReferrals.length} of {filteredReferrals.length}
            </span>
            <div className="flex items-center gap-1">
              <button disabled className="p-1 border border-gray-200 rounded text-gray-300 bg-gray-50 cursor-not-allowed">
                <HiOutlineChevronLeft className="text-lg" />
              </button>
              <button className="px-3 py-1 border border-blue-500 bg-blue-50 text-blue-600 rounded font-semibold">
                1
              </button>
              <button disabled className="p-1 border border-gray-200 rounded text-gray-300 bg-gray-50 cursor-not-allowed">
                <HiOutlineChevronRight className="text-lg" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Refer;