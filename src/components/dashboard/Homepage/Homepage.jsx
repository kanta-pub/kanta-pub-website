"use client"
import { useState } from "react";
import { Book, Mail, Calendar, Edit } from "lucide-react";
import { BookChart } from "../book-chart";

export default function Dashboard({data}) {
  const [totalBooks, setTotalBooks] = useState(data.totalBooks);
  const [totalContacts, setTotalContacts] = useState(data.totalContacts);
  const [activeEvents, setActiveEvents] = useState(data.totalEvents);
  const [totalPublished, setTotalPublished] = useState(data.totalWritePublish);

  return (
    <>
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Total Books</h3>
            <Book className="h-4 w-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold">{totalBooks}</div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Contact Requests</h3>
            <Mail className="h-4 w-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold">{totalContacts}</div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Active Events</h3>
            <Calendar className="h-4 w-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold">{activeEvents}</div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Published Works</h3>
            <Edit className="h-4 w-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold">{totalPublished}</div>
        </div>
      </div>
      <div className="p-4">
        {/* <h3 className="text-lg font-semibold">Book Inventory</h3> */}
        <div className="pl-2">
          {/* <BookChart /> */}
        </div>
      </div>
    </div>
    </>
  );
}
