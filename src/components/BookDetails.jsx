import Link from "next/link";
import React from "react";

const BookDetails = ({ book }) => {
  const colors = ["#F3F4F6", "#E5E7EB", "#D1D5DB", "#9CA3AF"];

  return (
    <div className="flex flex-col  md:flex-row bg-white py-10">
      {/* Left Section - Book Image */}
      <div className="w-full md:w-1/3  flex flex-col items-center">
        <img
          src={book.image_url}
          alt={book.title}
          className="w-full max-w-sm h-[300px] md:h-[500px] rounded-lg shadow-md object-cover"
        />

        {/* Color Options */}
        <div className="flex space-x-3 mt-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 border rounded-md"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>

      {/* Right Section - Book Info */}
      <div className="w-full md:w-1/2  justify-between p-4 text-left">
        {/* Title & Author */}
        <h2 className="text-xl md:text-5xl font-bold text-black mb-2">{book.title}</h2>
        <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">{book.subtitle}</h4>
        <p className="text-lg  md:text-xl text-gray-800 font-medium mb-10">by <strong className="text-black">{book.author}</strong></p>

        {/* Book Details */}
        <p className="text-lg  md:text-xl text-gray-800 mb-2">{book.format} & Multicolor - {book.release_year}</p>
        <p className="text-lg  md:text-xl text-gray-800 mb-2">Publisher:  {book.publisher}</p>
        <p className="text-lg  md:text-xl text-gray-800 mb-2">ISBN: {book.isbn}</p>
        <p className="text-lg  md:text-xl text-gray-800 mb-2">Page: {book.page}</p>
        <p className="text-lg  md:text-xl text-gray-800 mb-2">BookSize:{book.booksize}</p>
        <p className="text-lg  md:text-xl text-gray-800 mb-2">BookWeight:{book.weight}</p>
        <p className="text-lg  md:text-xl text-gray-800 mb-2">Extra Thing:{book.extrathing}</p>
        <p className="text-lg  md:text-xl text-gray-800 mb-5">{book.language} Edition</p>

        {/* Price */}
        <p className="text-xl md:text-3xl font-bold black mb-5">₹ . {book.price}</p>

        {/* Buy Now Button */}
        <a href={book.amazon_link}><button className="mt-4 px-6 py-2 w-1/2   md:w-1/4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700">
          Buy Now
        </button></a>

        {/* Book Description */}
        <p className="mt-5 text-gray-700 text-sm leading-relaxed">
          <strong className="text-black">About the Book:</strong> {book.about}
        </p>
      </div>
    </div>
  );
};

export default BookDetails;
