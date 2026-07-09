import {
  Users,
  IndianRupee,
  ShoppingCart,
} from "lucide-react";

const Dashboard = () => {
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

        {/* Users */}

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Total Users
              </p>

              <h2 className="text-4xl font-bold mt-2">
                20
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

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Revenue
              </p>

              <h2 className="text-4xl font-bold mt-2">
                ₹8,391
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

        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500 text-sm">
                Orders
              </p>

              <h2 className="text-4xl font-bold mt-2">
                12
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

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <div className="bg-white rounded-xl shadow-sm p-6 h-80">

          <h2 className="text-xl font-semibold mb-5">
            Revenue Overview
          </h2>

          <div className="flex items-center justify-center h-full text-gray-400">
            Chart Here
          </div>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 h-80">

          <h2 className="text-xl font-semibold mb-5">
            Orders Overview
          </h2>

          <div className="flex items-center justify-center h-full text-gray-400">
            Chart Here
          </div>

        </div>

      </div>

      {/* Recent Orders */}

      <div className="bg-white rounded-xl shadow-sm mt-8">

        <div className="p-6 border-b">

          <h2 className="text-xl font-semibold">
            Recent Orders
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left px-6 py-4">
                  Order ID
                </th>

                <th className="text-left px-6 py-4">
                  Customer
                </th>

                <th className="text-left px-6 py-4">
                  Amount
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="px-6 py-4">
                  #1023
                </td>

                <td className="px-6 py-4">
                  Rahul Sharma
                </td>

                <td className="px-6 py-4">
                  ₹2,500
                </td>

                <td className="px-6 py-4">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Completed
                  </span>

                </td>

              </tr>

              <tr className="border-b">

                <td className="px-6 py-4">
                  #1024
                </td>

                <td className="px-6 py-4">
                  Amit Kumar
                </td>

                <td className="px-6 py-4">
                  ₹4,800
                </td>

                <td className="px-6 py-4">

                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    Pending
                  </span>

                </td>

              </tr>

              <tr>

                <td className="px-6 py-4">
                  #1025
                </td>

                <td className="px-6 py-4">
                  Neha Singh
                </td>

                <td className="px-6 py-4">
                  ₹1,250
                </td>

                <td className="px-6 py-4">

                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    Cancelled
                  </span>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;