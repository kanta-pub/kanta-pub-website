"use client";
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { createUser } from "@/utils/User";

const CreateUserDialog = ({ open, onClose }) => {
    const router=useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateFields = () => {
    let newErrors = {};
    const requiredFields = ["name", "email", "phone", "password"];

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
      const result = await createUser(
        {name: formData.name, email: formData.email, phone: formData.phone, password: formData.password}
      );
      if (result.success) {
        alert("User created successfully!");
        onClose();
        setFormData({
            name: "", email: "", phone: "", password: ""
        });
        router.refresh()
      } else {
        alert(result.error);
        
      }
    } catch (error) {
      console.error("Error creating User:", error);
      alert("Failed to create User");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Create a New Book</DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["name", "email", "phone", "password"].map((name) => (
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
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserDialog;
