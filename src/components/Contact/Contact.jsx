'use client';

import { createContact } from "@/utils/ContactUs";
import { useState } from "react";

export default function Contact() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [showPopup, setShowPopup] = useState(false); // State for popup

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await createContact(
      user.first_name,
      user.last_name,
      user.email,
      user.phone,
      user.subject,
      user.message
    );

    if (response.success) {
      setShowPopup(true); // Show success popup
      setUser({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } else {
      alert("Error: " + response.error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full bg-[#F4F4F1] py-24 mb-6 text-center">
        <h1 className="text-3xl md:text-[3.5rem] font-serif text-black">Contact Us</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-8 md:gap-10">
        <div className="w-full md:w-3/5">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="px-5 py-2 border border-black rounded-full w-full bg-[#F4F4F1] text-black"
                required
                value={user.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone No"
                className="px-5 py-2 border border-black rounded-full w-full bg-[#F4F4F1] text-black"
                required
                value={user.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                className="px-5 py-2 border border-black rounded-full w-full bg-[#F4F4F1] text-black"
                required
                value={user.first_name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="px-5 py-2 border border-black rounded-full w-full bg-[#F4F4F1] text-black"
                required
                value={user.last_name}
                onChange={handleChange}
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="px-5 py-2 border border-black rounded-full w-full bg-[#F4F4F1] text-black"
              required
              value={user.subject}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Message"
              className="px-5 py-2 border border-black rounded w-full h-40 md:h-48 bg-[#F4F4F1] text-black"
              required
              value={user.message}
              onChange={handleChange}
            ></textarea>
            <div className="flex justify-end px-4 sm:px-8">
              <button
                type="submit"
                className="bg-[#F4F4F1] text-black px-5 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-[#e0623b] transition-all "
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-2/5 space-y-4">
          <div className="space-y-2">
            <p className="px-5 py-2 border border-black rounded-full bg-[#F5D549] text-black font-bold">
              Contact No: +91 74151-99273
            </p>
            <p className="px-5 py-2 border border-black rounded-full bg-[#F5D549] text-black font-bold">
              Email Id: kantapublication@gmail.com
            </p>
            <p className="px-5 py-2 border border-black rounded-full bg-[#F5D549] text-black font-bold">
            Address: D1/191 Smart Space Apartment, Phase 2, Danish Nagar, Bhopal, 462026
            </p>
          </div>

          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3141.815942814962!2d77.45597854139251!3d23.185345055394166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDExJzA4LjciTiA3N8KwMjcnMjkuMCJF!5e0!3m2!1sen!2sin!4v1743390282099!5m2!1sen!2sin"
               width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="object-cover rounded-[14px] md:rounded-[38px]"
            />
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-black">Thank you for connecting with us!</h2>
            <p className="text-black">We will contact you soon.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-6 py-2 bg-[#e0623b] text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
