import React, { useEffect, useState } from "react";
import axios from "axios";

const Comission = () => {

  const [commissionType, setCommissionType] = useState("percentage");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // GET COMMISSION DATA
  // =========================
  const getCommission = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v7/get-comission`
      );

      console.log(response.data);

      if (response.data.success) {

        setCommissionType(
          response.data.data.commision_type
        );

        setValue(
          response.data.data.comission_value
        );

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // UPDATE COMMISSION
  // =========================
  const handleSave = async () => {

    try {

      setLoading(true);

      const payload = {
        commision_type: commissionType,
        comission_value: Number(value),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v7/update-comission`,
        payload
      );

      console.log(response.data);

      if (response.data.success) {

        alert("Commission updated successfully");

      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // USE EFFECT
  // =========================
  useEffect(() => {

    getCommission();

  }, []);

  // =========================
  // FORMAT INR
  // =========================
  const formatRupees = (amount) => {

    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
    }).format(amount);

  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Commission Configuration
        </h1>

        <p className="text-sm text-slate-500">
          Set the admin commission rate applied to all seller orders.
        </p>
      </div>

      <div className="max-w-2xl bg-white rounded-lg border border-slate-200 shadow-sm">

        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-700">
            General Settings
          </h2>
        </div>

        <div className="p-6 space-y-6">

          {/* Commission Type */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Commission Type
            </label>

            <select
              value={commissionType}
              onChange={(e) => setCommissionType(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
            >
              <option value="percentage">
                Percentage (%)
              </option>

              <option value="flat">
                Flat Rate (Fixed Amount ₹)
              </option>

            </select>

          </div>

          {/* Commission Value */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">

              Commission Value{" "}
              {commissionType === "percentage"
                ? "(%)"
                : "(₹)"}

            </label>

            <div className="relative">

              {/* INR Symbol */}
              {commissionType === "flat" && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500 font-medium">
                  ₹
                </div>
              )}

              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`w-full p-2.5 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ${
                  commissionType === "flat"
                    ? "pl-7"
                    : ""
                }`}
                placeholder="0.00"
              />

              {/* Percentage Symbol */}
              {commissionType === "percentage" && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  %
                </div>
              )}

            </div>

            <p className="mt-2 text-xs text-slate-400">
              This value will be deducted from the seller's amount.
            </p>

          </div>

          {/* Save Button */}
          <div className="pt-4 flex justify-end">

            <button
              onClick={handleSave}
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-sm"
            >

              {loading
                ? "Please wait..."
                : "Save Changes"}

            </button>

          </div>

        </div>

      </div>

      {/* Preview */}
      <div className="mt-8 max-w-2xl p-4 bg-blue-50 border border-blue-100 rounded-lg">

        <h3 className="text-sm font-semibold text-blue-800 mb-1">
          Preview Calculation:
        </h3>

        <p className="text-sm text-blue-700 leading-relaxed">

          If a seller makes a sale of{" "}
          <strong>₹1,000</strong>,
          and your commission is set to

          <strong>
            {" "}
            {value}
            {commissionType === "percentage"
              ? "%"
              : " (Flat)"}
          </strong>

          , your earnings will be

          <strong>
            {" "}
            ₹
            {commissionType === "percentage"
              ? formatRupees(
                  1000 * (value / 100)
                )
              : formatRupees(value)}
          </strong>

          .

        </p>

      </div>

    </div>
  );
};

export default Comission;