export default function LoadingProducts() {
    return (
        <div className="px-6 md:px-10 py-16 bg-[#f7f5f2] min-h-screen">

            <div className="h-8 w-48 bg-gray-300 animate-pulse mb-10 rounded"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow">

                        <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>

                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse mt-4 w-3/4 rounded"></div>

                        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse mt-2 w-1/2 rounded"></div>

                    </div>
                ))}

            </div>
        </div>
    );
}