"use client";

export default function RequestQuote() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4 py-20">
      
      <div className="w-full md:w-[60%]">
        
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl mb-10 text-center font-semibold text-gray-800">
          Request a Quote
        </h1>

        <form
          action="https://formspree.io/f/xrbqabcd"
          method="POST"
          className="flex flex-col gap-5"
        >
        <input type="hidden" name="_subject" value="New Clayro Quote Request" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_redirect" value="https://clayroworld.com/thank-you" />
          <input
            name="name"
            placeholder="Your Name"
            className="border border-gray-300 p-4 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            className="border border-gray-300 p-4 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            name="email"
            placeholder="Email"
            className="border border-gray-300 p-4 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            name="business"
            placeholder="Restaurant / Hotel Name"
            className="border border-gray-300 p-4 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            name="quantity"
            placeholder="Quantity Required"
            className="border border-gray-300 p-4 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Bigger textarea */}
          <textarea
            name="message"
            placeholder="Your Requirement (mention product, size, material, etc.)"
            rows={6}
            className="border border-gray-300 p-4 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black resize-none"
          />

          <button className="bg-black text-white py-4 rounded-full hover:bg-gray-800 transition text-lg">
            Submit Request
          </button>
        </form>

      </div>
    </div>
  );
}