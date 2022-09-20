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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_manager = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db = __importStar(require("./db"));
const user_1 = require("./user");
class UserManager {
    constructor() {
        this.user_list = [];
    }
    get_user(retrieval_key, retrieval_value) {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            let user_info = {};
            try {
                conn = yield db.pool.getConnection();
                const rows = yield conn.query(`SELECT * FROM user WHERE ${retrieval_key} = ?;`, [retrieval_value])
                    .then(rows => {
                    user_info.userid = rows[0].userid;
                    user_info.user_name = rows[0].user_name;
                    user_info.email = rows[0].email;
                    user_info.user_token = rows[0].user_token;
                });
            }
            catch (err) {
                throw err;
            }
            finally {
                if (conn)
                    conn.end();
            }
            return user_info;
        });
    }
    authenticate_user(password, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let auth_result = yield bcrypt_1.default.compare(password, user.user_token);
            return auth_result;
        });
    }
    login_user(retrieval_key, retrieval_value, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.get_user(retrieval_key, retrieval_value);
            let auth = yield this.authenticate_user(password, user);
            if (auth) {
                this.user_list.push(new user_1.User(user.userid, user.user_name, user.email));
            }
        });
    }
}
exports.user_manager = new UserManager();
