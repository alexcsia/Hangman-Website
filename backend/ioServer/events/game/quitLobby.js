"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleQuit = void 0;
var updateLobbyStatus_1 = require("../../helpers/game/updateLobbyStatus");
var handleQuit = function (socket, lobbyId, playerId, io, lobbies) {
    console.log("User ".concat(playerId, " is quitting lobby ").concat(lobbyId));
    (0, updateLobbyStatus_1.default)(lobbyId);
    io.to(lobbyId).emit("matchQuit");
};
exports.handleQuit = handleQuit;
