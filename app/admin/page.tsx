"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "clayro@123") {
      localStorage.setItem("admin", "true");
      window.location.href = "/admin/dashboard";
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#f7f5f2]">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-sm">

        <h2 className="text-2xl mb-6 text-black-900 font-semibold text-center">
          Admin Login
        </h2>

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-full"
        >
          Login
        </button>

      </div>
    </div>
  );
}