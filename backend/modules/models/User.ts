import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  winNum: Number;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, minlength: 1, maxlength: 20 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 254,
  },
  password: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 64,
  },
  winNum: {
    type: Number,
    default: 0,
  },
});

export const User = mongoose.model<IUser>("User", UserSchema);
