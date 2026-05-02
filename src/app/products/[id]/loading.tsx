export default function LoadingPDP() {
    return (
        <div className="bg-white min-h-screen px-6 md:px-16 py-16">

            <div className="flex flex-col md:flex-row gap-12">

                {/* IMAGE SKELETON */}
                <div className="w-full md:w-[65%]">
                    <div className="w-full h-[400px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] rounded-xl"></div>
                </div>

                {/* CONTENT SKELETON */}
                <div className="w-full md:w-[35%] space-y-4">

                    <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] rounded w-3/4"></div>

                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] rounded w-1/2"></div>

                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] rounded w-1/3"></div>

                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[pulse_1.5s_infinite] rounded w-2/3"></div>

                    <div className="h-24 bg-gray-200 animate-[pulse_1.5s_infinite] rounded"></div>

                    <div className="h-10 bg-gray-300 animate-[pulse_1.5s_infinite] rounded w-40"></div>

                </div>

            </div>
        </div>
    );
}