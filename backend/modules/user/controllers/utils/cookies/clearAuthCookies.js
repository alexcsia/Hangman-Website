"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCookie = void 0;
var clearCookie = function (res, cookieName) {
    res.clearCookie(cookieName, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
};
exports.clearCookie = clearCookie;
