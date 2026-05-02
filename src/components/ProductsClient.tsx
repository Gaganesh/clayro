"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import {
  canonicalCategoryForAdmin,
  categoriesMatch,
  materialAdminLabel,
  materialSlugMatchesFilter,
} from "@/constants/catalog";
import type { PlpProduct } from "@/lib/catalogue";
import { buildAdminEditProductHref, type PlpFilterQuery } from "@/lib/plp-query";

type Props = {
  initialProducts: PlpProduct[];
  isAdmin: boolean;
};

export default function ProductsClient({
  initialProducts,
  isAdmin,
}: Props) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const material = searchParams.get("material");

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((item) => {
      const matchCategory = category
        ? categoriesMatch(category, item.category)
        : true;
      const matchMaterial = material
        ? materialSlugMatchesFilter(item.material, material)
        : true;
      return matchCategory && matchMaterial;
    });
  }, [initialProducts, category, material]);

  const plpQuery: PlpFilterQuery = useMemo(
    () => ({
      category: category ?? undefined,
      material: material ?? undefined,
    }),
    [category, material]
  );

  return (
    <div className="relative min-h-screen bg-[#f7f5f2] px-6 py-16 md:px-10">
      {isAdmin && (
        <Link
          href="/"
          className="fixed right-4 top-4 z-30 rounded-full border border-gray-300 bg-white/95 px-4 py-2 text-sm font-medium text-gray-800 shadow-md backdrop-blur hover:bg-white"
        >
          Home
        </Link>
      )}

      <h1 className="mb-10 text-3xl font-semibold text-gray-900 md:text-4xl">
        {category
          ? canonicalCategoryForAdmin(category)
          : material
            ? materialAdminLabel(material)
            : "All Products"}
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] w-full bg-[#f7f5f2]">
              {isAdmin && item.isFromDatabase && (
                <Link
                  href={buildAdminEditProductHref(item.id, plpQuery)}
                  className="absolute right-2 top-2 z-20 rounded-full bg-black/85 px-3 py-1.5 text-xs font-medium text-white shadow-md backdrop-blur hover:bg-black"
                >
                  Edit
                </Link>
              )}
              <Link
                href={`/products/${item.id}`}
                className="relative block h-full min-h-[200px] w-full"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-contain p-6 transition duration-500 hover:scale-[1.02]"
                />
              </Link>
            </div>

            <Link
              href={`/products/${item.id}`}
              className="block p-4 hover:bg-gray-50/80"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">{item.size}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
