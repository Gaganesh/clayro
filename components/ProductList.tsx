"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { products as staticProducts } from "@/data/products";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const material = searchParams.get("material");

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((dbProducts) => {
        const merged = [...dbProducts, ...staticProducts];
        setProducts(merged);
        setLoading(false);
      }).catch(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchCategory = category
      ? item.category.toLowerCase() === category.toLowerCase()
      : true;

    const matchMaterial = material
      ? item.material.toLowerCase() === material.toLowerCase()
      : true;

    return matchCategory && matchMaterial;
  });

  const format = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <div className="px-6 md:px-10 py-16 bg-[#f7f5f2] min-h-screen">

      <h1 className="text-3xl md:text-4xl mb-10 font-semibold text-gray-900">
        {category
          ? format(category)
          : material
          ? format(material)
          : "All Products"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredProducts.map((item) => (
          <Link key={item.id} href={`/products/${item.id}`}>
            
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group cursor-pointer">

             <div className="relative w-full aspect-[4/3] bg-[#f7f5f2] flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-contain p-6 group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">{item.size}</p>
              </div>

            </div>

          </Link>
        ))}

      </div>
    </div>
  );
}