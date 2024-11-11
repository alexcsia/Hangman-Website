"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lobby = void 0;
var mongoose_1 = require("mongoose");
var LobbySchema = new mongoose_1.Schema({
    players: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
    status: {
        type: String,
        enum: ["ongoing", "ended"],
        default: "ongoing",
    },
    code: { type: String, required: true, unique: true },
});
exports.Lobby = mongoose_1.default.model("Lobby", LobbySchema);
