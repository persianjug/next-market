import mongoose from "mongoose";

/**
 * DB接続
 */
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://persianjugkocchi:6h7o5bRBRGw5cShz@cluster0.md4mb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Success: Connected to MongoDB");
  } catch {
    console.log("Failure: Unconnected to MongoDB");
    throw new Error();
  }
}

export default connectDB;