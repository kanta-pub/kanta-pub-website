import mongoose from "mongoose";

const writePublishSchema = new mongoose.Schema({
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
}, {
  timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
});

export default mongoose.models.WritePublish  || mongoose.model("WritePublish",  writePublishSchema);