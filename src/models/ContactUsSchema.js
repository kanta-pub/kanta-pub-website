import mongoose from "mongoose";

const contactSchema  = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name : {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email format validation
  },
  phone: {
    type: String, 
    required: true,
    match: /^\d{10}$/, // Validates exactly 10 digits
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
});

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);