export default function Loading() {
  return (
    <div className="bg-[#f7f5f2] px-6 md:px-10 py-10 space-y-16">

      {/* HERO SECTION */}
      <div className="flex flex-col md:flex-row gap-10 items-center">

        {/* LEFT TEXT */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="h-10 w-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
          <div className="h-6 w-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-72 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>

          <div className="h-10 w-36 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full mt-4"></div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-1/2 h-[300px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl"></div>
      </div>

      {/* COLLECTION GRID */}
      <div>
        <div className="h-8 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded mb-6"></div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl"
            ></div>
          ))}
        </div>
      </div>

      {/* CATEGORY GRID */}
      <div>
        <div className="h-8 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded mb-6"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl"
            ></div>
          ))}
        </div>
      </div>

      {/* WHY SECTION */}
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-28 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl"
          ></div>
        ))}
      </div>

      {/* CTA SECTION */}
      <div className="flex justify-center">
        <div className="h-12 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>
      </div>

    </div>
  );
}