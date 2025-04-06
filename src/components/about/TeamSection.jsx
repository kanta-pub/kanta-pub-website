import React from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const TeamSection = () => {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      {/* Image & Content Container */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        
        {/* Image on Left */}
        <div>
          <img
            src='/Aboutuspics.jpeg'
            alt="Team"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Team Details on Right */}
        <div className={`${roboto.className}`}>
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">
            Team
          </h2>
          <hr className="w-16 border-2 border-gray-700 mb-6" />

          {/* Director */}
          <div className={`mb-6 ${roboto.className}`}  >
            <h3 className={`text-lg font-serif font-bold text-gray-700  ${roboto.className}`}>
              Director
            </h3>
            <p className={`text-xl font-serif font-semibold text-gray-900 ${roboto.className}`}>
              Ishita Pateriya
            </p>
            <p className={`text-gray-600 text-sm italic ${roboto.className}`}>
              She is an artist, poet, and writer. She is always eager to explore
              new things in various fields with a calm personality.
            </p>
          </div>

          {/* CEO */}
          <div>
            <h3 className={`text-lg font-serif font-bold text-gray-700 ${roboto.className}`}>
              Chief Executive Officer
            </h3>
            <p className={`text-xl font-serif font-semibold text-gray-900  ${roboto.className}`}>
              Shreya Pateriya
            </p>
            <p className={`text-gray-600 text-sm italic ${roboto.className}`}>
              She is an architect and artist. She is very interested in our
              India’s ancient beauty and loves to explore wide areas. She is
              also the author of our first book.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
