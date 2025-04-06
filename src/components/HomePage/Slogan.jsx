import React from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

const Slogan = () => {
  return (
    <div className="  border-t-2 border-black      border-b-2   p-6 sm:p-8  shadow-lg w-full transition-shadow duration-300 ">
      {/* Horizontal Line at the End */}
      
      <div className="container mx-auto flex flex-col md:flex-row ">{/* Logo Section */}
      <div className="mb-6 pl-4 md:mb-0 flex justify-start md:justify-start">
        <img
          src="/logo.png"
          alt="Company Logo"
          className="w-28 h-28 md:w-40 md:h-40 object-cover"
        />
      </div>

      {/* Slogan Section */}
      <div className="text-start md:text-left  space-y-4 mt-10">
        <div className="flex flex-col leading-tight items-start md:items-start">
          <p className="text-2xl md:text-3xl font-semibold">यत्र नार्यस्तु पूज्यन्ते रमन्ते तत्र देवताः । मनुस्मृति ३/५६</p>
          <p className={`text-lg md:text-xl font-medium ${roboto.className}`}>
            Where women are worshiped, there lives the Gods.
          </p>
        </div>
      </div></div>
    </div>
  );
};

export default Slogan;
