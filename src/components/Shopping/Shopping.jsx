
import Link from "next/link";
import React from "react";


const Shopping = ({products}) => {
  console.log(products)
  return (
    <>
      <div className="bg-[#412118] text-white text-3xl md:text-7xl text-center font-semibold p-24">
        Our Products
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 p-10">
        {products.length > 0 ? (
          products.map((product) => (
            <Link href={`/shopping/${product.slug}`} key={product._id}>
            <div key={product._id} className="text-left  p-5 rounded-lg">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-auto object-cover rounded-md mb-10"
              />
              <h3 className="mt-4 text-xl md:text-4xl font-semibold mb-5">{product.title}</h3>
              <p className="text-xl md:text-xl font-semibold text-gray-800 mb-4">{product.subtitle}</p>
              <p className="text-2xl font-semibold mt-2">₹ {product.price}</p>
            </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-3">No products available.</p>
        )}
      </div>
    </>
  );
};

export default Shopping;
