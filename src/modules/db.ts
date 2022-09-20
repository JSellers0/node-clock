import {createPool, Pool} from 'mariadb'
import dotenv from 'dotenv'
dotenv.config()

function init(){
    try {
            let pool = createPool({
            connectionLimit: 4,
            host: '192.168.40.100',
            user: process.env.MDB,
            password: process.env.MARIADB,
            database: 'clock',
        })

        console.debug('MariaDB Adapter Pool generated successfully.')
        return pool
    }
    catch(error) {
        console.error('[db.ts][init][Error]: ', error)
        throw new Error('failed to initialize pool')
    }
}

export const pool: Pool = init()

export async function get_user(retrieval_key: string, retrival_value: string) {
    let conn
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * FROM user WHERE ${retrieval_key} = '${retrival_value}';`)
        return rows
    } catch (err) {
        throw err
    } finally {
        if (conn) return conn.end()
    }
}
// Off to the races;