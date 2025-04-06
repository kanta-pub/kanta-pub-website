"use server"
import dbConnect from "@/lib/dbConnect";
import ContactUsSchema from "@/models/ContactUsSchema";
import mongoose from "mongoose";

export const createContact = async (first_name, last_name, email, phone, subject, message) => {
    try {
        await dbConnect();

        if (!first_name || !last_name || !email || !phone || !subject || !message) {
            return { success: false, error: 'All required fields must be provided.' };
        }

        const newContact = new ContactUsSchema({
            first_name,
            last_name,
            email,
            phone,
            subject,
            message
        });

        const savedContact = await newContact.save();
        return { success: true, data: JSON.parse(JSON.stringify(savedContact)) };
    } catch (error) {
        console.error('Error creating contact:', error);
        return { success: false, error: error.message };
    }
};

export const getAllContacts = async (page = 1, searchQuery = "") => {
    try {
        await dbConnect();
        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const query = searchQuery ? {
            $or: [
                { first_name: { $regex: searchQuery, $options: "i" } },
                { last_name: { $regex: searchQuery, $options: "i" } },
                { email: { $regex: searchQuery, $options: "i" } },
            ]
        } : {};

        const contacts = await ContactUsSchema.find(query).skip(skip).limit(pageSize);
        return { success: true, data: JSON.parse(JSON.stringify(contacts)) };
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return { success: false, error: error.message };
    }
};

export const getContactById = async (id) => {
    try {
        await dbConnect();
        const contact = await ContactUsSchema.findById(id);
        if (!contact) {
            throw new Error('Contact not found');
        }
        return { success: true, data: JSON.parse(JSON.stringify(contact)) };
    } catch (error) {
        console.error("Error fetching contact by ID:", error);
        return { success: false, error: error.message };
    }
};

export const deleteContact = async (id) => {
    try {
        await dbConnect();
        await ContactUsSchema.findByIdAndDelete(id);
        return { success: true };
    } catch (error) {
        console.error("Error deleting contact:", error);
        return { success: false, error: error.message };
    }
};
