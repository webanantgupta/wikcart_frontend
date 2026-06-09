import { useState, useEffect } from "react";
import axios from "axios";

const statusTabs = [
  { label: "All", color: "bg-blue-500 hover:bg-blue-600", filter: "All" },
  { label: "Pending", color: "bg-blue-800 hover:bg-blue-900", filter: "Pending" },
  { label: "Processing", color: "bg-sky-400 hover:bg-sky-500", filter: "Processing" },
  { label: "Ready To Ship", color: "bg-emerald-400 hover:bg-emerald-500", filter: "Ready To Ship" },
  { label: "To Shipped", color: "bg-blue-600 hover:bg-blue-700", filter: "To Shipped" },
  { label: "Delivered", color: "bg-green-400 hover:bg-green-500", filter: "Delivered" },
  { label: "Cancelled", color: "bg-rose-400 hover:bg-rose-500", filter: "Cancelled" },
];

const statusBadgeColors = {
  Pending: "bg-amber-100 text-amber-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-rose-100 text-rose-700",
};

export default function InhouseOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [deliveryFilter, setDeliveryFilter] = useState("");
  const [orderCodeFilter, setOrderCodeFilter] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ delivery: "", code: "" });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v5/getall-orders`);
      if (response.data.success) {
        setOrders(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: HANDLE STATUS UPDATE ---
  const handleStatusChange = async (id, newStatus) => {
    try {
      // API call to update status in MySQL
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/v5/update-order-status/${id}`, {
        status: newStatus.toLowerCase()
      });

      if (response.data.success) {
        // Update local state so UI reflects change immediately
        setOrders((prev) =>
          prev.map((order) =>
            order.id === id ? { ...order, status: newStatus, is_new: 0 } : order
          )
        );
      }
    } catch (error) {
      console.error("Status update failed:", error);
      alert("Failed to update status");
    }
  };

  const handleViewOrder = async (id) => {
    try {
      setViewLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v5/get-ordersbyid/${id}`);
      if (response.data.success) {
        setSelectedOrder(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setViewLoading(false);
    }
  };

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedRows(filteredOrders.map((o) => o.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleFilter = () => {
    setAppliedFilters({ delivery: deliveryFilter, code: orderCodeFilter });
  };

  const filteredOrders = (orders || []).filter((order) => {
    if (!order.status) return false;
    const normalizedStatus = order.status.charAt(0).toUpperCase() + order.status.slice(1);
    const tabMatch = activeTab === "All" || normalizedStatus === activeTab;
    const deliveryMatch = !appliedFilters.delivery || normalizedStatus === appliedFilters.delivery;
    const codeMatch = !appliedFilters.code || 
      (order.order_code && order.order_code.toLowerCase().includes(appliedFilters.code.toLowerCase()));
    return tabMatch && deliveryMatch && codeMatch;
  });

  if (loading) return <div className="p-6 text-center text-gray-500">Loading orders...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-7xl mx-auto relative">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Inhouse Orders</h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {statusTabs.map((tab) => (
            <button
              key={tab.filter}
              onClick={() => setActiveTab(tab.filter)}
              className={`px-4 py-2 rounded text-white text-sm font-medium transition-all ${tab.color} ${
                activeTab === tab.filter ? "ring-2 ring-offset-2 ring-gray-400" : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <select
            value={deliveryFilter}
            onChange={(e) => setDeliveryFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Delivery status</option>
            {Object.keys(statusBadgeColors).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Enter order code"
            value={orderCodeFilter}
            onChange={(e) => setOrderCodeFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm w-44 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button onClick={handleFilter} className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded">
            Filter
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3"><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
                <th className="px-4 py-3 font-semibold text-gray-700">Order Code</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Order Date</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Customer</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                 <th className="px-4 py-3 font-semibold text-gray-700">Comission</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400">No orders found.</td></tr>
              ) : (
                filteredOrders.map((order) => {
                  const normalizedStatus = order.status.charAt(0).toUpperCase() + order.status.slice(1);
                  return (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input type="checkbox" checked={selectedRows.includes(order.id)} onChange={() => handleRowSelect(order.id)} />
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {order.order_code}
                        {order.is_new === 1 && <span className="ml-2 bg-green-500 text-white text-[10px] px-1 rounded">NEW</span>}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(order.order_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </td>
                      <td className="px-4 py-3">{order.customer_name}</td>
                      <td className="px-4 py-3 font-bold">${order.amount}</td>
                      
                      {/* UPDATED STATUS COLUMN WITH DROPDOWN */}
                      <td className="px-4 py-3">
                        <select
                          value={normalizedStatus}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`px-2 py-1 rounded text-xs font-bold border border-transparent hover:border-gray-300 cursor-pointer outline-none appearance-none ${
                            statusBadgeColors[normalizedStatus] || "bg-gray-100"
                          }`}
                        >
                          {Object.keys(statusBadgeColors).map((status) => (
                            <option key={status} value={status} className="bg-white text-gray-900">
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-4 py-3">
                        <button onClick={() => handleViewOrder(order.id)} className="text-blue-600 hover:underline font-medium">
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- VIEW MODAL --- */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
            </div>
            
            <div className="p-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Order Code:</span>
                <span className="font-bold text-blue-700">{selectedOrder.order_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span className="font-medium">{selectedOrder.customer_name}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-lg font-bold text-green-600">${selectedOrder.amount}</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 text-right">
              <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {viewLoading && (
        <div className="fixed inset-0 bg-white/60 flex items-center justify-center z-[60]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
        </div>
      )}
    </div>
  );
}