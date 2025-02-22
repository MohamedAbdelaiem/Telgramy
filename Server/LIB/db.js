import mongoose from 'mongoose';

export const connect = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connected to database");
    } catch (err) {
        console.error("Database connection error:", err);
    }
};


