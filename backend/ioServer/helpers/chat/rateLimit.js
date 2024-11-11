"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimit = void 0;
var MESSAGE_LIMIT = 5;
var TIME_WINDOW = 5000;
var rateLimit = function (socket, messageCounts) {
    var socketId = socket.id;
    if (!messageCounts.has(socketId)) {
        messageCounts.set(socketId, {
            count: 1,
            timer: setTimeout(function () { return messageCounts.delete(socketId); }, TIME_WINDOW),
        });
        return false;
    }
    else {
        var userData = messageCounts.get(socketId);
        userData.count += 1;
        if (userData.count > MESSAGE_LIMIT) {
            socket.emit("rate error", "Rate limit exceeded, please wait.");
            return true;
        }
    }
    return false;
};
exports.rateLimit = rateLimit;
