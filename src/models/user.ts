import { pool } from "../config/db.config"

export interface User {
    userid: string
    user_name: string
    email: string
    user_token: string
    is_authenticated: boolean
}

export class User {
    constructor(userid: string, user_name: string, email: string) {
        this.userid = userid
        this.user_name = user_name
        this.email = email
    }
    
    
}




