import Link from "next/link";
import { MATERIAL_COLLECTIONS } from "@/constants/catalog";

export default function CollectionGrid() {
  const featured = MATERIAL_COLLECTIONS.slice(0, 3);
  const rest = MATERIAL_COLLECTIONS.slice(3);

  return (
    <section className="w-full bg-[#f6f3ef] py-16 text-black md:py-20">
      {/* HEADING */}
      <div className="mb-12 px-4 md:px-8 lg:px-12">
        <h2 className="mb-3 text-2xl font-semibold sm:text-3xl md:text-4xl">
          Explore Collections
        </h2>
        <p className="max-w-xl text-gray-600">
          Discover thoughtfully designed ceramic collections crafted for performance
          and modern hospitality.
        </p>
      </div>

      {/* FEATURED */}
      <div className="mb-12 space-y-12">
        {featured.map((item, index) => {
          const reverse = index % 2 !== 0;

          return (
            <div
              key={item.slug}
              className={`flex flex-col items-center gap-6 px-4 md:px-8 lg:gap-12 lg:px-12 ${
                reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <div className="w-full lg:w-1/2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[240px] w-full rounded-2xl object-cover shadow-sm md:h-[320px]"
                />
              </div>

              <div className="w-full lg:w-1/2">
                <h3 className="mb-2 text-lg font-semibold md:text-xl">
                  {item.name}
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-gray-700 md:text-base">
                  {item.description}
                </p>

                <Link
                  prefetch={false}
                  href={`/products?material=${encodeURIComponent(item.slug)}`}
                  className="font-medium text-[#c8a96a] hover:underline"
                >
                  Explore Collection →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* DIVIDER */}
      <div className="mb-6 px-4 md:px-8 lg:px-12">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>

      {/* GRID LABEL */}
      <div className="mb-4 px-4 md:px-8 lg:px-12">
        <h3 className="text-base font-medium text-gray-700 md:text-lg">
          More Collections
        </h3>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-5 px-4 md:grid-cols-3 md:gap-6 md:px-8 lg:grid-cols-4 lg:px-12">
        {rest.map((item) => (
          <Link
            prefetch={false}
            key={item.slug}
            href={`/products?material=${encodeURIComponent(item.slug)}`}
            className="group"
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-500 hover:shadow-lg">
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 transition group-hover:text-[#c8a96a] md:text-base">
                  {item.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
