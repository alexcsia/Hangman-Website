"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAccessTokenCookie = void 0;
var setAccessTokenCookie = function (res, accessToken) {
    if (!accessToken) {
        throw new Error("Missing access token");
    }
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
    });
};
exports.setAccessTokenCookie = setAccessTokenCookie;
