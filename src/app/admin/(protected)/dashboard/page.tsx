"use client";

import AdminCategoryField from "@/components/admin/AdminCategoryField";
import { MATERIAL_SELECT_OPTIONS, materialAdminLabel } from "@/constants/catalog";
import { useState } from "react";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      alert("Product added successfully");
      e.currentTarget.reset();
      setPreview(null);
    } else if (res.status === 401) {
      alert("Session expired. Please log in again.");
      window.location.href = "/admin";
    } else {
      alert("Error adding product");
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
      <h1 className="mb-8 text-3xl font-semibold text-gray-900">
        Add new product
      </h1>

      <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
        <input
          name="name"
          placeholder="Product name"
          required
          className="rounded border border-gray-300 p-3 text-gray-900"
        />

        <AdminCategoryField />

        <select
          name="material"
          required
          className="rounded border border-gray-300 p-3 text-gray-900"
        >
          <option value="">Select material</option>
          {MATERIAL_SELECT_OPTIONS.map((slug) => (
            <option key={slug} value={slug}>
              {materialAdminLabel(slug)} ({slug})
            </option>
          ))}
        </select>

        <select
          name="size"
          required
          className="rounded border border-gray-300 p-3 text-gray-900"
        >
          <option value="">Select size</option>
          <option>Large</option>
          <option>Medium</option>
          <option>6-8 inch</option>
          <option>10-12 inch</option>
        </select>

        <input
          name="startingPrice"
          type="number"
          min={0}
          step={1}
          placeholder="Starting price"
          required
          className="rounded border border-gray-300 p-3 text-gray-900"
        />

        <textarea
          name="description"
          placeholder="Product description"
          rows={6}
          required
          className="rounded border border-gray-300 p-3 text-gray-900"
        />

        <div>
          <label className="text-sm font-medium text-gray-700">Product photo</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImage}
            required
            className="mt-1 w-full rounded border border-gray-300 p-3 text-gray-900"
          />
        </div>

        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Preview"
            className="h-48 max-h-[min(280px,50vh)] w-full rounded border object-contain"
          />
        )}

        <button
          type="submit"
          className="rounded-full bg-black py-4 text-lg text-white disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Uploading…" : "Add product"}
        </button>
      </form>
    </div>
  );
}
