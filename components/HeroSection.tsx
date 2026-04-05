"use client";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/hero/hero1.png",
    title: "Crafted for Fine Dining",
    subtitle: "Elevate every plating experience",
  },
  {
    image: "/hero/hero2.png",
    title: "Designed for HORECA",
    subtitle: "Built for high-volume service",
  },
  {
    image: "/hero/hero3.png",
    title: "Premium Ceramic Finish",
    subtitle: "Where design meets durability",
  },
  {
    image: "/hero/hero4.png",
    title: "Modern Tableware",
    subtitle: "Minimal aesthetics for modern spaces",
  },
  {
    image: "/hero/hero5.png",
    title: "Reliable Bulk Supply",
    subtitle: "Consistency you can trust",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2000); // ✅ 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex items-center justify-between px-10 py-16 gap-10 bg-[#f7f5f2]">

      {/* LEFT CONTENT */}
      <div className="w-[40%]">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          Clayro
        </h1>

        <h2 className="text-2xl mb-6 text-gray-700">
          Crafted for Modern Dining
        </h2>

        <p className="mb-6 text-gray-600">
          Premium ceramic crockeries designed for restaurants,
          cafés, and hospitality spaces.
        </p>

        <div className="flex gap-4">
          <a
            href="/products"
            className="bg-black text-white px-6 py-3 rounded-full"
          >
            Explore Collection
          </a>

          <a
            href="https://wa.me/919899024814?text=Hi%20Clayro%2C%20please%20share%20your%20latest%20crockery%20catalogue."
            target="_blank"
            className="border border-black px-6 py-3 rounded-full"
          >
            Request Catalogue
          </a>
        </div>
      </div>

      {/* RIGHT CAROUSEL */}
      <div className="w-[60%] h-[65vh] relative overflow-hidden rounded-2xl shadow-lg">

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100 z-10" : "opacity-0"
            }`}
          >
            {/* IMAGE */}
            <img
              src={slide.image}
              className="w-full h-full object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* TEXT ON IMAGE */}
            <div className="absolute bottom-10 left-10 text-white max-w-md">
              <h2 className="text-3xl font-semibold mb-2 animate-fade-in">
                {slide.title}
              </h2>
              <p className="text-gray-200 animate-fade-in">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}