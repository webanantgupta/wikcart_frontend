// import { useState, useEffect } from "react";
// import axios from "axios";

// // Helper to match API status with Badge Colors
// const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

// const statusTabs = [
//   { label: "All", color: "bg-blue-500 hover:bg-blue-600", filter: "All" },
//   { label: "Pending", color: "bg-blue-800 hover:bg-blue-900", filter: "Pending" },
//   { label: "Processing", color: "bg-sky-400 hover:bg-sky-500", filter: "Processing" },
//   { label: "Ready To Ship", color: "bg-emerald-400 hover:bg-emerald-500", filter: "Ready To Ship" },
//   { label: "To Shipped", color: "bg-blue-600 hover:bg-blue-700", filter: "To Shipped" },
//   { label: "Delivered", color: "bg-green-400 hover:bg-green-500", filter: "Delivered" },
//   { label: "Unpaid", color: "bg-amber-400 hover:bg-amber-500", filter: "Unpaid" },
//   { label: "Paid", color: "bg-green-500 hover:bg-green-600", filter: "Paid" },
//   { label: "Cancelled", color: "bg-rose-400 hover:bg-rose-500", filter: "Cancelled" },
// ];

// const deliveryBadgeColors = {
//   Pending: "bg-amber-100 text-amber-700",
//   Processing: "bg-sky-100 text-sky-700",
//   "Ready To Ship": "bg-emerald-100 text-emerald-700",
//   "To Shipped": "bg-blue-100 text-blue-700",
//   Delivered: "bg-green-100 text-green-700",
//   Cancelled: "bg-rose-100 text-rose-700",
//   Complete: "bg-green-100 text-green-700",
// };

// const paymentBadgeColors = {
//   Paid: "bg-green-100 text-green-700",
//   Unpaid: "bg-red-100 text-red-700",
// };

// export default function SellerOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("All");
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [deliveryFilter, setDeliveryFilter] = useState("");
//   const [paymentFilter, setPaymentFilter] = useState("");
//   const [orderCodeFilter, setOrderCodeFilter] = useState("");
//   const [appliedFilters, setAppliedFilters] = useState({
//     delivery: "",
//     payment: "",
//     code: "",
//   });

