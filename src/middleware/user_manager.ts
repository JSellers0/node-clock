import bcrypt from 'bcrypt'
import * as db from '../config/db.config'
import {User} from '../models/user'

// export interface UserManagerInterface {
//     user_list: Array<User>
//     get_user: Promise<Record<string, string>>
//     authenticate_user: void
//     login_user: void
// }

class UserManager {
    public user_list: User[]
    constructor() {
        this.user_list = []
    }

    async get_user(retrieval_key: string, retrieval_value: string):  Promise<Record<string, string>> {
        let conn
        let user_info: Record<string, string> = {}
        try {
            conn = await db.pool.getConnection();
            const rows = await conn.query(`SELECT * FROM user WHERE ${retrieval_key} = ?;`, [retrieval_value])
                .then(rows => {
                    user_info.userid = rows[0].userid
                    user_info.user_name = rows[0].user_name
                    user_info.email = rows[0].email
                    user_info.user_token = rows[0].user_token
                })
        } catch (err) {
            throw err
        } finally {
            if (conn) conn.end()
        }
        return user_info
    }

    async authenticate_user(password: string, user: Record<string, string>) {
        let auth_result = await bcrypt.compare(password, user.user_token)
        return auth_result
    }

    async login_user(retrieval_key: string, retrieval_value: string, password: string) {
        let user = await this.get_user(retrieval_key, retrieval_value)
        let auth = await this.authenticate_user(password, user)
        if (auth) {
            this.user_list.push(new User(user.userid, user.user_name, user.email))
        }
    }
}

export default new UserManager()