"use client";
import React, { useState, useEffect } from "react";
import SearchComponent from "../Search";
import { Button } from "@mui/material";
import Pagination from "@/components/pagination";
import { getAllWritePublishes } from "@/utils/WriteandPublish";
import PublishDialog from "@/components/diloge/Publishus";
import PublishList from "./publishList";

const Writeandpublishpage = ({ pageNo, query }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [Publish, setPublish] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublish = async () => {
      try {
        setLoading(true);
        const response = await getAllWritePublishes(pageNo, query);
        setPublish(response?.data || []);
        setTotalPages(response?.totalPages || 1);
      } catch (error) {
        console.error("Error fetching Publishes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublish();
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
          Create Write and Publish
        </Button>
      </div>

      {loading ? (
        <p className="text-gray-500 mt-4">Loading ...</p>
      ) : Publish.length > 0 ? (
        <>
          <PublishList Publish={Publish} />
          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <p className="text-gray-500 mt-4">No Write and Publish  found.</p>
      )}

      {/* Book Dialog - Controlled by isDialogOpen */}
      <PublishDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
};

export default Writeandpublishpage;
