import mongoose from "mongoose";
import { envConfig } from "../config/env.js";

const connectDB = async () => {
    try {
        if (!envConfig.mongoUri) {
            throw new Error("MONGO_URI is missing in environment variables");
        }

        await mongoose.connect(envConfig.mongoUri);
        console.log("✅ Database Connected successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
