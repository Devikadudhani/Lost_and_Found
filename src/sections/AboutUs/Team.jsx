import React from "react";

function Team() {
  return (
    <div className="py-8 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col items-center mb-10 text-center">
          <h4 className="text-themeGreen text-sm sm:text-md font-medium mb-1">
            The people behind it all
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
            Meet Our Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          <div className="bg-white flex flex-col items-center text-center p-4 shadow-md rounded-lg w-full max-w-[260px]">
            <img
              src="/members/harshita.jpg"
              alt="Harshita Bansal"
              className="w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 mb-3 object-cover rounded-md"
            />
            <h3 className="font-semibold text-base sm:text-lg">
              Harshita Bansal
            </h3>
            <p className="text-sm text-themeGreen">Frontend Developer</p>
          </div>

          <div className="bg-white flex flex-col items-center text-center p-4 shadow-md rounded-lg w-full max-w-[260px]">
            <img
              src="/members/ayushi.jpg"
              alt="Ayushi Thakur"
              className="w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 mb-3 object-cover rounded-md"
            />
            <h3 className="font-semibold text-base sm:text-lg">
              Ayushi Thakur
            </h3>
            <p className="text-sm text-themeGreen">Frontend Developer</p>
          </div>

          <div className="bg-white flex flex-col items-center text-center p-4 shadow-md rounded-lg w-full max-w-[260px]">
            <img
              src="/members/Diya_2.jpg"
              alt="Diya Kotru"
              className="w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 mb-3 object-cover rounded-md"
            />
            <h3 className="font-semibold text-base sm:text-lg">
              Diya Kotru
            </h3>
            <p className="text-sm text-themeGreen">Backend Developer</p>
          </div>

          <div className="bg-white flex flex-col items-center text-center p-4 shadow-md rounded-lg w-full max-w-[260px]">
            <img
              src="/members/devika.jpg"
              alt="Devika Dudhaniya"
              className="w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 mb-3 object-cover rounded-md"
            />
            <h3 className="font-semibold text-base sm:text-lg">
              Devika Dudhaniya
            </h3>
            <p className="text-sm text-themeGreen">Backend Developer</p>
          </div>

          <div className="bg-white flex flex-col items-center text-center p-4 shadow-md rounded-lg w-full max-w-[260px]">
            <img
              src="/members/akshita.jpg"
              alt="Akshita Tanwar"
              className="w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 mb-3 object-cover rounded-md"
            />
            <h3 className="font-semibold text-base sm:text-lg">
              Akshita Tanwar
            </h3>
            <p className="text-sm text-themeGreen">Backend Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
