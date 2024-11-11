"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChatMessage = void 0;
var handleChatMessage = function (socket, msg, lobbyId, io) {
    io.to(lobbyId).emit("chat message", { msg: msg });
};
exports.handleChatMessage = handleChatMessage;
