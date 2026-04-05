"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import Image from "next/image";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const material = searchParams.get("material");

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
    <div className="px-6 md:px-10 py-16 md:py-20 bg-[#f7f5f2] min-h-screen">
      
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl mb-10 font-semibold">
        {category
          ? format(category)
          : material
          ? format(material)
          : "All Products"}
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredProducts.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden group"
          >
            
            {/* Image Container */}
            <div className="relative w-full h-64 overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.size}</p>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}