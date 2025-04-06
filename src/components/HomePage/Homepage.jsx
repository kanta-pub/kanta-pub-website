import React from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const Homepage = () => {
  return (
    <div
      className={`bg-gradient-to-br from-blue-50 via-white to-blue-200 flex flex-col items-center justify-center px-6 py-12 border-b-2 border-black ${roboto.className}`}
    >
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto">
        {/* Left Content */}
        <div
          className="text-center md:text-left md:w-1/2"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <h1 className="text-xl md:text-2xl lg:text-4xl  text-gray-900 ">
            <span className="text-black  hover:text-[#2F2E83] font-bold                   transition-all duration-300">
              Kanta Publication
            </span>
          </h1>

          {/* Paragraph with animation */}
          <p className="text-base md:text-base lg:text-xl text-gray-800 mt-4 leading-relaxed font-medium tracking-normal ">
            is a leading publication house with a passion for preserving{" "}
            <span className="text-[#F07347]  font-bold">Indian culture</span> and
            traditions through writings.
          </p>

          {/* Button Section */}
          <div className="mt-6 md:mt-8">
            <a
              href="/about"
              className="inline-block  bg-[#2F2E83] hover:bg-[#F07347] text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-110"
            >
              Learn More About Us
            </a>
          </div>
        </div>

        {/* Image Section with hover effect */}
        <div
          className="md:w-1/2 w-full lg:pl-5 mt-8 md:mt-0"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <img
            src="/Book.jpeg"
            alt="Featured book from Kanta Publication"
            className="rounded-2xl shadow-2xl w-full h-auto object-cover transition-transform duration-500 transform hover:scale-105"
          />
        </div>
      </div>
        
    </div>
  );
};

export default Homepage;
