"use client";
import React, { useState, useEffect } from "react";
import SearchComponent from "../Search";
import BookDialog from "@/components/diloge/createBook";
import { Button } from "@mui/material";
import { getAllBooks } from "@/utils/Book";
import Pagination from "@/components/pagination";
import BookList from "./bookList";

const BooksHomepage = ({ pageNo, query }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await getAllBooks(pageNo, query);
        setBooks(response?.data || []);
        setTotalPages(response?.totalPages || 1);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [pageNo, query]); // Runs only when pageNo or query changes
  console.log(books,"mkmlm,m")

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <SearchComponent className="text-black"/>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsDialogOpen(true)}
        >
          Create Book
        </Button>
      </div>

      {loading ? (
        <p className="text-gray-500 mt-4">Loading books...</p>
      ) : books.length > 0 ? (
        <>
          <BookList books={books} />
          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <p className="text-gray-500 mt-4">No books found.</p>
      )}

      {/* Book Dialog - Controlled by isDialogOpen */}
      <BookDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
};

export default BooksHomepage;
