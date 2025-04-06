"use client";
import React, { useState, useEffect } from "react";
import SearchComponent from "../Search";
import { Button } from "@mui/material";
import Pagination from "@/components/pagination";
import { getAllEvents } from "@/utils/Event";
import EventsDialog from "@/components/diloge/eventsDilouge";
import EventList from "./eventList";

const Events = ({ pageNo, query }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getAllEvents(pageNo, query);
        setEvents(response?.data || []);
        setTotalPages(response?.totalPages || 1);
      } catch (error) {
        console.error("Error fetching Events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [pageNo, query]); // Runs only when pageNo or query changes
//   console.log(books,"mkmlm,m")

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <SearchComponent className="text-black"/>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsDialogOpen(true)}
        >
          Create Events
        </Button>
      </div>

      {loading ? (
        <p className="text-gray-500 mt-4">Loading ...</p>
      ) : events.length > 0 ? (
        <>
          <EventList events={events} />
          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <p className="text-gray-500 mt-4">No Events  found.</p>
      )}

      {/* Book Dialog - Controlled by isDialogOpen */}
      <EventsDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
};

export default Events;
