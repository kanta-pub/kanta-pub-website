"use client";
import React, { useState, useEffect } from "react";
import SearchComponent from "../Search";
import { getAllUsers } from "@/utils/User";
import CreateUserDialog from "@/components/diloge/createusers";
import UserList from "./userList";
// import BookDialog from "@/components/diloge/createBook";
import { Button } from "@mui/material";
// import { getAllBooks } from "@/utils/Book";
import Pagination from "@/components/pagination";
// import BookList from "./bookList";

const Users= ({ pageNo, query }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [users, setuser] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchusers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers(pageNo, query);
        setuser(response?.data || []);
        setTotalPages(response?.totalPages || 1);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchusers();
  }, [pageNo, query]); // Runs only when pageNo or query changes

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <SearchComponent className="text-black"/>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsDialogOpen(true)}
        >
          Create User
        </Button>
      </div>

      {loading ? (
        <p className="text-gray-500 mt-4">Loading Users...</p>
      ) : users.length > 0 ? (
        <>
          <UserList users={users} />
          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <p className="text-gray-500 mt-4">No users found.</p>
      )}

      {/* Book Dialog - Controlled by isDialogOpen */}
      <CreateUserDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
};

export default Users;
