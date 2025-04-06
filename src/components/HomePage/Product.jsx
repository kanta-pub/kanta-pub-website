"use client"
import { getAllBooks } from "@/utils/Book";
import Link from "next/link";
import React, { useEffect, useState } from "react";


const Shopping = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllBooks();
      if (response.success) {
        setProducts(response.data);
      } else {
        console.error(response.error);
      }
    };

    fetchProducts();
  }, []);

  const featuredProduct = products[0];

  return (
    <div className="p-8 container mx-auto">
      <h1 className="text-5xl mb-5 md:mb-16 lg:mb-0 font-serif text-end">Our Products</h1>

      {featuredProduct && (
        <div className="flex flex-col lg:flex-row items-center gap-8 ">
          <div className="w-full lg:w-1/3 h-[300px] md:h-[500px]">
            <img
              src={featuredProduct.image_url}
              alt={featuredProduct.title}
              className="w-full h-full object-contain "
            />
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl md:text-4xl font-serif mb-4">{featuredProduct.title}</h2>
        <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">{featuredProduct.subtitle}</h4>

            <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">₹ {featuredProduct.price}</p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {featuredProduct.about}
            </p>

            <Link href="/shopping">
              <button className="inline-block bg-[#2F2E83] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#24236b] transition">Show All Products</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shopping;
