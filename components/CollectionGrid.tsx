import Link from "next/link";
const collections = [
  {
    name: "Grey Shine",
    slug: "charcoal",
    image: "/collections/grey.png",
  },
  {
    name: "Sprinkle Glow",
    slug: "sprinkle",
    image: "/collections/sprinkle.png",
  },
  {
    name: "Plain Matte",
    slug: "matte",
    image: "/collections/matte.png",
  },
  {
    name: "50-50 Blend",
    slug: "blend",
    image: "/collections/blend.png",
  },
  {
    name: "White Glow",
    slug: "white",
    image: "/collections/white.png",
  },
  {
    name: "Serene",
    slug: "serene",
    image: "/collections/serene.png",
  },
  {
    name: "Designer",
    slug: "designer",
    image: "/collections/designer.png",
  },
  {
    name: "Pillar Outer",
    slug: "linear",
    image: "/collections/linear.png",
  },
];

export default function CollectionGrid() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-20">
  <h2 className="text-3xl mb-10">Explore Collections</h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
    {collections.map((item) => (
      <Link
        key={item.slug}
        href={`/products?material=${encodeURIComponent(item.slug.toLowerCase())}`}
        className="relative rounded-xl overflow-hidden group block"
      >
        {/* Square Image */}
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3 text-white">
          {item.name}
        </div>

      </Link>
    ))}
  </div>
</section>
  );
}