"use client";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
// import UpdateBookDialog from "@/components/diloge/updateBook";
// import { deleteBook } from "@/utils/Book";

export default function UserList({ users }) {
    // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    // const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
  
    const handleDeleteClick = (book) => {
      setSelectedBook(book);
      setDeleteDialogOpen(true);
    };
  
    const handleConfirmDelete = async () => {
        if (selectedBook) {
          const response = await deleteBook(selectedBook._id);
          setDeleteDialogOpen(false);
        }
      };
  
    const handleUpdateClick = (book) => {
      setSelectedBook(book);
      setUpdateDialogOpen(true);
    };

return (
    <div>
        <Table className="w-full border border-gray-300">
    <TableHeader>
        <TableRow className="bg-gray-100">
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Phone</TableHead>
        <TableHead>Role</TableHead>
        {/* <TableHead>Format</TableHead>
        <TableHead>Release Year</TableHead>
        <TableHead>Features</TableHead>
        <TableHead>Language</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Quantity</TableHead>
        {/* <TableHead>About</TableHead> */}
        </TableRow>
    </TableHeader>
    <TableBody>
        {users?.map((user) => (
        <TableRow key={user?._id} className="border-b">
            <TableCell className="font-semibold capitalize ">{user?.name}</TableCell>
            <TableCell className="capitalize">{user?.email}</TableCell>
            <TableCell className="capitalize">{user?.phone}</TableCell>
            <TableCell className="capitalize">{user?.role}</TableCell>
        </TableRow>
        ))}
    </TableBody>
    </Table>
    {/* <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>Are you sure you want to delete this book?</DialogContent>
    <DialogActions>
      <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>
      <Button onClick={handleConfirmDelete} color="error" variant="contained">Yes</Button>
    </DialogActions>
  </Dialog> */}

  {/* Update Book Dialog */}
  {/* {updateDialogOpen && (
    <UpdateBookDialog open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)} bookData={selectedBook} />
  )} */}
    </div>
);
}
