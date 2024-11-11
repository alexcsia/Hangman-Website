"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, minlength: 1, maxlength: 20 },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 254,
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 64,
    },
    winNum: {
        type: Number,
        default: 0,
    },
});
exports.User = mongoose_1.default.model("User", UserSchema);
