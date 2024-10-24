import mongoose, { Document, Schema } from "mongoose";

export interface ILobby extends Document {
  players: string;
  status: string;
  winner: string;
  code: string;
}

const LobbySchema: Schema = new Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: {
    type: String,
    enum: ["ongoing", "ended"],
    default: "ongoing",
  },
  winner: {
    type: String,
  },
  code: { type: String, required: true, unique: true },
});

export const Lobby = mongoose.model<ILobby>("Lobby", LobbySchema);
