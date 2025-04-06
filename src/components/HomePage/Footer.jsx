'use client';
import React from "react";
import Link from "next/link";
import { FaInstagram, FaTwitter, FaYoutube, FaPinterest } from "react-icons/fa";
import { signOut } from "next-auth/react";

const Footer = ({user}) => {
  // console.log(user)
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-5">
      {/* Logo and Social Media Section */}
      <div className="container mx-auto flex flex-col items-center justify-center md:flex-row md:justify-between px-4">
        {/* Logo */}
        <div className="flex items-center mb-6 md:mb-0">
        <div className="bg-white h-32 w-32 shadow-lg flex items-center justify-center rounded transition-transform transform hover:scale-110       ">
        <img
    src="/logo.png"
    alt="Kanta Publication Logo"
    className="h-full w-full object-cover items-center ml-6"
  />


</div>




          <div className="ml-3">
            <h1 className="text-2xl font-bold text-orange-500">
            {user ? (
  <span className="">Kanta Publication
    <button
                    onClick={() => signOut()} // ✅ Step 3: Call signOut
                    className="text-sm px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition ml-5"
                  >
                    Logout
                  </button>
  </span>
) : (
  <Link href="/login">Kanta Publication</Link>
)}

            </h1>
            {/* <p className="text-gray-400 text-sm">
              Preserving Culture and Knowledge
            </p> */}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="text-center md:text-right">
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex justify-center md:justify-end space-x-6">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/kantapublication"
              target="_blank"
              rel="noopener noreferrer"
              className="  text-pink-500                 hover:text-pink-600 transition-transform transform hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram size={28} />
            </a>
            {/* Twitter */}
            <a
              href="https://twitter.com/kantapubli1111"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-blue-400                hover:text-blue-500 transition-transform transform hover:scale-110"
              aria-label="Twitter"
            >
              <FaTwitter size={28} />
            </a>
            {/* YouTube */}
            <a
              href="https://youtube.com/@ishita-w2r?si=hzuZknWraZfjZie5"
              target="_blank"
              rel="noopener noreferrer"
              className="                 text-red-500 hover:text-red-600 transition-transform transform hover:scale-110"
              aria-label="YouTube"
            >
              <FaYoutube size={28} />
            </a>
            {/* Pinterest */}
            <a
              href="https://www.pinterest.com/kantapublication"
              target="_blank"
              rel="noopener noreferrer"
              className="                     text-red-400 hover:text-red-500 transition-transform transform hover:scale-110"
              aria-label="Pinterest"
            >
              <FaPinterest size={28} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Address Section */}
      <div className="container mx-auto text-center">
        <p className="text-md md:text-base font-medium leading-5 text-white">
          <strong>Address:</strong> D1/191 Smart Space Apartment, Phase 2,
          Danish Nagar, <span>Bhopal, 462026</span>
        </p>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-6 text-center text-gray-500 text-md">
        © {new Date().getFullYear()} Kanta Publication. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
