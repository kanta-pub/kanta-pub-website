import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details_pdf_url: {
    type: String,
    required: true
  },
  registration_link: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
});

export default mongoose.models.Event || mongoose.model("Event", eventSchema);