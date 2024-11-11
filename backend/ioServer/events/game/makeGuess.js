"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMakeGuess = void 0;
var gameUpdate_1 = require("./gameUpdate");
var addWinToUser_1 = require("../../helpers/game/addWinToUser");
var types_1 = require("../../types");
var handleMakeGuess = function (socket, lobbyId, playerId, letter, username, io) {
    var lobby = types_1.lobbies[lobbyId];
    var playerState = lobby === null || lobby === void 0 ? void 0 : lobby.players[playerId];
    if (lobby && playerState && playerState.remainingAttempts > 0) {
        if (!playerState.guessedLetters.includes(letter)) {
            playerState.guessedLetters.push(letter);
            if (!lobby.word.includes(letter)) {
                playerState.remainingAttempts--;
            }
        }
        (0, gameUpdate_1.emitGameUpdate)(socket, lobbyId, playerId, types_1.lobbies);
        var isGameWon = lobby.word
            .split("")
            .every(function (letter) { return playerState.guessedLetters.includes(letter); });
        if (isGameWon) {
            io.to(lobbyId).emit("gameOver", "".concat(username, " won!"));
            (0, addWinToUser_1.default)(playerId).catch(console.log);
            return;
        }
        if (playerState.remainingAttempts <= 0) {
            io.to(lobbyId).emit("gameOver", "".concat(username, " is out of tries!"));
        }
    }
};
exports.handleMakeGuess = handleMakeGuess;
