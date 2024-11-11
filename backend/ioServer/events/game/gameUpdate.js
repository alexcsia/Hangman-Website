"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitGameUpdate = void 0;
var emitGameUpdate = function (socket, lobbyId, playerId, lobbies) {
    var lobby = lobbies[lobbyId];
    var playerState = lobby === null || lobby === void 0 ? void 0 : lobby.players[playerId];
    socket.emit("gameUpdate", {
        word: lobby === null || lobby === void 0 ? void 0 : lobby.word,
        wordLength: lobby === null || lobby === void 0 ? void 0 : lobby.word.length,
        playerState: playerState,
    });
};
exports.emitGameUpdate = emitGameUpdate;
