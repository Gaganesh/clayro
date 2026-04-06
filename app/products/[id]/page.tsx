import { products } from "@/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: any) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) return notFound();

  return (
    <div className="bg-white min-h-screen px-6 md:px-20 py-16">

      {/* MAIN SECTION */}
      <div className="flex flex-col md:flex-row gap-12 items-start">

        {/* IMAGE (LEFT) */}
        <div className="w-full md:w-[45%] border border-gray-200 rounded-2xl p-4 shadow-sm">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto object-contain rounded-xl"
          />
        </div>

        {/* DETAILS (RIGHT) */}
        <div className="w-full md:w-[55%]">

          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">
            {product.name}
          </h1>

          {/* META */}
          <div className="text-gray-700 mb-6 space-y-1">
            <p><span className="font-medium">Category:</span> {product.category}</p>
            <p><span className="font-medium">Material:</span> {product.material}</p>
            <p><span className="font-medium">Size:</span> {product.size}</p>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-700 leading-relaxed mb-10 text-lg">
            {product.description}
          </p>

          {/* CTA */}
          <div className="flex gap-4 flex-wrap">

            <a
              href={`https://wa.me/919899024814?text=Hi%20Clayro%2C%20I%20am%20interested%20in%20${product.name}`}
              target="_blank"
              className="bg-black text-white px-6 py-3 rounded-full"
            >
              WhatsApp Enquiry
            </a>

            <a
              href="/request-quote"
              className="border border-black text-black px-6 py-3 rounded-full"
            >
              Request Quote
            </a>

          </div>

        </div>
      </div>

    </div>
  );
}