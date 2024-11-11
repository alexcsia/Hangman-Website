"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var isJWTPayload_1 = require("../../modules/user/utils/jwtUtils/isJWTPayload");
var JWT_SECRET = process.env.JWT_SECRET || "secret_key";
var authenticateJWT = function (req, res, next) {
    var token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ message: "Could not find access token" });
    }
    try {
        var verifiedToken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!(0, isJWTPayload_1.default)(verifiedToken)) {
            throw new Error("Invalid token payload");
        }
        req.user = {
            id: verifiedToken.id,
            email: verifiedToken.email,
            username: verifiedToken.username,
        };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            console.log(error.message);
            return res
                .status(401)
                .json({ message: "Your session expired. Please log in again" });
        }
        else if (error instanceof Error) {
            console.log(error.message);
            return res
                .status(403)
                .json({ message: "Authentication failed. Please log in again" });
        }
    }
};
exports.authenticateJWT = authenticateJWT;
