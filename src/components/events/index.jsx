"use client"
import { getAllEvents } from "@/utils/Event";
import React, { useEffect, useState } from "react";


const EventHomepage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getAllEvents();
      if (response.success) {
        setEvents(response.data);
      } else {
        console.error(response.error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="">
      {/* Header */}
      <div className="">
        <h2 className="text-3xl md:text-9xl items-center text-center font-bold text-black py-20 bg-[#d53c49]">
          Upcoming Events
        </h2>
      </div>

      {/* Events Section */}
      <div className="w-full rounded-lg p-4 pt-5 md:pt-0 lg:p-10 lg:px-32">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="flex  md:flex-row gap-0 justify-between items-center pb-5 mb-5 last:border-none last:pb-0">
              {/* Event Title */}
              <span className="text-lg font-bold text-gray-700">{event.title}</span>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-5">
                <a href={event.details_pdf_url} target="_blank" rel="noopener noreferrer">
                  <button className="px-10 py-2 text-sm font-medium text-black bg-[#f6a20e] rounded-2xl border border-solid border-black shadow-md">
                    Details
                  </button>
                </a>
                <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                  <button className="px-10 py-2 text-sm font-medium text-black bg-[#f4564a] rounded-2xl border border-solid border-black shadow-md">
                    Registration
                  </button>
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default EventHomepage;