//   // Example Global Commission Rate (This would ideally come from your settings API)
//   const ADMIN_COMMISSION_RATE = 5; // 5%

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v6/getall-seller-orders`);
//         if (response.data.success) {
//           setOrders(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching seller orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const handleFilter = () => {
//     setAppliedFilters({
//       delivery: deliveryFilter,
//       payment: paymentFilter,
//       code: orderCodeFilter,
//     });
//   };

//   const filteredOrders = orders.filter((order) => {
//     const dStatus = capitalize(order.order_status);
//     const pStatus = capitalize(order.payment_status);

//     const tabMatch =
//       activeTab === "All" ||
//       dStatus === activeTab ||
//       (activeTab === "Unpaid" && pStatus === "Unpaid") ||
//       (activeTab === "Paid" && pStatus === "Paid");

//     const deliveryMatch = !appliedFilters.delivery || dStatus === appliedFilters.delivery;
//     const paymentMatch = !appliedFilters.payment || pStatus === appliedFilters.payment;
//     const codeMatch = !appliedFilters.code || 
//       order.order_code.toLowerCase().includes(appliedFilters.code.toLowerCase());

//     return tabMatch && deliveryMatch && paymentMatch && codeMatch;
//   });

//   const handleSelectAll = (e) => {
//     setSelectAll(e.target.checked);
//     setSelectedRows(e.target.checked ? filteredOrders.map((o) => o.id) : []);
//   };

//   const handleRowSelect = (id) => {
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
//     );
//   };

//   if (loading) return <div className="p-10 text-center text-gray-500">Loading Seller Orders...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="bg-white rounded-xl shadow-sm p-6 max-w-7xl mx-auto">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
//           Seller Orders
//         </h1>

//         {/* Status Tabs */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {statusTabs.map((tab) => (
//             <button
//               key={tab.filter}
//               onClick={() => {
//                 setActiveTab(tab.filter);
//                 setSelectedRows([]);
//                 setSelectAll(false);
//               }}
//               className={`px-4 py-2 rounded text-white text-sm font-medium transition-all duration-150 ${tab.color} ${
//                 activeTab === tab.filter ? "ring-2 ring-offset-1 ring-gray-400 shadow-sm" : "opacity-90"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Filter Row */}
//         <div className="flex flex-wrap items-center gap-3 mb-6">
//           <select
//             value={deliveryFilter}
//             onChange={(e) => setDeliveryFilter(e.target.value)}
//             className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">Delivery status</option>
//             <option value="Pending">Pending</option>
//             <option value="Processing">Processing</option>
//             <option value="Complete">Complete</option>
//             <option value="Cancelled">Cancelled</option>
//           </select>

//           <select
//             value={paymentFilter}
//             onChange={(e) => setPaymentFilter(e.target.value)}
//             className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">Payment status</option>
//             <option value="Paid">Paid</option>
//             <option value="Unpaid">Unpaid</option>
//           </select>

//           <input
//             type="text"
//             placeholder="Enter order code"
//             value={orderCodeFilter}
//             onChange={(e) => setOrderCodeFilter(e.target.value)}
//             className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-44"
//           />

//           <button
//             onClick={handleFilter}
//             className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded transition-colors"
//           >
//             Filter
//           </button>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto rounded-lg border border-gray-200">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-4 py-3 text-left w-10">
//                   <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className="w-4 h-4 accent-blue-600 cursor-pointer" />
//                 </th>
//                 <th className="px-4 py-3 text-left font-semibold text-gray-700">Order Code</th>
//                 <th className="px-4 py-3 text-left font-semibold text-gray-700">Order Date</th>
//                 <th className="px-4 py-3 text-left font-semibold text-gray-700">Customer</th>
//                 <th className="px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
//                 <th className="px-4 py-3 text-left font-semibold text-gray-700">Commission</th>
//                 <th className="px-4 py-3 text-left font-semibold text-gray-700">Earnings</th>
//                 <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
//                 <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.length === 0 ? (
//                 <tr><td colSpan={9} className="px-4 py-12 text-center text-gray-400">No orders found.</td></tr>
//               ) : (
//                 filteredOrders.map((order) => {
//                   const dStatus = capitalize(order.order_status);
//                   const pStatus = capitalize(order.payment_status);
                  
//                   // Commission Calculations
//                   const totalAmount = parseFloat(order.amount);
//                   const commissionAmount = (totalAmount * (ADMIN_COMMISSION_RATE / 100));
//                   const sellerEarnings = totalAmount - commissionAmount;

//                   return (
//                     <tr key={order.id} className={`border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${selectedRows.includes(order.id) ? "bg-blue-50" : ""}`}>
//                       <td className="px-4 py-4">
//                         <input type="checkbox" checked={selectedRows.includes(order.id)} onChange={() => handleRowSelect(order.id)} className="w-4 h-4 accent-blue-600 cursor-pointer" />
//                       </td>
//                       <td className="px-4 py-4 font-medium text-gray-900">{order.order_code}</td>
//                       <td className="px-4 py-4 text-gray-600 text-xs whitespace-nowrap">
//                         {new Date(order.order_date).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
//                       </td>
//                       <td className="px-4 py-4">
//                         <div className="flex items-center gap-1">
//                           <span className="text-gray-700 font-medium whitespace-nowrap">{order.customer_name}</span>
//                           {order.is_guest === 1 && <span className="px-1.5 py-0.5 bg-teal-500 text-white rounded text-[10px] font-bold">GUEST</span>}
//                         </div>
//                       </td>
                      
//                       {/* Amount */}
//                       <td className="px-4 py-4 font-semibold text-gray-900">₹{totalAmount.toFixed(2)}</td>

//                       {/* Commission Column */}
//                       <td className="px-4 py-4 text-rose-500 font-medium">
//                         -₹{commissionAmount.toFixed(2)}
//                         <span className="block text-[10px] text-gray-400">({ADMIN_COMMISSION_RATE}%)</span>
//                       </td>

//                       {/* Final Earnings Column */}
//                       <td className="px-4 py-4 font-bold text-green-600">
//                         ₹{sellerEarnings.toFixed(2)}
//                       </td>

//                       <td className="px-4 py-4">
//                         <div className="flex flex-col gap-1">
//                           <span className={`px-2 py-0.5 rounded text-[10px] font-bold w-fit ${deliveryBadgeColors[dStatus] || "bg-gray-100 text-gray-600"}`}>
//                             {dStatus.toUpperCase()}
//                           </span>
//                           <span className={`px-2 py-0.5 rounded text-[10px] font-bold w-fit ${paymentBadgeColors[pStatus] || "bg-gray-100 text-gray-600"}`}>
//                             {pStatus.toUpperCase()}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-4">
//                         <div className="flex items-center gap-1.5">
//                           <button className="w-7 h-7 flex items-center justify-center bg-green-500 text-white rounded hover:bg-green-600 transition-colors">✓</button>
//                           <button className="w-7 h-7 flex items-center justify-center bg-red-400 text-white rounded hover:bg-red-500 transition-colors">✕</button>
//                         </div>
//                       </td>
//                     </tr>
//                   )
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";

// Helper
const capitalize = (s) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

const statusTabs = [
  { label: "All", color: "bg-blue-500 hover:bg-blue-600", filter: "All" },
  { label: "Pending", color: "bg-blue-800 hover:bg-blue-900", filter: "Pending" },
  { label: "Processing", color: "bg-sky-400 hover:bg-sky-500", filter: "Processing" },
  { label: "Ready To Ship", color: "bg-emerald-400 hover:bg-emerald-500", filter: "Ready To Ship" },
  { label: "To Shipped", color: "bg-blue-600 hover:bg-blue-700", filter: "To Shipped" },
  { label: "Delivered", color: "bg-green-400 hover:bg-green-500", filter: "Delivered" },
  { label: "Unpaid", color: "bg-amber-400 hover:bg-amber-500", filter: "Unpaid" },
  { label: "Paid", color: "bg-green-500 hover:bg-green-600", filter: "Paid" },
  { label: "Cancelled", color: "bg-rose-400 hover:bg-rose-500", filter: "Cancelled" },
];

const deliveryBadgeColors = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-sky-100 text-sky-700",
  "Ready To Ship": "bg-emerald-100 text-emerald-700",
  "To Shipped": "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-rose-100 text-rose-700",
  Complete: "bg-green-100 text-green-700",
};

