import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDB = async (): Promise<void> => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectToDB;