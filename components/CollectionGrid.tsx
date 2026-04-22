import Link from "next/link";

const collections = [
  {
    name: "Grey Shine",
    slug: "charcoal",
    image: "/collections/grey.png",
    description: "Refined minimal finish designed for modern dining environments with durability and elegance."
  },
  {
    name: "Sprinkle Glow",
    slug: "sprinkle",
    image: "/collections/sprinkle.png",
    description: "Textured finish that adds depth and creativity to plating without overpowering the dish."
  },
  {
    name: "Plain Matte",
    slug: "matte",
    image: "/collections/matte.png",
    description: "Understated matte surface that keeps focus on food while offering long-lasting durability."
  },
  {
    name: "50-50 Blend",
    slug: "blend",
    image: "/collections/blend.png",
    description: "A balanced fusion of textures that creates a modern and distinctive visual identity."
  },
  {
    name: "White Glow",
    slug: "white",
    image: "/collections/white.png",
    description: "Clean, bright finish that enhances food presentation with timeless appeal."
  },
  {
    name: "Serene",
    slug: "serene",
    image: "/collections/serene.png",
    description: "Soft tones designed to create a calm and sophisticated dining experience."
  },
  {
    name: "Designer",
    slug: "designer",
    image: "/collections/designer.png",
    description: "Bold and expressive designs crafted for unique and standout presentations."
  },
  {
    name: "Pillar Outer",
    slug: "linear",
    image: "/collections/linear.png",
    description: "Structured textures that add depth and character while maintaining durability."
  },
  {
    name: "Hand Craft (Studios)",
    slug: "studios",
    image: "/collections/studios.png",
    description: "Artisan-inspired pieces with handcrafted finishes for a unique dining identity."
  },
];

export default function CollectionGrid() {
  const featured = collections.slice(0, 3);
  const rest = collections.slice(3);

  console.log("Rest collection Grid :", rest)

  return (
    <section className="w-full py-16 md:py-20 bg-[#f6f3ef] text-black">

      {/* HEADING */}
      <div className="px-4 md:px-8 lg:px-12 mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
          Explore Collections
        </h2>
        <p className="text-gray-600 max-w-xl">
          Discover thoughtfully designed ceramic collections crafted for performance and modern hospitality.
        </p>
      </div>

      {/* 🔥 FEATURED */}
      <div className="space-y-12 mb-12">
        {featured.map((item, index) => {
          const reverse = index % 2 !== 0;

          return (
            <div
              key={item.slug}
              className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 px-4 md:px-8 lg:px-12 ${
                reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* IMAGE */}
              <div className="w-full lg:w-1/2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[240px] md:h-[320px] object-cover rounded-2xl shadow-sm"
                />
              </div>

              {/* TEXT */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  {item.name}
                </h3>

                <p className="text-gray-700 leading-relaxed mb-4 text-sm md:text-base">
                  {item.description}
                </p>

                <Link
                  href={`/products?material=${encodeURIComponent(item.slug)}`}
                  className="text-[#c8a96a] font-medium hover:underline"
                >
                  Explore Collection →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* DIVIDER */}
      <div className="px-4 md:px-8 lg:px-12 mb-6">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>

      {/* GRID LABEL */}
      <div className="px-4 md:px-8 lg:px-12 mb-4">
        <h3 className="text-base md:text-lg font-medium text-gray-700">
          More Collections
        </h3>
      </div>
      {/* 🔲 GRID */}
      <div className="px-4 md:px-8 lg:px-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
        {rest.map((item) => (
          <Link
            key={item.slug}
            href={`/products?material=${encodeURIComponent(item.slug)}`}
            className="group"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-500">

              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                />
              </div>

              <div className="p-4">
                <h3 className="text-sm md:text-base font-medium text-gray-900 group-hover:text-[#c8a96a] transition">
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