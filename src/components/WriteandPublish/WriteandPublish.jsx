import React from "react";

const WriteAndPublish = ({ writePublishes }) => {
  return (
    <div className="">
      {/* Header */}
      <div className="">
        <h2 className="text-3xl md:text-7xl text-center font-bold text-gray-800 py-20 bg-[#f4f4f1]">
          Write & Publish with Us
        </h2>
      </div>

      {/* Write and Publish Section */}
      <div className="w-full rounded-lg px-5 md:px-10 lg:px-32 py-10">
      {writePublishes.length > 0 ? (
  writePublishes.map((item, index) => (
    <div
      key={index}
      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 border-b border-gray-300 pb-5 mb-5"
    >
      {/* Title */}
      <span className="text-lg font-bold text-gray-700">{item.title}</span>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <a
          href={item.details_pdf_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-6 py-2 text-sm font-medium text-black bg-[#d5b281] rounded-2xl border border-black shadow-md">
            Details
          </button>
        </a>
        <a
          href={item.registration_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-6 py-2 text-sm font-medium text-white bg-[#f4564a] rounded-2xl border border-black shadow-md">
            Registration
          </button>
        </a>
      </div>
    </div>
  ))
) : (
  <div className="w-full py-20 flex flex-col items-center justify-center text-center">
    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
      Exciting Events Coming Soon!
    </h3>
    <p className="text-gray-600 max-w-xl">
      We’re planning something special—stay tuned! Check back soon or subscribe to our newsletter to be the first to know.
    </p>
  </div>
)}

      </div>

      {/* Email Instructions Section */}
      <div className="">
        <div className="container mx-auto px-5 md:px-10 lg:px-32 py-10 bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            Have your own work?
          </h3>
          <p className="text-gray-700 mb-4">
            If you are here with your own work and it aligns with our theme, is an ongoing project, or matches with our ideology — kindly email us at <a href="mailto:kantapublication@gmail.com" className="text-blue-600 underline">kantapublication@gmail.com</a>.
          </p>
          <p className="text-gray-700 mb-4">Please attach:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Detailed Synopsis</li>
            <li>Initial two chapters</li>
            <li>Author Bio</li>
            <li>Targeted Audience</li>
          </ul>
          <p className="text-gray-700 mb-4">In the mail body, please include the following:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Full Name</li>
            <li>Email ID</li>
            <li>Contact Number</li>
          </ul>
          <p className="text-gray-700">
            <strong>Note:</strong> Please allow us 2 months for your manuscript to be considered. We will definitely contact you within this period to notify our decision.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WriteAndPublish;
