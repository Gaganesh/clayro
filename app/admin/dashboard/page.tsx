"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) setIsAdmin(true);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      alert("✅ Product Added Successfully");
      e.target.reset();
      setPreview(null);
    } else {
      alert("❌ Error adding product");
    }
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  if (!isAdmin) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f7f5f2]">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h2 className="text-2xl mb-4 text-gray-900 font-semibold">
            Admin Access Required
          </h2>
          <button
            onClick={() => (window.location.href = "/admin")}
            className="bg-black text-white px-6 py-3 rounded-full"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen px-6 py-12 flex justify-center">
      <div className="w-full max-w-2xl">

        <h1 className="text-3xl font-semibold mb-8 text-gray-900">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* IMAGE */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImage}
            required
            className="border p-3 rounded text-gray-900"
          />

          {preview && (
            <img
              src={preview}
              className="w-full h-64 object-contain border rounded"
            />
          )}

          {/* NAME */}
          <input
            name="name"
            placeholder="Product Name"
            required
            className="border p-3 rounded text-gray-900"
          />

          {/* CATEGORY */}
          <select
            name="category"
            required
            className="border p-3 rounded text-gray-900"
          >
            <option value="">Select Category</option>
            <option>Plates</option>
            <option>Bowls</option>
            <option>Cups & Mugs</option>
            <option>Platters</option>
          </select>

          {/* MATERIAL */}
          <select
            name="material"
            required
            className="border p-3 rounded text-gray-900"
          >
            <option value="">Select Material</option>
            <option>white</option>
            <option>charcoal</option>
            <option>sprinkle</option>
            <option>blend</option>
            <option>designer</option>
            <option>serene</option>
            <option>matte</option>
            <option>linear</option>
            <option>studios</option>
          </select>

          {/* SIZE */}
          <select
            name="size"
            required
            className="border p-3 rounded text-gray-900"
          >
            <option value="">Select Size</option>
            <option>Large</option>
            <option>Medium</option>
            <option>6-8 inch</option>
            <option>10-12 inch</option>
          </select>

          {/* PRICE */}
          <input
            name="startingPrice"
            type="number"
            placeholder="Starting Price"
            required
            className="border p-3 rounded text-gray-900"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Product Description"
            rows={6}
            required
            className="border p-3 rounded text-gray-900"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-black text-white py-4 rounded-full text-lg"
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
}