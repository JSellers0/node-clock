"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(userid, user_name, email) {
        this.userid = userid;
        this.user_name = user_name;
        this.email = email;
    }
    get_id() {
        return this.userid;
    }
}
exports.User = User;
