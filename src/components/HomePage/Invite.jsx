import Link from "next/link";
import React from "react";

const Invite = () => {
  return (
<div className="bg-[#272974]  p-6 bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
{/* First Section */}
      <section
  className="bg-[#272974] container mx-auto p-6 sm:p-8 rounded-xl shadow-lg mb-8 w-full   hover:rounded-xl        transition-transform duration-500 transform "
  data-aos="fade-up"
  data-aos-duration="1000"
>
  <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-white text-center leading-tight mb-4 sm:mb-6 drop-shadow-md">
    We invite interested people to research, learn, and write with us
    about India’s culture, manuscripts, treaties, traditions, and more.
  </h1>
  <p
    className="text-base sm:text-lg md:text-xl font-semibold text-[#F07347] text-center"
    data-aos="fade-right"
    data-aos-delay="200"
  >
    <Link href="/publish">Write and Publish with Us</Link>
  </p>
</section>



      {/* Second Section */}
      <section
        className="container mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl mb-8 w-full transition-shadow duration-300 hover:shadow-2xl"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <div className="flex flex-col lg:flex-row items-center text-center lg:text-left">
          {/* Left Image */}
          <img
            src="/intro.jpg"
            alt="A representation of our mission"



// img small

            className="w-full sm:w-2/3 md:w-1/2 lg:w-60 rounded-lg shadow-md mb-4 lg:mb-0 lg:mr-6 transform transition-transform duration-300 hover:scale-105"
          />

          {/* Content */}
          <div className="lg:ml-10 w-full lg:w-3/5">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4 text-center lg:text-center"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              Introducing Ourselves
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-800 mb-4 sm:mb-6 mx-auto max-w-xl leading-relaxed">
              We aim to establish{" "}
              <span className="text-[#F07347] font-bold">ancient knowledge</span>{" "}
              as the beam of the new generation, inspiring their focus on knowledge,
              ethics, and{" "}
              <span className="text-[#F07347] font-bold">self-determination</span>, away from
              distraction.
            </p>

            {/* Button */}
            <div
              className="w-full flex justify-center lg:justify-center"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <Link href="/about"><button className="w-full sm:w-auto bg-[#2F2E83] hover:bg-[#F07347] text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-110">
                Link to About
              </button></Link>
            </div>
          </div>

          {/* Right Image (Visible on lg screens) */}
          <img
            src="/intro.jpg"
            alt="Another representation of our mission"
            className="hidden lg:block lg:w-60 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      </section>

      
    </div>
  );
};

export default Invite;
