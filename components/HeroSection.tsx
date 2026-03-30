export default function HeroSection() {
  return (
    <section className="h-screen flex items-center justify-between px-10">
      <div className="max-w-xl">
        <h1 className="text-5xl font-bold mb-4">Clayro</h1>
        <h2 className="text-2xl mb-6">Crafted for Modern Dining</h2>
        <p className="mb-6 text-gray-600">
          Premium ceramic tableware designed for restaurants,
          cafés, and hospitality spaces.
        </p>

        <div className="flex gap-4">
          <button className="bg-black text-white px-6 py-3 rounded-full">
            Explore Collection
          </button>
          <button className="border px-6 py-3 rounded-full">
            Request Catalogue
          </button>
        </div>
      </div>

      <div className="w-1/2">
        <img
          src="/clayro.png"
          alt="Clayro crockery"
          className="rounded-xl"
        />
      </div>
    </section>
  );
}