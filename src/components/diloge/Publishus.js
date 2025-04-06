"use client";
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { createWritePublish } from "@/utils/WriteandPublish";

const PublishDialog = ({ open, onClose }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    details_pdf_url: "",
    registration_link: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleUpload = (res) => {
    setFormData({ ...formData, details_pdf_url: res[0].url });
  };

  const handleDeletePDF = () => {
    setFormData({ ...formData, details_pdf_url: "" });
  };

  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = formData.details_pdf_url;
    link.download = "document.pdf"; // Default name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const validateFields = () => {
    let newErrors = {};
    const requiredFields = ["title", "registration_link"];

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
      const result = await createWritePublish(
        formData.title,
        formData.details_pdf_url,
        formData.registration_link
      );
      if (result.success) {
        alert("Write Publish created successfully!");
        onClose();
        setFormData({
          title: "",
          details_pdf_url: "",
          registration_link: "",
        });
        router.refresh();
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error creating Write and Publish:", error);
      alert("Failed to create Write and Publish");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Create a Write and Publish us</DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["title", "registration_link"].map((name) => (
            <div key={name}>
              <label>{name.replace("_", " ").toUpperCase()}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={`border p-2 w-full ${errors[name] ? "border-red-500" : ""}`}
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}
        </div>

        <div className="grid gap-2 mt-4">
          <label>Upload PDF</label>
          {!formData.details_pdf_url ? (
            <UploadButton endpoint="bookPDF" onClientUploadComplete={handleUpload} className="p-5" />
          ) : (
            <div className="flex items-center gap-4 border p-2 rounded">
              <button
                onClick={handleDownloadPDF}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Download PDF
              </button>
              <button
                onClick={handleDeletePDF}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PublishDialog;
