export default function WeOffer() {
  return (
    <section className="flex items-center justify-center px-4">
      <div className="w-full max-w-6xl py-10">
        <div className="flex flex-col items-center mb-8 text-center">
          <h4 className="text-themeGreen text-sm sm:text-md font-medium">
            What we offer
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
            Key Features
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-themeCream flex flex-col items-center text-center p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <img
              src="/featuresAbout/1.jpg"
              alt="Verified Community"
              className="w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 mb-3 object-cover rounded-md"
            />
            <h3 className="font-semibold text-base sm:text-lg">
              Verified Community
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Exclusive to IGDTUW students for trust & safety.
            </p>
          </div>

          <div className="bg-themeCream flex flex-col items-center text-center p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <img
              src="/featuresAbout/2.jpg"
              alt="Quick Posting"
              className="w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 mb-3 object-cover rounded-md"
            />
            <h3 className="font-semibold text-base sm:text-lg">
              Quick Posting & Search
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Easily list or find lost items within seconds.
            </p>
          </div>

          <div className="bg-themeCream flex flex-col items-center text-center p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <img
              src="/featuresAbout/3.jpg"
              alt="Categorized Items"
              className="w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 mb-3 object-cover rounded-md"
            />
            <h3 className="font-semibold text-base sm:text-lg">
              Categorized Items
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Filter by ID cards, books, electronics & more.
            </p>
          </div>

          <div className="bg-themeCream flex flex-col items-center text-center p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <img
              src="/featuresAbout/4.jpg"
              alt="No WhatsApp Forwards"
              className="w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 mb-3 object-cover rounded-md"
            />
            <h3 className="font-semibold text-base sm:text-lg">
              No WhatsApp Spams
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Reduces reliance on notice boards & chat groups.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
