"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRoutes = void 0;
var auth_1 = require("./auth/auth");
var register_1 = require("./registration/register");
var user_1 = require("./profile/user");
var play_1 = require("./play/play");
var userInfo_1 = require("./userInfo/userInfo");
var applyRoutes = function (server, handle) {
    server.use("/api/auth", auth_1.default);
    server.use("/api/registration", register_1.default);
    server.use("/api/users", user_1.default);
    server.use("/api/play", play_1.default);
    server.use("/api", userInfo_1.default);
    server.all("*", function (req, res) {
        return handle(req, res);
    });
};
exports.applyRoutes = applyRoutes;
