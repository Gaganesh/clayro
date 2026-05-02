import Link from "next/link";
import { CATEGORY_CARDS } from "@/constants/catalog";

export default function CategoryGrid() {
  return (
    <section className="w-full bg-[#f6f3ef] py-1 text-black md:py-1">
      {/* HEADING */}
      <div className="mb-12 px-4 md:px-8 lg:px-12">
        <h2 className="mb-3 text-2xl font-semibold sm:text-3xl md:text-4xl">
          Designed for Every Table
        </h2>
        <p className="max-w-md text-sm text-gray-600 md:text-base">
          Versatile categories tailored for modern dining experiences.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-5 px-4 md:grid-cols-3 md:gap-6 md:px-8 lg:grid-cols-4 lg:px-12">
        {CATEGORY_CARDS.map((cat) => (
          <Link
            prefetch={false}
            key={cat.name}
            href={`/products?category=${encodeURIComponent(cat.name)}`}
            className="group"
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-500 hover:shadow-xl">
              <div className="aspect-square overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 transition group-hover:text-[#c8a96a] md:text-base">
                  {cat.name}
                </h3>

                <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                  {cat.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
