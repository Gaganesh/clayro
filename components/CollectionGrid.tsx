const collections = [
  {
    name: "Snow Speckle",
    image: "/collections/snow.png",
  },
  {
    name: "Grey Shine",
    image: "/collections/grey.png",
  },
  {
    name: "Sprinkle Glow",
    image: "/collections/sprinkle.png",
  },
  {
    name: "Plain Matte",
    image: "/collections/matte.png",
  },
  {
    name: "50-50 Blend",
    image: "/collections/blend.png",
  },
  {
    name: "White Glow",
    image: "/collections/white.png",
  },
];

export default function CollectionGrid() {
  return (
    <section className="px-10 py-20">
      <h2 className="text-3xl mb-10">Explore Collections</h2>

      <div className="grid grid-cols-3 gap-6">
        {collections.map((item, index) => (
          <div key={index} className="relative rounded-xl overflow-hidden group">
            <img
              src={item.image}
              className="w-full h-60 object-cover group-hover:scale-110 transition"
            />
            <div className="absolute bottom-0 bg-black/50 w-full p-3 text-white">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}