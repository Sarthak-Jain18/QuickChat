import mongoose from "mongoose";

// Function to connect to the mongoDB database
export async function connectDB() {
    try {
        mongoose.connection.on('connected', () => console.log("DB connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}`);
    } catch (error) {
        console.log(error);
    }
}



