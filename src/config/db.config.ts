import {createPool, Pool} from 'mariadb'
import dotenv from 'dotenv'
dotenv.config()

function init(){
    try {
            let pool = createPool({
            connectionLimit: 10,
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

// Off to the races;