"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clockRoute = express_1.default.Router();
clockRoute.get('/', (req, res) => {
    res.setHeader('Set-Cookie', 'isAuth=false');
    res.send("Home Route");
});
exports.default = clockRoute;
