"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeUsername = exports.validateUsername = void 0;
var validator_1 = require("validator");
var validateUsername = function (username) {
    username = username.trim();
    if (!validator_1.default.isLength(username, { min: 1, max: 20 })) {
        throw new Error("Username must be between 1 and 20 characters");
    }
    if (!validator_1.default.isAlphanumeric(username)) {
        throw new Error("Username can only contain letters and numbers");
    }
    return username;
};
exports.validateUsername = validateUsername;
var escapeUsername = function (username) {
    var escapedUsername = validator_1.default.escape(username);
    return escapedUsername;
};
exports.escapeUsername = escapeUsername;
