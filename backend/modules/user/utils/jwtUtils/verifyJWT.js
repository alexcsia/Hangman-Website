"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var isJWTPayload_1 = require("./isJWTPayload");
var REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
if (!REFRESH_TOKEN_SECRET)
    throw new Error("REFRESH_TOKEN_SECRET is not defined");
var verifyRefreshToken = function (refreshToken) {
    var verifiedToken = jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET);
    if (!(0, isJWTPayload_1.default)(verifiedToken)) {
        throw new Error("Invalid token payload");
    }
    return verifiedToken;
};
exports.verifyRefreshToken = verifyRefreshToken;
