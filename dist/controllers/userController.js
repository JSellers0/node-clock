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
exports.user_logout = exports.user_detail_delete = exports.user_detail_update = exports.user_detail_get = exports.user_login_post = exports.user_login_get = exports.user_create_post = exports.user_create_get = void 0;
const forms_1 = require("../forms/forms");
function user_create_get(req, res, next) {
    let form = new forms_1.RegisterForm();
    let site_components = {
        crsfToken: req.csrfToken(),
        domain: res.locals.domain,
        form: form
    };
    res.render("register.njk", site_components);
}
exports.user_create_get = user_create_get;
function user_create_post(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("NOT IMPLEMENTED: User create POST");
    });
}
exports.user_create_post = user_create_post;
function user_login_get(req, res, next) {
    let form = new forms_1.LoginForm();
    let site_components = {
        crsfToken: req.csrfToken(),
        domain: res.locals.domain,
        form: form
    };
    res.render("login.njk", site_components);
}
exports.user_login_get = user_login_get;
function user_login_post(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("NOT IMPLEMENTED: User login POST");
    });
}
exports.user_login_post = user_login_post;
function user_detail_get(req, res, next) {
    res.send("NOT IMPLEMENTED: User detail GET");
}
exports.user_detail_get = user_detail_get;
function user_detail_update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("NOT IMPLEMENTED: User detail UPDATE");
    });
}
exports.user_detail_update = user_detail_update;
function user_detail_delete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send("NOT IMPLEMENTED: User detail DELETE");
    });
}
exports.user_detail_delete = user_detail_delete;
function user_logout(req, res, next) {
    res.send("NOT IMPLEMENTED: User logout");
}
exports.user_logout = user_logout;
