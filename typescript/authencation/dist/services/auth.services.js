"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const compareEmailAndUsername = (username, email) => {
    return user_model_1.default.findOne({
        $or: [{ username }, { email }],
    });
};
exports.default = compareEmailAndUsername;
