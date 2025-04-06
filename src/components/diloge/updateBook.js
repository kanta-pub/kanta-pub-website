"use client";
import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { updateBook } from "@/utils/Book";

const UpdateBookDialog = ({ open, onClose, bookData }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bookData) {
      setFormData(bookData);
    }
  }, [bookData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleUpload = (res) => {
    setFormData({ ...formData, image_url: res[0].url });
  };

  const handleDeleteImage = () => {
    setFormData({ ...formData, image_url: "" });
  };

  const validateFields = () => {
    let newErrors = {};
    const requiredFields = ["title", "subtitle", "publisher","isbn", "author", "format", "release_year", "language", "price", "about","amazon_link"];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateFields()) return;

    try {
      const result = await updateBook(formData._id, formData);
      if (result.success) {
        alert("Book updated successfully!");
        onClose();
        router.refresh();
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Update Book</DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["title", "subtitle","publisher","isbn","page","booksize","weight","extrathing", "author", "language", "price", "quantity_available", "release_year", "features","amazon_link"].map((name) => (
            <div key={name}>
              <label>{name.replace("_", " ").toUpperCase()}</label>
              <input
                type={name.includes("price") || name.includes("year") ? "number" : "text"}
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                className={`border p-2 w-full ${errors[name] ? "border-red-500" : ""}`}
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}

          <div>
            <label>Format</label>
            <select name="format" value={formData.format || "Hardcover"} onChange={handleChange} className="border p-2 w-full">
              <option>Hardcover</option>
              <option>Paperback</option>
              <option>Ebook</option>
            </select>
          </div>

          <div>
            <label>About</label>
            <textarea name="about" value={formData.about || ""} onChange={handleChange} className="border p-2 w-full" />
          </div>
        </div>

        <div className="grid gap-2 mt-4">
          <label>Upload Image</label>
          {!formData.image_url ? (
            <UploadButton endpoint="bookImage" onClientUploadComplete={handleUpload} className="p-5" />
          ) : (
            <div className="relative w-32 h-32 border p-2">
              <img src={formData.image_url} alt="Book" className="w-full h-full object-cover" />
              <button className="absolute top-0 right-0 bg-red-500 text-white p-1" onClick={handleDeleteImage}>X</button>
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateBookDialog;
