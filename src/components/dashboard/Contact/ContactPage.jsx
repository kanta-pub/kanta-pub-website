"use client";
import React, { useState, useEffect } from "react";
import SearchComponent from "../Search";
import Pagination from "@/components/pagination";
import { getAllContacts } from "@/utils/ContactUs";
import ContactList from "./contactList";


const ContactPage = ({ pageNo, query }) => {
  const [contact, setContact] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const response = await getAllContacts(pageNo, query);
        setContact(response?.data || []);
        setTotalPages(response?.totalPages || 1);
      } catch (error) {
        console.error("Error fetching Contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [pageNo, query]); 

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <SearchComponent className="text-black"/>
      </div>

      {loading ? (
        <p className="text-gray-500 mt-4">Loading Contact...</p>
      ) : contact.length > 0 ? (
        <>
          <ContactList contacts={contact} />
          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <p className="text-gray-500 mt-4">No Contacts found.</p>
      )}
    </div>
  );
};

export default ContactPage;









