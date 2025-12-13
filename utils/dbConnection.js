import mongoose from "mongoose";
import { envConfig } from "../config/env.js";
import { log } from "./logger.js";

const connectDB = async () => {
    try {
        if (!envConfig.mongoUri) {
            throw new Error("MONGO_URI is missing in environment variables");
        }

        await mongoose.connect(envConfig.mongoUri);
        log.success("Database Connected successfully!",'DB');
    } catch (error) {
        log.error("❌ MongoDB connection error:", error.message,'DB');
        process.exit(1);
    }
};

export default connectDB;
