"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpMiddleware = void 0;
var express_1 = require("express");
var cookie_parser_1 = require("cookie-parser");
var setUpMiddleware = function (server) {
    server.use(express_1.default.json());
    server.use((0, cookie_parser_1.default)());
};
exports.setUpMiddleware = setUpMiddleware;
