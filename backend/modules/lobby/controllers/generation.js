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
exports.generateCodeAndLobby = void 0;
var createLobby_1 = require("../services/createLobby");
var mongoose_1 = require("mongoose");
/**
 * Controller function to generate a new game lobby and provide a redirect URL
 *
 * This function attempts to create a new game lobby for the authenticated user by utilizing their user ID from the token
 * If the user ID is missing or if an error occurs during lobby creation, an error is thrown and a 500 response with an
 * error message is returned. Upon successful lobby creation, a JSON response with a redirect URL containing the
 * lobby ID and a unique code is sent, redirecting the user to the newly created game lobby
 *
 * @param req - The incoming request object containing the authenticated user's ID in `req.user`
 * @param res - The response object used to send the redirect URL or an error message
 * @returns A JSON response containing the redirect URL or an error message if something goes wrong
 */
var generateCodeAndLobby = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userIdFromToken, userIdObject, lobby, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userIdFromToken = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                userIdObject = new mongoose_1.default.Types.ObjectId(userIdFromToken);
                return [4 /*yield*/, (0, createLobby_1.createLobby)(userIdObject)];
            case 1:
                lobby = _b.sent();
                if (!lobby) {
                    throw new Error("Could not create the lobby");
                }
                return [2 /*return*/, res.json({ redirectUrl: "/play/".concat(lobby._id, "?code=").concat(lobby.code) })];
            case 2:
                error_1 = _b.sent();
                if (error_1 instanceof Error) {
                    console.log("Error creating lobby:", error_1.message);
                    return [2 /*return*/, res
                            .status(500)
                            .json({ message: "Something went wrong... Please try again" })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.generateCodeAndLobby = generateCodeAndLobby;
