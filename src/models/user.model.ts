import { pool } from "../config/db.config"

interface User {
    userid: number
    username: string
    email: string
    localtimezone: string
    password: string
    auth_token: string
}

class User {
    constructor() {
    }
    
    async get_user_by_username(username: string) {
        let user_info = await pool.getConnection()
        .then (async conn => {
            const rows = await conn.query(`
                SELECT userid, user_name, email, user_token 
                FROM user WHERE user_name = '${username}'
                LIMIT 1;`
                )
            conn.end()
            return rows[0]            
        })
        return user_info
    }

    async create_user(user_info: User) {
        let res = await pool.getConnection()
        .then (async conn => {
            let res = await conn.query("INSERT INTO user (user_name, email, timezone, user_token) values (?, ?, ?, ?);",
            [user_info.username, user_info.email, user_info.localtimezone, user_info.password]
            )
            conn.end()
            return res
        })
        return res
    }
}

const user: User = new User()
export default user