const paymentBadgeColors = {
  Paid: "bg-green-100 text-green-700",
  Unpaid: "bg-red-100 text-red-700",
};

export default function SellerOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("All");

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [deliveryFilter, setDeliveryFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [orderCodeFilter, setOrderCodeFilter] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    delivery: "",
    payment: "",
    code: "",
  });

  // =========================
  // DYNAMIC COMMISSION
  // =========================
  const [commissionSettings, setCommissionSettings] = useState({
    commision_type: "percentage",
    comission_value: 0,
  });

  // =========================
  // FETCH ORDERS
  // =========================
  const fetchOrders = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v6/getall-seller-orders`
      );

      if (response.data.success) {

        setOrders(response.data.data);

      }

    } catch (error) {

      console.error("Error fetching seller orders:", error);

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // FETCH COMMISSION
  // =========================
  const fetchCommission = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v7/get-comission`
      );

      if (response.data.success) {

        setCommissionSettings({
          commision_type: response.data.data.commision_type,
          comission_value: Number(
            response.data.data.comission_value
          ),
        });

      }

    } catch (error) {

      console.log("Commission fetch error:", error);

    }

  };

  // =========================
  // USE EFFECT
  // =========================
  useEffect(() => {

    fetchOrders();
    fetchCommission();

  }, []);

  // =========================
  // FILTER
  // =========================
  const handleFilter = () => {

    setAppliedFilters({
      delivery: deliveryFilter,
      payment: paymentFilter,
      code: orderCodeFilter,
    });

  };

  // =========================
  // FILTERED ORDERS
  // =========================
  const filteredOrders = orders.filter((order) => {

    const dStatus = capitalize(order.order_status);
    const pStatus = capitalize(order.payment_status);

    const tabMatch =
      activeTab === "All" ||
      dStatus === activeTab ||
      (activeTab === "Unpaid" && pStatus === "Unpaid") ||
      (activeTab === "Paid" && pStatus === "Paid");

    const deliveryMatch =
      !appliedFilters.delivery ||
      dStatus === appliedFilters.delivery;

    const paymentMatch =
      !appliedFilters.payment ||
      pStatus === appliedFilters.payment;

    const codeMatch =
      !appliedFilters.code ||
      order.order_code
        .toLowerCase()
        .includes(appliedFilters.code.toLowerCase());

    return (
      tabMatch &&
      deliveryMatch &&
      paymentMatch &&
      codeMatch
    );

  });

  // =========================
  // SELECT ALL
  // =========================
  const handleSelectAll = (e) => {

    setSelectAll(e.target.checked);

    setSelectedRows(
      e.target.checked
        ? filteredOrders.map((o) => o.id)
        : []
    );

  };

  // =========================
  // ROW SELECT
  // =========================
  const handleRowSelect = (id) => {

    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((r) => r !== id)
        : [...prev, id]
    );

  };

  if (loading) {

    return (
      <div className="p-10 text-center text-gray-500">
        Loading Seller Orders...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gray-50 p-6">

      <div className="bg-white rounded-xl shadow-sm p-6 max-w-7xl mx-auto">

        <h1 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
          Seller Orders
        </h1>

        {/* STATUS TABS */}
        <div className="flex flex-wrap gap-2 mb-6">

          {statusTabs.map((tab) => (

            <button
              key={tab.filter}
              onClick={() => {
                setActiveTab(tab.filter);
                setSelectedRows([]);
                setSelectAll(false);
              }}
              className={`px-4 py-2 rounded text-white text-sm font-medium transition-all duration-150 ${tab.color} ${
                activeTab === tab.filter
                  ? "ring-2 ring-offset-1 ring-gray-400 shadow-sm"
                  : "opacity-90"
              }`}
            >
              {tab.label}
            </button>

          ))}

        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-3 mb-6">

          <select
            value={deliveryFilter}
            onChange={(e) =>
              setDeliveryFilter(e.target.value)
            }
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">Delivery status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Complete">Complete</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) =>
              setPaymentFilter(e.target.value)
            }
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">Payment status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>

          <input
            type="text"
            placeholder="Enter order code"
            value={orderCodeFilter}
            onChange={(e) =>
              setOrderCodeFilter(e.target.value)
            }
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          />

          <button
            onClick={handleFilter}
            className="px-5 py-2 bg-blue-700 text-white rounded"
          >
            Filter
          </button>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 border-b border-gray-200">

              <tr>

                <th className="px-4 py-3 text-left w-10">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>

                <th className="px-4 py-3 text-left">
                  Order Code
                </th>

                <th className="px-4 py-3 text-left">
                  Order Date
                </th>

                <th className="px-4 py-3 text-left">
                  Customer
                </th>

                <th className="px-4 py-3 text-left">
                  Amount
                </th>

                <th className="px-4 py-3 text-left">
                  Commission
                </th>

                <th className="px-4 py-3 text-left">
                  Earnings
                </th>

                <th className="px-4 py-3 text-left">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredOrders.length === 0 ? (

                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-gray-400"
                  >
                    No orders found.
                  </td>
                </tr>

              ) : (

                filteredOrders.map((order) => {

                  const dStatus = capitalize(order.order_status);
                  const pStatus = capitalize(order.payment_status);

                  const totalAmount = parseFloat(order.amount);

                  
                  // =========================
                  // DYNAMIC COMMISSION
                  // =========================
                  let commissionAmount = 0;

                  if (
                    commissionSettings.commision_type ===
                    "percentage"
                  ) {

                    commissionAmount =
                      totalAmount *
                      (
                        commissionSettings.comission_value / 100
                      );

                  } else {

                    commissionAmount =
                      commissionSettings.comission_value;

                  }

                  const sellerEarnings =
                    totalAmount - commissionAmount;

                  return (

                    <tr
                      key={order.id}
                      className="border-b border-gray-100"
                    >

                      <td className="px-4 py-4">

                        <input
                          type="checkbox"
                          checked={selectedRows.includes(order.id)}
                          onChange={() =>
                            handleRowSelect(order.id)
                          }
                        />

                      </td>

                      <td className="px-4 py-4 font-medium">
                        {order.order_code}
                      </td>

                      <td className="px-4 py-4">
                        {new Date(order.order_date)
                          .toLocaleDateString("en-GB")}
                      </td>

                      <td className="px-4 py-4">
                        {order.customer_name}
                      </td>

                      {/* TOTAL */}
                      <td className="px-4 py-4 font-semibold">
                        ₹{totalAmount.toFixed(2)}
                      </td>

                      {/* COMMISSION */}
            

{/* COMMISSION */}
<td className="px-4 py-4">

  {/* Calculated Commission Amount */}
  <div className="text-red-500 font-semibold">

    -₹{
      commissionSettings.commision_type === "percentage"
        ? (
            totalAmount *
            (commissionSettings.comission_value / 100)
          ).toFixed(2)
        : Number(commissionSettings.comission_value).toFixed(2)
    }

  </div>

  {/* Admin Set Commission */}
  <div className="text-[11px] text-gray-400 mt-1">

    {
      commissionSettings.commision_type === "percentage"
        ? `${commissionSettings.comission_value}% Admin Commission`
        : `₹${commissionSettings.comission_value}`
    }

  </div>

</td>

                      {/* SELLER EARNINGS */}
                      <td className="px-4 py-4 font-bold text-green-600">
                        ₹{sellerEarnings.toFixed(2)}
                      </td>

                      {/* STATUS */}
                      <td className="px-4 py-4">

                        <div className="flex flex-col gap-1">

                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold w-fit ${
                              deliveryBadgeColors[dStatus]
                            }`}
                          >
                            {dStatus}
                          </span>

                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold w-fit ${
                              paymentBadgeColors[pStatus]
                            }`}
                          >
                            {pStatus}
                          </span>

                        </div>

                      </td>

                    </tr>

                  );

                })

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}