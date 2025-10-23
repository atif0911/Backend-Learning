import mongoose from "mongoose";

export const connectToDb = async () => {
    const MONGO_URI = process.env.MONGODB_URI;
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error to connect to MongoDB", error);
        process.exit(1);
    }
    mongoose.connection.on("error", (error) => {
        console.log("Error to connect to MongoDB", error)
    })
}