import { materialAdminLabel } from "@/constants/catalog";
import clientPromise from "@/lib/mongodb";
import { products as staticProducts } from "@/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = { params: { id: string } };

export default async function ProductPage({ params }: Props) {
    const rawId = params?.id ?? "";
    // Next route params are usually decoded already, but guard against encoded IDs.
    const id = (() => {
        try {
            return decodeURIComponent(rawId);
        } catch {
            return rawId;
        }
    })();

    let product = null;

    // 🔥 TRY DATABASE FIRST
    try {
        const client = await clientPromise;
        const db = client.db("clayro");

        product = await db.collection("products").findOne({ id });
    } catch (err) {
        console.log("DB error, falling back to static...");
    }

    // 🔥 FALLBACK TO STATIC
    if (!product) {
        product = staticProducts.find((p) => p.id === id);
    }

    if (!product) return notFound();

    return (
        <div className="bg-white min-h-screen px-6 md:px-16 py-16">

            <div className="flex flex-col md:flex-row gap-12 items-start">

                {/* LEFT IMAGE */}
                <div className="w-full md:w-[65%] flex justify-center">
                    <div className="w-full max-w-md border rounded-xl p-4">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={800}
                            height={800}
                            priority
                            className="object-contain w-full h-auto hover:scale-105 transition duration-300"
                        />
                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="w-full md:w-[35%]">

                    <h1 className="text-4xl font-semibold text-gray-900 mb-4">
                        {product.name}
                    </h1>

                    <p className="text-gray-700 mb-2">
                        <strong>Category:</strong> {product.category}
                    </p>

                    <p className="text-gray-700 mb-2">
                        <strong>Material:</strong>{" "}
                        {materialAdminLabel(String(product.material))}
                    </p>

                    <p className="text-gray-700 mb-2">
                        <strong>Size:</strong> {product.size}
                    </p>

                    {product.startingPrice && (
                        <p className="text-gray-700 mb-6">
                            <strong>Starting Price:</strong> ₹{product.startingPrice}
                        </p>
                    )}

                    <p className="text-gray-800 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="flex gap-4">

                        <a
                            href="/request-quote"
                            className="bg-black text-white px-6 py-3 rounded-full"
                        >
                            Request Quote
                        </a>

                        <a
                            href={`https://wa.me/919899024814?text=${encodeURIComponent(
                                `Hi Clayro, I am interested in ${product.name}`
                            )}`}
                            target="_blank"
                            className="bg-black text-white px-6 py-3 rounded-full"
                        >
                            WhatsApp
                        </a>

                    </div>

                </div>

            </div>
        </div>
    );
}