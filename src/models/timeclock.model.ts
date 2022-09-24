import { connect } from "http2"
import { pool } from "../config/db.config"

type item_list = {
    itemid: number,
    item_name: string
}[]

type timelog_list = {
    timelogid: number,
    project_name: string,
    task_name: string,
    note_name: string,
    start_time: string,
    end_time: string
}[]

class TimeClock {
    constructor() {
    }

    async get_list(list_name: string) {
        if (list_name === 'project') {
            try {
                return await this.get_projects()
            } catch (err) {
                // ToDo: Real Logging
                console.log(err)
            }
        } else if (list_name === 'task') {
            return await this.get_tasks()
        } else if (list_name === 'note') {
            return await this.get_notes()
        } 
    }

    private async get_projects() {
        let item_list: item_list = await pool.getConnection()
        .then( async conn => {
            const rows = await conn.query(`SELECT projectid AS itemid, project_name AS item_name FROM project;`)
            conn.end()
            return rows
        })
        return item_list
    }

    private async get_tasks() {
        let item_list: item_list = await pool.getConnection()
        .then(async conn => {
            const rows = await conn.query(`SELECT taskid AS itemid, task_name AS item_name FROM task;`)
            conn.end()
            return rows
        })
        return item_list
    }

    private async get_notes() {
        let item_list: item_list = await pool.getConnection()
        .then(async conn => {
            const rows = await conn.query(`SELECT noteid AS itemid, note_name AS item_name FROM note;`)
            conn.end()
            return rows
        })
        return item_list
    }
}

const timeclock = new TimeClock()
export default timeclock