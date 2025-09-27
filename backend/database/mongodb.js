import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
    throw new Error("Please define the MONGODB_URI");
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Connected to database");

    } catch (error) {
        console.log(`Error connecting database ${error}`);
        process.exit(1);
    }
}

export default connectToDatabase;