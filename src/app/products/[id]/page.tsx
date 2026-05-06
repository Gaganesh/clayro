import { materialAdminLabel } from "@/constants/catalog";
import clientPromise from "@/lib/mongodb";
import { products as staticProducts } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: Props) {
    const { id: rawId } = await params;
    // Next route params are usually decoded already, but guard against encoded IDs.
    const id = (() => {
        try {
            return decodeURIComponent(rawId);
        } catch {
            return rawId;
        }
    })();
    // Common copy/paste issue: trailing punctuation (e.g. "." at end) causes 404.
    const cleanedId = id.trim().replace(/[.\s]+$/g, "");
    if (cleanedId && cleanedId !== id) {
        redirect(`/products/${encodeURIComponent(cleanedId)}`);
    }

    let product = null;
    let dbUnavailable = false;

    // 🔥 TRY DATABASE FIRST
    try {
        const client = await clientPromise;
        const db = client.db("clayro");

        product = await db.collection("products").findOne({ id: cleanedId });
    } catch (err) {
        dbUnavailable = true;
    }

    // 🔥 FALLBACK TO STATIC
    if (!product) {
        product = staticProducts.find((p) => p.id === cleanedId);
    }

    if (!product) {
        // Never throw notFound() here; it triggers Next error boundaries and feels like a “crash”.
        // Instead, render a friendly state so PLP → PDP navigation is stable even if DB is down.
        return (
            <div className="bg-white min-h-screen px-6 py-16 md:px-16">
                <h1 className="text-2xl font-semibold text-gray-900">
                    {dbUnavailable ? "Product temporarily unavailable" : "Product not found"}
                </h1>
                <p className="mt-3 text-gray-700">
                    {dbUnavailable
                        ? "We couldn’t reach the database, so this product can’t be loaded right now."
                        : "This product doesn’t exist (or may have been removed)."}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                    Product ID:{" "}
                    <code className="rounded bg-gray-100 px-1 py-0.5">
                        {cleanedId}
                    </code>
                </p>
                <div className="mt-6">
                    <Link
                        href="/products"
                        className="inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white"
                    >
                        Back to products
                    </Link>
                </div>
            </div>
        );
    }

    const name = String((product as any).name ?? "");
    const image = String((product as any).image ?? "");
    const category = String((product as any).category ?? "");
    const material = String((product as any).material ?? "");
    const size = String((product as any).size ?? "");
    const description = String((product as any).description ?? "");
    const startingPriceRaw = (product as any).startingPrice;
    const startingPrice =
        typeof startingPriceRaw === "number" ? startingPriceRaw : undefined;
    const safeImageSrc =
        image.startsWith("/") || image.startsWith("http") ? image : "/file.svg";

    return (
        <div className="bg-white min-h-screen px-6 md:px-16 py-16">

            <div className="flex flex-col md:flex-row gap-12 items-start">

                {/* LEFT IMAGE */}
                <div className="w-full md:w-[65%] flex justify-center">
                    <div className="w-full max-w-md border rounded-xl p-4">
                        <Image
                            src={safeImageSrc}
                            alt={name || "Product"}
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
                        {name}
                    </h1>

                    <p className="text-gray-700 mb-2">
                        <strong>Category:</strong> {category}
                    </p>

                    <p className="text-gray-700 mb-2">
                        <strong>Material:</strong>{" "}
                        {materialAdminLabel(material)}
                    </p>

                    <p className="text-gray-700 mb-2">
                        <strong>Size:</strong> {size}
                    </p>

                    {startingPrice !== undefined && (
                        <p className="text-gray-700 mb-6">
                            <strong>Starting Price:</strong> ₹{startingPrice}
                        </p>
                    )}

                    <p className="text-gray-800 leading-relaxed mb-8">
                        {description}
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
                                `Hi Clayro, I am interested in ${name}`
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