"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRefreshTokenCookie = void 0;
var setRefreshTokenCookie = function (res, refreshToken) {
    if (!refreshToken) {
        throw new Error("Missing refresh token");
    }
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000, //3 days
    });
};
exports.setRefreshTokenCookie = setRefreshTokenCookie;
