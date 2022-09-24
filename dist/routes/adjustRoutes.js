"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adjustController = __importStar(require("../controllers/adustController"));
const config_1 = require("../modules/config");
const adjustRoute = express_1.default.Router();
adjustRoute.route('/')
    .get(adjustController.adjust_get);
adjustRoute.route('/:item_type')
    .get(adjustController.item_select_get);
adjustRoute.route('/:item_type/:item_id')
    .get(config_1.crsfProtection, adjustController.item_adjust_get)
    .put(config_1.parseForm, config_1.crsfProtection, adjustController.item_adjust_put)
    .delete(config_1.parseForm, config_1.crsfProtection, adjustController.item_adjust_delete);
exports.default = adjustRoute;
