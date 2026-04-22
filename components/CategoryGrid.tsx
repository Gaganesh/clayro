import Link from "next/link";

const categories = [
  {
    name: "Plates",
    image: "/categories/plates.png",
    description: "Dinner plates, quarter plates, pasta plates"
  },
  {
    name: "Bowls",
    image: "/categories/bowls.png",
    description: "Soup bowls, serving bowls, dessert bowls"
  },
  {
    name: "Cups & Mugs",
    image: "/categories/cups.png",
    description: "Coffee cups, tea mugs, hotel cups"
  },
  {
    name: "Platters",
    image: "/categories/platters.png",
    description: "Serving platters for presentation"
  }
];

export default function CategoryGrid() {
  return (
    <section className="w-full py-1 md:py-1 bg-[#f6f3ef] text-black">

      {/* HEADING */}
      <div className="px-4 md:px-8 lg:px-12 mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
          Designed for Every Table
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-md">
          Versatile categories tailored for modern dining experiences.
        </p>
      </div>

      {/* GRID */}
      <div className="px-4 md:px-8 lg:px-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">

        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/products?category=${encodeURIComponent(cat.name)}`}
            className="group"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-500">

              {/* IMAGE */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                />
              </div>

              {/* TEXT BELOW (NOT OVERLAY) */}
              <div className="p-4">
                <h3 className="text-sm md:text-base font-medium text-gray-900 group-hover:text-[#c8a96a] transition">
                  {cat.name}
                </h3>

                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
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