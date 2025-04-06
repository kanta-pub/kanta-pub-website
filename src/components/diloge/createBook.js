"use client";
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { UploadButton } from "@/utils/uploadthing";
import { createBook } from "@/utils/Book";
import { useRouter } from "next/navigation";

const BookDialog = ({ open, onClose }) => {
    const router=useRouter()
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    publisher:"",
    isbn:"",
    page:"",
    booksize:"",
    weight:"",
    extrathing:"",
    author: "",
    format: "Hardcover",
    release_year: "",
    features: "",
    language: "",
    price: "",
    quantity_available: "",
    about: "",
    image_url: "",
    amazon_link:"",
  });
  
  const [errors, setErrors] = useState({});

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

  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      const result = await createBook(
        formData.title, formData.subtitle,formData.publisher,formData.isbn,formData.page,formData.booksize,formData.weight,formData.extrathing ,formData.author, formData.format,
        formData.release_year, formData.features, formData.language,
        formData.price, formData.quantity_available, formData.about,
        formData.image_url,formData.amazon_link
      );
      if (result.success) {
        alert("Book created successfully!");
        onClose();
        setFormData({
          title: "", subtitle: "",publisher:"",
          isbn:"",
          page:"",
          booksize:"",
          weight:"",
          extrathing:"", author: "", format: "Hardcover",
          release_year: "", features: "", language: "", price: "",
          quantity_available: "", about: "", image_url: "",amazon_link:""
        });
        router.refresh()
      } else {
        alert(result.error);
        
      }
    } catch (error) {
      console.error("Error creating book:", error);
      alert("Failed to create book");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Create a New Book</DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["title", "subtitle","publisher","isbn","page","booksize","weight","extrathing", "author", "language", "price", "quantity_available", "release_year", "features","amazon_link"].map((name) => (
            <div key={name}>
              <label>{name.replace("_", " ").toUpperCase()}</label>
              <input
                type={name.includes("price") || name.includes("year") ? "number" : "text"}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={`border p-2 w-full ${errors[name] ? "border-red-500" : ""}`}
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}

          <div>
            <label>Format</label>
            <select name="format" value={formData.format} onChange={handleChange} className="border p-2 w-full">
              <option>Hardcover</option>
              <option>Paperback</option>
              <option>Ebook</option>
            </select>
          </div>

          <div>
            <label>About</label>
            <textarea name="about" value={formData.about} onChange={handleChange} className="border p-2 w-full" />
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
        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookDialog;
