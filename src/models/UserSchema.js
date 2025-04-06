import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email format validation
  },
  phone: {
    type: String,
    required: true,
    match: /^\d{10}$/, // Validates exactly 10 digits
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Ensures a minimum password length of 6
  },
  role: {
    type: String,
    default:'admin',
    // enum: ['admin'], // Allows only these values
    // required: true,
  },
}, {
  timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
});

export default mongoose.models.User || mongoose.model("User", userSchema);