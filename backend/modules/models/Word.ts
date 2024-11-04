import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
});

export const Word = mongoose.model("Word", wordSchema);
