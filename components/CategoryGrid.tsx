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
        <section className="px-10 py-20 bg-white">
            <h2 className="text-3xl mb-10">Designed for Every Table</h2>

            <div className="grid grid-cols-4 gap-6">
                {categories.map((cat, index) => (
                    <Link
                        key={index}
                        href={`/products?category=${encodeURIComponent(cat.name)}`}
                        className="relative rounded-xl overflow-hidden group cursor-pointer block"
                    >
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition"
                        />

                        <div className="absolute bottom-0 bg-black/60 w-full p-3 text-white">
                            <h3 className="font-semibold">{cat.name}</h3>
                            <p className="text-xs">{cat.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}