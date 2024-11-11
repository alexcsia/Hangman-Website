"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewAccessToken = void 0;
var userAuthentication_1 = require("../../services/userAuthentication");
var accessJWTCookie_1 = require("../utils/cookies/accessJWTCookie");
/**
 * Controller function to refresh a user's access token by using their refresh token
 *
 * This function checks for a valid refresh token in the user's cookies. If found, it attempts to
 * generate a new access token. The new access token is set as an HTTP-only cookie
 * and a success message is sent to the client. If the refresh token is missing/invalid, or if
 * token generation fails, an error message is returned
 *
 * @param req - The incoming request object, expected to contain a refresh token in the cookies
 * @param res - The response object used to send the new access token or an error message
 * @returns A JSON response with a success message and the updated access token cookie, or an error status
 */
var getNewAccessToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, newAccessToken, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                refreshToken = req.cookies.refreshToken;
                if (!refreshToken)
                    return [2 /*return*/, res.sendStatus(401)];
                return [4 /*yield*/, userAuthentication_1.default.generateAccessToken(refreshToken)];
            case 1:
                newAccessToken = _a.sent();
                if (newAccessToken) {
                    (0, accessJWTCookie_1.setAccessTokenCookie)(res, newAccessToken);
                }
                return [2 /*return*/, res
                        .status(200)
                        .json({ message: "Access token refreshed successfully" })];
            case 2:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    console.error("Error generating new access token:", error_1.message);
                    return [2 /*return*/, res.status(403).json({
                            message: "Failed to generate access token",
                        })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getNewAccessToken = getNewAccessToken;
