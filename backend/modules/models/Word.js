"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Word = void 0;
var mongoose_1 = require("mongoose");
var wordSchema = new mongoose_1.default.Schema({
    word: {
        type: String,
        required: true,
    },
});
exports.Word = mongoose_1.default.model("Word", wordSchema);
