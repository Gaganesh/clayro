import Link from "next/link";

export default function CTASection() {
  return (
    <section className="px-10 py-20 bg-black text-white text-center">
      <h2 className="text-3xl mb-6">
        Let’s Build Your Tableware Experience
      </h2>

      <div className="flex justify-center gap-4">
        <Link
          href="/request-quote"
          className="bg-white text-black px-6 py-3 rounded-full"
        >
          Request Quote
        </Link>
        <a
          href="https://wa.me/919899024814?text=Hi%20Clayro%2C%20I%20am%20interested%20in%20your%20crockery%20products.%20Please%20share%20details."
          target="_blank"
          rel="noopener noreferrer"
          className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
        >
          WhatsApp Now
        </a>
      </div>
    </section>
  );
}