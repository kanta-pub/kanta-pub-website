"use server"
import dbConnect from "@/lib/dbConnect";
import writePublishSchema from "@/models/WriteandPublishSchema";
import mongoose from "mongoose";

export const createWritePublish = async (title, details_pdf_url, registration_link) => {
    try {
        await dbConnect();

        if (!title || !details_pdf_url || !registration_link) {
            return { success: false, error: 'All required fields must be provided.' };
        }

        const newWritePublish = new writePublishSchema({
            title,
            details_pdf_url,
            registration_link
        });

        const savedWritePublish = await newWritePublish.save();
        return { success: true, data: JSON.parse(JSON.stringify(savedWritePublish)) };
    } catch (error) {
        console.error('Error creating WritePublish:', error);
        return { success: false, error: error.message };
    }
};

export const getAllWritePublishes = async (page = 1, searchQuery = "") => {
    try {
        await dbConnect();
        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const query = searchQuery ? {
            title: { $regex: searchQuery, $options: "i" }
        } : {};

        const writePublishes = await writePublishSchema.find(query).skip(skip).limit(pageSize);
        return { success: true, data: JSON.parse(JSON.stringify(writePublishes)) };
    } catch (error) {
        console.error("Error fetching WritePublishes:", error);
        return { success: false, error: error.message };
    }
};

export const getWritePublishById = async (id) => {
    try {
        await dbConnect();
        const writePublish = await writePublishSchema.findById(id);
        if (!writePublish) {
            throw new Error('WritePublish not found');
        }
        return { success: true, data: JSON.parse(JSON.stringify(writePublish)) };
    } catch (error) {
        console.error("Error fetching WritePublish by ID:", error);
        return { success: false, error: error.message };
    }
};

export const updateWritePublish = async (id, updatedData) => {
    try {
        await dbConnect();
        const updatedWritePublish = await writePublishSchema.findByIdAndUpdate(id, updatedData, { new: true });
        return { success: true, data: JSON.parse(JSON.stringify(updatedWritePublish)) };
    } catch (error) {
        console.error("Error updating WritePublish:", error);
        return { success: false, error: error.message };
    }
};

export const deleteWritePublish = async (id) => {
    try {
        await dbConnect();
        await writePublishSchema.findByIdAndDelete(id);
        return { success: true };
    } catch (error) {
        console.error("Error deleting WritePublish:", error);
        return { success: false, error: error.message };
    }
};
