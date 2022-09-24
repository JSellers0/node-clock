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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginForm = exports.RegisterForm = void 0;
const formfield = __importStar(require("./form_fields"));
class RegisterForm {
    constructor() {
        this.tzs = [
            ["US/Eastern", "US/Eastern"],
            ["US/Central", "US/Central"],
            ["US/Pacific", "US/Pacific"]
        ];
        this.user_name = new formfield.StringField("Username");
        this.email = new formfield.StringField("Email");
        this.timezone = new formfield.SelectField("Local timezone", this.tzs);
        this.password = new formfield.PasswordField('Password');
        this.confirm_password = new formfield.PasswordField('Confirm Password');
        this.submit = new formfield.SubmitField("Register");
    }
}
exports.RegisterForm = RegisterForm;
class LoginForm {
    constructor() {
        this.user_name = new formfield.StringField("Username");
        this.password = new formfield.PasswordField('Password');
        this.remember = new formfield.BooleanField("Remember Me");
        this.submit = new formfield.SubmitField("Login");
    }
}
exports.LoginForm = LoginForm;
