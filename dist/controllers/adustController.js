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
exports.item_adjust_delete = exports.item_adjust_put = exports.item_adjust_get = exports.item_select_get = exports.adjust_get = void 0;
function adjust_get(req, res, next) {
    res.render("adjust.njk", { domain: res.locals.domain });
}
exports.adjust_get = adjust_get;
function item_select_get(req, res, next) {
    let item_type = req.params.item_type;
    res.send(`NOT IMPLEMENTED: item selection GET ${item_type}`);
}
exports.item_select_get = item_select_get;
function item_adjust_get(req, res, next) {
    res.send("NOT IMPLEMENTED: item adjustment GET");
}
exports.item_adjust_get = item_adjust_get;
function item_adjust_put(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("NOT IMPLEMENTED: item adjustment PUT");
    });
}
exports.item_adjust_put = item_adjust_put;
function item_adjust_delete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("NOT IMPLEMENTED: item adjustment DELETE");
    });
}
exports.item_adjust_delete = item_adjust_delete;
