"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.domainHandler = exports.PORT = exports.errorHandler = exports.parseForm = exports.crsfProtection = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const csurf_1 = __importDefault(require("csurf"));
exports.crsfProtection = (0, csurf_1.default)({ cookie: true });
exports.parseForm = body_parser_1.default.urlencoded({ extended: false });
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
};
exports.errorHandler = errorHandler;
exports.PORT = Number(process.env.PORT) || 4000;
const domainHandler = (req, res, next) => {
    res.locals.domain = "http://localhost:4000";
    next();
};
exports.domainHandler = domainHandler;
