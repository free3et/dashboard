import mongoose from "mongoose";

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;

    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
      throw new Error("MONGO_URL is not defined in the environment variables.");
    }

    const db = await mongoose.connect(mongoUrl);

    console.log("Connected to the database!");
    connection.isConnected = db.connections[0].readyState;
  } catch (error: any) {
    console.error("Error connecting to the database:", error.message);
    throw new Error(error);
  }
};
