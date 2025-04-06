"use server"
import dbConnect from "@/lib/dbConnect";
import eventSchema from "@/models/EventsSchema";
import mongoose from "mongoose";

export const createEvent = async (title, details_pdf_url, registration_link) => {
    try {
        await dbConnect();

        if (!title || !details_pdf_url || !registration_link) {
            return { success: false, error: 'All required fields must be provided.' };
        }

        const newEvent = new eventSchema({
            title,
            details_pdf_url,
            registration_link
        });

        const savedEvent = await newEvent.save();
        return { success: true, data: JSON.parse(JSON.stringify(savedEvent)) };
    } catch (error) {
        console.error('Error creating event:', error);
        return { success: false, error: error.message };
    }
};

export const getAllEvents = async (page = 1, searchQuery = "") => {
    try {
        await dbConnect();
        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const query = searchQuery ? {
            title: { $regex: searchQuery, $options: "i" }
        } : {};

        const events = await eventSchema.find(query).skip(skip).limit(pageSize);
        return { success: true, data: JSON.parse(JSON.stringify(events)) };
    } catch (error) {
        console.error("Error fetching events:", error);
        return { success: false, error: error.message };
    }
};

export const getEventById = async (id) => {
    try {
        await dbConnect();
        const event = await eventSchema.findById(id);
        if (!event) {
            throw new Error('Event not found');
        }
        return { success: true, data: JSON.parse(JSON.stringify(event)) };
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        return { success: false, error: error.message };
    }
};

export const updateEvent = async (id, updatedData) => {
    try {
        await dbConnect();
        const updatedEvent = await eventSchema.findByIdAndUpdate(id, updatedData, { new: true });
        return { success: true, data: JSON.parse(JSON.stringify(updatedEvent)) };
    } catch (error) {
        console.error("Error updating event:", error);
        return { success: false, error: error.message };
    }
};

export const deleteEvent = async (id) => {
    try {
        await dbConnect();
        await eventSchema.findByIdAndDelete(id);
        return { success: true };
    } catch (error) {
        console.error("Error deleting event:", error);
        return { success: false, error: error.message };
    }
};
