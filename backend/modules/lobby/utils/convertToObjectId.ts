import mongoose from "mongoose";

export const convertToObjectId = (receivedId: string) => {
  return new mongoose.Types.ObjectId(receivedId);
};
