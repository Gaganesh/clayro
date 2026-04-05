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

    return (
        <div className="px-10 py-20">
            <h1 className="text-3xl mb-10">
                {category
                    ? category
                    : material
                        ? material.charAt(0).toUpperCase() + material.slice(1)
                        : "All Products"}
            </h1>

            <div className="grid grid-cols-3 gap-6">
                {filteredProducts.map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow">
                        <Image
                            src={item.image}
                            width={300}
                            height={300}
                            alt={item.name}
                            className="rounded-xl"
                        />
                        <h3 className="mt-4 font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.size}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}