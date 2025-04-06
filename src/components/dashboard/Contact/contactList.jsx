"use client";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { deleteContact } from "@/utils/ContactUs";

export default function ContactList({ contacts }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    // const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
  
    const handleDeleteClick = (book) => {
      setSelectedBook(book);
      setDeleteDialogOpen(true);
    };
  
    const handleConfirmDelete = async () => {
        if (selectedBook) {
          const response = await deleteContact(selectedBook._id);
          setDeleteDialogOpen(false);
        }
      }

return (
    <div>
        <Table className="w-full border border-gray-300">
    <TableHeader>
        <TableRow className="bg-gray-100">
        <TableHead>Email</TableHead>
        <TableHead>First Name</TableHead>
        <TableHead>Last Name</TableHead>
        <TableHead>Phone</TableHead>
        <TableHead>Subject</TableHead>
        <TableHead>Message</TableHead>
        <TableHead>Action</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {contacts?.map((book) => (
        <TableRow key={book?._id} className="border-b">
            <TableCell className="font-semibold capitalize ">{book?.email}</TableCell>
            <TableCell className="capitalize">{book?.first_name}</TableCell>
            <TableCell className="capitalize">{book?.last_name}</TableCell>
            <TableCell className="capitalize">{book?.phone}</TableCell>
            <TableCell>{book?.subject}</TableCell>
            <TableCell>{book?.message}</TableCell>
            <TableCell>
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDeleteClick(book)}>Delete</button>
          </TableCell>
        </TableRow>
        ))}
    </TableBody>
    </Table>
    <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>Are you sure you want to delete this Contact?</DialogContent>
    <DialogActions>
      <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>
      <Button onClick={handleConfirmDelete} color="error" variant="contained">Yes</Button>
    </DialogActions>
  </Dialog>

    </div>
);
}
