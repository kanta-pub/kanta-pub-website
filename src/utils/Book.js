"use server"

import dbConnect from "@/lib/dbConnect";
import bookSchema from "@/models/bookSchema";
import ContactUsSchema from "@/models/ContactUsSchema";
import EventsSchema from "@/models/EventsSchema";
import WriteandPublishSchema from "@/models/WriteandPublishSchema";
import mongoose from "mongoose";

export const createBook = async (title, subtitle,publisher,isbn,page,booksize,weight,extrathing, author, format, release_year, features, language, price, quantity_available, about,image_url,amazon_link) => {
    console.log(title, subtitle, author, format, release_year, features, language, price, quantity_available, about,image_url)
    try {
        await dbConnect();

        if (!title || !subtitle||!publisher||!isbn || !author || !format || !release_year || !language || !price || !about) {
            return { success: false, error: 'All required fields must be provided.' };
        }

        const newBook = new bookSchema({
            title,
            subtitle,
            publisher,
            isbn,
            page,
            booksize,
            weight,
            author,
            format,
            release_year,
            features: features || [],
            language,
            price,
            quantity_available: quantity_available || 1,
            about,
            image_url,
            amazon_link
        });

        const savedBook = await newBook.save();
        return { success: true, data: JSON.parse(JSON.stringify(savedBook)) };
    } catch (error) {
        console.error('Error creating book:', error);
        return { success: false, error: error.message };
    }
};

export const getAllBooks = async (page = 1, searchQuery = "") => {
    try {
        await dbConnect();
        const pageSize = 10;
        const skip = (page - 1) * pageSize;
        const query = searchQuery ? {
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { subtitle: { $regex: searchQuery, $options: "i" } },
                { author: { $regex: searchQuery, $options: "i" } },
            ]
        } : {};

        console.log("Query:", query);
        const books = await bookSchema.find(query).skip(skip).limit(pageSize);
        return { success: true, data: JSON.parse(JSON.stringify(books)) };
    } catch (error) {
        console.error("Error fetching all books:", error);
        return { success: false, error: error.message };
    }
};

export const getBookById = async (id) => {
    try {
        await dbConnect();
        const book = await bookSchema.findById(id);
        if (!book) {
            throw new Error('Book not found');
        }
        return { success: true, data: JSON.parse(JSON.stringify(book)) };
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        return { success: false, error: error.message };
    }
};

export const getBookBySlug = async (slug) => {
    try {
        await dbConnect();
        const book = await bookSchema.findOne({ slug });
        if (!book) {
            throw new Error('Book not found');
        }
        return { success: true, data: JSON.parse(JSON.stringify(book)) };
    } catch (error) {
        console.error("Error fetching book by slug:", error);
        return { success: false, error: error.message };
    }
};
export const updateBook = async (id, updatedData) => {
    try {
        await dbConnect();
        const updatedBook = await bookSchema.findByIdAndUpdate(id, updatedData, { new: true });
        return { success: true, data: JSON.parse(JSON.stringify(updatedBook)) };
    } catch (error) {
        console.error("Error updating book:", error);
        return { success: false, error: error.message };
    }
};

export const deleteBook = async (id) => {
    try {
        await dbConnect();
        await bookSchema.findByIdAndDelete(id);
        return { success: true };
    } catch (error) {
        console.error("Error deleting book:", error);
        return { success: false, error: error.message };
    }
};

export const getBooksByAuthor = async (author) => {
    try {
        await dbConnect();
        const books = await bookSchema.find({ author });
        return { success: true, data: JSON.parse(JSON.stringify(books)) };
    } catch (error) {
        console.error("Error fetching books by author:", error);
        return { success: false, error: error.message };
    }
};



export const getTotalCounts = async () => {
    try {
        await dbConnect();
      const [
        bookCount,
        eventCount,
        writePublishCount,
        contactCount
      ] = await Promise.all([
        bookSchema.countDocuments(),
        EventsSchema.countDocuments(),
        WriteandPublishSchema.countDocuments(),
        ContactUsSchema.countDocuments(),
      ]);
  
      return {
        totalBooks: JSON.parse(JSON.stringify(bookCount)),
        totalEvents: JSON.parse(JSON.stringify(eventCount)),
        totalWritePublish: JSON.parse(JSON.stringify(writePublishCount)),
        totalContacts: JSON.parse(JSON.stringify(contactCount)),
      };
    } catch (error) {
      console.error("Error fetching total counts:", error);
      throw error;
    }
  };