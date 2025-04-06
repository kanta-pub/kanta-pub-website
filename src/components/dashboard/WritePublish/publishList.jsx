"use client";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteWritePublish } from "@/utils/WriteandPublish";

export default function PublishList({ Publish }) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedId) {
      await deleteWritePublish(selectedId);
    }
    setOpen(false);
    setSelectedId(null);
  };

  return (
    <div>
      <Table className="w-full border border-gray-300">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Title</TableHead>
            <TableHead>Registration</TableHead>
            <TableHead>Download PDF</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Publish?.map((publish) => (
            <TableRow key={publish?._id} className="border-b">
              <TableCell className="font-semibold capitalize">{publish?.title}</TableCell>
              
              <TableCell>
                <a href={publish?.registration_link} target="_blank" rel="noopener noreferrer">
                  <Button variant="contained" color="primary">Register</Button>
                </a>
              </TableCell>
              
              <TableCell>
                {publish?.details_pdf_url ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = publish?.details_pdf_url;
                      link.download = "Book_Details.pdf";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    Download PDF
                  </Button>
                ) : (
                  "No PDF Available"
                )}
              </TableCell>

              <TableCell>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={() => handleDeleteClick(publish?._id)}
                  >
                    Delete
                  </Button>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this item?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} style={{ backgroundColor: "red", color: "white" }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}