import { connect } from "http2"
import { pool } from "../config/db.config"

class TimeClock {
    project_list: string[]
    task_list: string[]
    note_list: string[]
    constructor() {
        this.project_list = []
        this.task_list = []
        this.note_list = []
    }

    async get_list(list_name: string) {
        if (list_name === 'project') {
            await this.get_projects()
            return this.project_list
        } else if (list_name === 'task') {
            await this.get_tasks()
            return this.task_list
        } else if (list_name === 'note') {
            await this.get_notes()
            return this.note_list
        } 
        return []
    }

    async get_projects() {
        await pool.getConnection().then( conn => {
            conn.query(`SELECT project_name FROM project;`)
            .then(rows => { 
                for (const row of rows) {
                    this.project_list.push(row.project_name)
                }
            }).then(res => {conn.end()})
        })
    }

    async get_tasks() {
        await pool.getConnection()
        .then(conn => {
            conn.query(`SELECT task_name FROM task;`)
            .then(rows => { 
                for (const row of rows) {
                    this.task_list.push(row.task_name)
                }
            }).then(res => {conn.end()})
        })
    }

    async get_notes() {
        await pool.getConnection()
        .then(conn => {
            conn.query(`SELECT note_name FROM note;`)
            .then(rows => { 
                for (const row of rows) {
                    this.note_list.push(row.note_name)
                }
            }).then(res => {conn.end()})
        })
    }
}

const timeclock = new TimeClock()
export default timeclock