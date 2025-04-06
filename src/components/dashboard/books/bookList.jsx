    "use client";
    import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import UpdateBookDialog from "@/components/diloge/updateBook";
import { deleteBook } from "@/utils/Book";

    export default function BookList({ books }) {
      // console.log(books)
        const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
        const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
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
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Subtitle</TableHead>
            <TableHead>Publisher</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Page</TableHead>
            <TableHead>Booksize</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Extra thing</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Format</TableHead>
            <TableHead>Release Year</TableHead>
            <TableHead>Features</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Amazone Link</TableHead>
            <TableHead>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {books?.map((book) => (
            <TableRow key={book?._id} className="border-b">
                <TableCell>
                <img
                    src={book?.image_url || "/placeholder.jpg"}
                    alt={book?.title}
                    className="w-16 h-20 object-cover rounded-md border"
                />
                </TableCell>
                <TableCell className="font-semibold capitalize ">{book?.title}</TableCell>
                <TableCell className="capitalize">{book?.subtitle}</TableCell>
                <TableCell className="capitalize">{book?.publisher}</TableCell>
                <TableCell className="capitalize">{book?.isbn}</TableCell>
                <TableCell className="capitalize">{book?.page}</TableCell>
                <TableCell className="capitalize">{book?.booksize}</TableCell>
                <TableCell className="capitalize">{book?.weight}</TableCell>
                <TableCell className="capitalize">{book?.extrathing}</TableCell>
                <TableCell className="capitalize">{book?.author}</TableCell>
                <TableCell>{book?.release_year}</TableCell>
                <TableCell>{book?.features?.join(", ") || "N/A"}</TableCell>
                <TableCell className="capitalize">{book?.language}</TableCell>
                <TableCell className="font-semibold text-green-600">₹{book?.price}</TableCell>
                <TableCell className={`font-semibold ${book?.quantity_available > 0 ? "text-green-600" : "text-red-600"}`}>
                {book?.quantity_available}
                </TableCell>
                <TableCell className="text-sm max-w-xs truncate"><a href={book?.amazon_link}>Click Here</a></TableCell>
                <TableCell>
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleUpdateClick(book)}>Update</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDeleteClick(book)}>Delete</button>
              </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this book?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Yes</Button>
        </DialogActions>
      </Dialog>

      {/* Update Book Dialog */}
      {updateDialogOpen && (
        <UpdateBookDialog open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)} bookData={selectedBook} />
      )}
        </div>
    );
    }
