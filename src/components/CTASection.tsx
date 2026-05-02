import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full py-20 md:py-24 bg-[#f6f3ef] text-center text-black">

      <div className="max-w-3xl mx-auto px-6">

        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 leading-tight">
          Let’s Build Your Tableware Experience
        </h2>

        {/* SUBTEXT */}
        <p className="text-gray-600 text-sm md:text-base mb-8">
          Whether you’re setting up a new restaurant or upgrading your current collection,
          Clayro offers premium ceramic solutions tailored for modern hospitality.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <Link
            href="/request-quote"
            className="bg-black text-white px-6 py-3 rounded-full text-sm md:text-base font-medium hover:opacity-90 transition"
          >
            Request Quote
          </Link>

          <a
            href="https://wa.me/919899024814?text=Hi%20Clayro%2C%20I%20am%20interested%20in%20your%20crockery%20products.%20Please%20share%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="border border-black text-black px-6 py-3 rounded-full text-sm md:text-base hover:bg-black hover:text-white transition"
          >
            WhatsApp Now
          </a>
        </div>

        {/* TRUST LINE */}
        <div className="text-xs md:text-sm text-gray-500">
          Trusted by 200+ hospitality partners • Bulk supply available • Consistent quality guaranteed
        </div>

      </div>
    </section>
  );
}