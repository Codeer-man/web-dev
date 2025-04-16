"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRoutes = exports.authRoutes = void 0;
const auth_Route_1 = __importDefault(require("./auth.Route"));
exports.authRoutes = auth_Route_1.default;
const Session_Routes_1 = __importDefault(require("./Session.Routes"));
exports.SessionRoutes = Session_Routes_1.default;
