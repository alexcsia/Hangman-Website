"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookies = void 0;
var refreshJWTCookie_1 = require("./refreshJWTCookie");
var accessJWTCookie_1 = require("./accessJWTCookie");
var setAuthCookies = function (res, userTokens) {
    if (!userTokens || !userTokens.accessToken || !userTokens.refreshToken) {
        throw new Error("Missing access token or refresh token");
    }
    (0, accessJWTCookie_1.setAccessTokenCookie)(res, userTokens.accessToken);
    (0, refreshJWTCookie_1.setRefreshTokenCookie)(res, userTokens.refreshToken);
};
exports.setAuthCookies = setAuthCookies;
