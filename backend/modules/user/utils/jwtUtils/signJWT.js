"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshJWT = exports.signAccessJWT = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
var JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
if (!REFRESH_TOKEN_SECRET) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined");
}
var signAccessJWT = function (user) {
    try {
        var accessToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, username: user.username }, JWT_SECRET, {
            expiresIn: "15m",
        });
        return accessToken;
    }
    catch (error) {
        throw new Error("Failed to sign access token");
    }
};
exports.signAccessJWT = signAccessJWT;
var signRefreshJWT = function (user) {
    try {
        var refreshToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, username: user.username }, REFRESH_TOKEN_SECRET, { expiresIn: "3d" });
        return refreshToken;
    }
    catch (error) {
        throw new Error("Failed to sign refresh token");
    }
};
exports.signRefreshJWT = signRefreshJWT;
