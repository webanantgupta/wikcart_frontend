import React, { useEffect, useState } from "react";
import axios from "axios";

const WhatsApp = () => {
  const [qr, setQr] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, scanned

  // 1. Check if already connected on mount
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/qr`);
        if (res.data.qr === "CONNECTED") {
          setStatus("scanned");
        }
      } catch (error) {
        console.error("Status check failed", error);
      }
    };
    checkStatus();
  }, []);

  const handleStartLogin = async () => {
    setStatus("loading");
    setQr(""); // Clear old QR
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/whatsapp/login`);
    } catch (error) {
      console.error("Initialization failed", error);
      setStatus("idle");
    }
  };

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to logout from WhatsApp?")) return;
    
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/whatsapp/logout`);
      setStatus("idle");
      setQr("");
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Failed to logout. Check backend logs.");
    }
  };

  useEffect(() => {
    let interval;
    if (status === "loading") {
      interval = setInterval(async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/qr`);
          if (res.data.qr === "CONNECTED") {
            setStatus("scanned");
            clearInterval(interval);
          } else if (res.data.qr) {
            setQr(res.data.qr);
          }
        } catch (error) {
          console.log("Polling error:", error);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div style={{ textAlign: "center", padding: "40px", fontFamily: "sans-serif" }}>
      <h1>WhatsApp Admin Link</h1>
      <hr style={{ width: "50%", margin: "20px auto" }} />

      {/* IDLE STATE */}
      {status === "idle" && (
        <div>
          <p>No active WhatsApp session found.</p>
          <button 
            onClick={handleStartLogin}
            style={{ 
              padding: "12px 24px", 
              fontSize: "16px", 
              backgroundColor: "#25D366", 
              color: "white", 
              border: "none", 
              borderRadius: "5px", 
              cursor: "pointer",
              fontWeight: "bold" 
            }}
          >
            Start WhatsApp Login
          </button>
        </div>
      )}

      {/* LOADING STATE */}
      {status === "loading" && (
        <div style={{ marginTop: "20px" }}>
          {!qr ? (
            <div className="spinner">
              <p>⏳ Initializing Browser Engine... Please wait.</p>
            </div>
          ) : (
            <div>
              <p><strong>Scan the QR code below with your phone:</strong></p>
              <div style={{ background: "white", padding: "20px", display: "inline-block", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <img src={qr} alt="WhatsApp QR" width="280" />
              </div>
              <p style={{ color: "#666", fontSize: "14px" }}>Open WhatsApp {'>'} Linked Devices {'>'} Link a Device</p>
            </div>
          )}
        </div>
      )}

      {/* SCANNED / CONNECTED STATE */}
      {status === "scanned" && (
        <div style={{ marginTop: "20px" }}>
          <div style={{ backgroundColor: "#d4edda", color: "#155724", padding: "20px", borderRadius: "8px", display: "inline-block" }}>
            <h3 style={{ margin: "0 0 10px 0" }}>✅ WhatsApp Successfully Connected!</h3>
            <p style={{ margin: "0 0 20px 0" }}>Your device is now linked and active.</p>
            
            <button 
              onClick={handleLogout}
              style={{ 
                padding: "10px 20px", 
                backgroundColor: "#dc3545", 
                color: "white", 
                border: "none", 
                borderRadius: "5px", 
                cursor: "pointer" 
              }}
            >
              Logout & Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsApp;