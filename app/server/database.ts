import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/hangman");
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("Error connecting to mongodb", error);
  }
};
export default connectMongoDB;
