"use client";

import AdminCategoryField from "@/components/admin/AdminCategoryField";
import { materialAdminLabel, materialOptionsForForms } from "@/constants/catalog";
import type { PlpProduct } from "@/lib/catalogue";
import { buildProductsListingHref, type PlpFilterQuery } from "@/lib/plp-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Props = {
  product: PlpProduct;
  plpQuery?: PlpFilterQuery;
};

export default function ProductEditForm({ product, plpQuery }: Props) {
  const router = useRouter();
  const listingHref = useMemo(
    () => buildProductsListingHref(plpQuery ?? {}),
    [plpQuery]
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(
        `/api/products/${encodeURIComponent(product.id)}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (res.status === 401) {
        window.location.href = "/admin";
        return;
      }

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setError(data.error ?? "Could not save");
        setSaving(false);
        return;
      }

      router.push(listingHref);
      router.refresh();
    } catch {
      setError("Network error");
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (
      !window.confirm(
        `Delete “${product.name}” permanently from the database?`
      )
    ) {
      return;
    }
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/products/${encodeURIComponent(product.id)}`,
        { method: "DELETE" }
      );
      if (res.status === 401) {
        window.location.href = "/admin";
        return;
      }
      if (!res.ok) {
        setError("Could not delete");
        setDeleting(false);
        return;
      }
      router.push(listingHref);
      router.refresh();
    } catch {
      setError("Network error");
    }
    setDeleting(false);
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
          Edit product
        </h1>
        <Link
          href={listingHref}
          className="text-sm text-amber-900 underline hover:text-amber-950"
        >
          ← Back to listing
        </Link>
      </div>

      <p className="mb-6 text-xs text-gray-500">
        Product ID:{" "}
        <code className="rounded bg-gray-100 px-1 py-0.5">{product.id}</code>{" "}
        (fixed)
      </p>

      <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
        <input
          name="name"
          required
          defaultValue={product.name}
          className="rounded border border-gray-300 p-3 text-gray-900"
        />

        <AdminCategoryField savedCategory={product.category} />

        <select
          name="material"
          required
          defaultValue={product.material}
          className="rounded border border-gray-300 p-3 text-gray-900"
        >
          <option value="">Select material</option>
          {materialOptionsForForms(product.material).map((slug) => (
            <option key={slug} value={slug}>
              {materialAdminLabel(slug)} ({slug})
            </option>
          ))}
        </select>

        <select
          name="size"
          required
          defaultValue={product.size}
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
          defaultValue={
            product.startingPrice !== undefined
              ? String(product.startingPrice)
              : ""
          }
          placeholder="Starting price"
          className="rounded border border-gray-300 p-3 text-gray-900"
        />

        <textarea
          name="description"
          required
          rows={6}
          defaultValue={product.description}
          className="rounded border border-gray-300 p-3 text-gray-900"
        />

        <div>
          <label className="text-sm font-medium text-gray-700">
            Replace image (optional)
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="mt-1 w-full rounded border border-gray-300 p-3 text-gray-900"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setPreview(URL.createObjectURL(f));
              else setPreview(null);
            }}
          />
        </div>

        <div className="relative h-48 max-h-[min(320px,45vh)] w-full max-w-md overflow-hidden rounded-lg border bg-[#f7f5f2]">
          <Image
            src={preview ?? product.image}
            alt={product.name}
            fill
            className="object-contain p-3"
            sizes="(max-width: 768px) 100vw, 448px"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-black px-8 py-3 text-white disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>

      <div className="mt-10 max-w-2xl border-t border-red-100 pt-8">
        <h2 className="mb-2 text-sm font-semibold text-red-900">
          Danger zone
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          Remove this product from the database. This cannot be undone.
        </p>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-full border border-red-300 bg-white px-6 py-2.5 text-sm font-medium text-red-800 hover:bg-red-50 disabled:opacity-50"
        >
          {deleting ? "Deleting…" : "Delete product"}
        </button>
      </div>
    </div>
  );
}
