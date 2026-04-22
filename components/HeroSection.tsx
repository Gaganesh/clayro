"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] md:h-[90vh] flex items-start bg-[#0f0f0f] text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img
          src="/hero/hero1.png"
          className="w-full h-full object-cover"
        />

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent md:bg-gradient-to-r md:from-black md:via-black/80 md:to-transparent bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>

      {/* CONTENT WRAPPER */}
      <div className="relative z-20 w-full px-4 md:px-10 pt-4 md:pt-6">

        {/* LOGO (SUPER LEFT) */}
        <div className="mb-4 md:mb-6 -ml-2 md:-ml-4">
          <Image
            src="/collections/clayro_gold_logo.png"
            alt="Clayro"
            width={260}
            height={260}
            className="w-[140px] md:w-[200px] lg:w-[240px] xl:w-[260px] h-auto drop-shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3">
            CLAYRO <br />
            Ceramic | Porcelain | BoneChina Collections
          </h1>

          <p className="text-sm md:text-base text-gray-300 mb-4">
            Designed for restaurants, cafés, and hospitality spaces.
            Elegant finishes, durable builds, and consistent supply.
          </p>

          <p className="text-[#d4af37] text-sm md:text-base mb-4">
            Trusted by 200+ hospitality partners across India.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/products"
              className="bg-[#d4af37] text-black px-5 py-3 rounded-full text-sm md:text-base font-medium text-center hover:opacity-90 transition"
            >
              Explore Collection
            </a>

            <a
              href="https://wa.me/919899024814"
              target="_blank"
              className="border border-white px-5 py-3 rounded-full text-sm md:text-base text-center hover:bg-white hover:text-black transition"
            >
              WhatsApp Support
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}