const collections = [
  "Snow Speckle",
  "Grey Shine",
  "Sprinkle Glow",
  "Plain Matte",
  "50-50 Blend",
  "White Glow",
];

export default function CollectionGrid() {
  return (
    <section className="px-10 py-20">
      <h2 className="text-3xl mb-10">Explore Collections</h2>

      <div className="grid grid-cols-3 gap-6">
        {collections.map((item, index) => (
          <div
            key={index}
            className="h-60 bg-gray-200 rounded-xl flex items-end p-4 hover:scale-105 transition"
          >
            <h3 className="text-lg font-semibold">{item}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}