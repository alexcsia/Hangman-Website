"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = void 0;
var validator_1 = require("validator");
var validatePassword = function (password) {
    if (!validator_1.default.isStrongPassword(password, {
        minLength: 10,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })) {
        throw new Error("Password not strong enough");
    }
    if (!validator_1.default.isLength(password, { min: 10, max: 64 })) {
        throw new Error("Password cannot exceed 64 characters");
    }
    return password;
};
exports.validatePassword = validatePassword;
