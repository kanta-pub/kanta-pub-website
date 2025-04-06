import mongoose from "mongoose";
import slugify from "slugify";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      // required: true,
    },
    booksize: {
      type: String,
      // required: true,
    },
    weight: {
      type: String,
      // required: true,
    },
    extrathing: {
      type: String,
      // required: true,
    },
    author: { 
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
      enum: ["Hardcover", "Paperback", "Ebook"],
    },
    release_year: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      default: [],
    },
    language: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity_available: {
      type: Number,
      default: 1,
    },
    about: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
    },
    amazon_link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate a unique slug
bookSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    let slug = slugify(this.title, { lower: true, strict: true });
    let uniqueSlug = slug;
    let count = 1;

    while (await mongoose.models.Book.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${count}`;
      count++;
    }

    this.slug = uniqueSlug;
  }
  next();
});

export default mongoose.models.Book || mongoose.model("Book", bookSchema);
