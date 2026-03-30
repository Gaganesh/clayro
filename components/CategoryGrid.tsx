const categories = ["Plates", "Bowls", "Cups & Mugs", "Platters"];

export default function CategoryGrid() {
  return (
    <section className="px-10 py-20 bg-white">
      <h2 className="text-3xl mb-10">Designed for Every Table</h2>

      <div className="grid grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="h-48 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition"
          >
            <h3 className="text-lg font-medium">{cat}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}