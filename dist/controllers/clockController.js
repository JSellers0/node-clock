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
Object.defineProperty(exports, "__esModule", { value: true });
exports.clock_start_post = exports.clock_start_get = exports.clock_get = void 0;
function clock_get(req, res, next) {
    res.send("NOT IMPLEMENTED: clock GET");
}
exports.clock_get = clock_get;
function clock_start_get(req, res, next) {
    res.send("NOT IMPLEMENTED: clock start GET");
}
exports.clock_start_get = clock_start_get;
function clock_start_post(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("NOT IMPLEMENTED: clock start POST");
    });
}
exports.clock_start_post = clock_start_post;
