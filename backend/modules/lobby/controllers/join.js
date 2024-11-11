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
exports.joinLobby = void 0;
var searchForLobby_1 = require("./helpers/searchForLobby");
var addPlayerToLobby_1 = require("../services/addPlayerToLobby");
var mongoose_1 = require("mongoose");
/**
 * Controller function to allow a user to join an existing game lobby
 *
 * This function first checks if a game lobby exists by the provided lobby code. If the lobby is found, it ensures the user
 * is authenticated by checking the user ID from the token. If either the lobby is not found or the user is not authenticated,
 * an error is thrown and a 500 response with an error message is returned. Upon successful joining, the user is added
 * to the lobby and a JSON response containing the redirect URL to the game is sent
 *
 * @param req - The incoming request object containing the authenticated user's information and the lobby code
 * @param res - The response object used to send the redirect URL or an error message
 * @returns A JSON response containing the redirect URL to the game or an error message if something goes wrong
 */
var joinLobby = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, lobby, userIdFromToken, userIdObject, lobbyIdObject, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                data = req.body;
                return [4 /*yield*/, (0, searchForLobby_1.searchForLobby)(data.lobbyCode)];
            case 1:
                lobby = _b.sent();
                if (!lobby) {
                    throw new Error("Game not found");
                }
                userIdFromToken = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                userIdObject = new mongoose_1.default.Types.ObjectId(userIdFromToken);
                lobbyIdObject = new mongoose_1.default.Types.ObjectId(lobby.id);
                return [4 /*yield*/, (0, addPlayerToLobby_1.addPlayerToLobby)(lobbyIdObject, userIdObject)];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json({ redirectUrl: "/play/".concat(lobby._id, "?code=").concat(lobby.code) })];
            case 3:
                error_1 = _b.sent();
                if (error_1 instanceof Error) {
                    console.error("Error when trying to join lobby:", error_1.message);
                    return [2 /*return*/, res.status(500).json({ message: error_1.message })];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.joinLobby = joinLobby;
