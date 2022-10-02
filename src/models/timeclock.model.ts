import { connect } from "http2"
import { pool } from "../config/db.config"

export type item = {
    itemid: number,
    item_name: string
}

export type item_list = item[]

export type timelog_form_data = {
    timelogid: number | undefined,
    userid: number,
    project: string,
    task: string,
    note: string,
    start: string,
    stop: string | undefined
}
type timelog_record = {
    timelogid: number | undefined,
    userid: number,
    projectid: number,
    taskid: number,
    noteid: number,
    start: string,
    stop: string | undefined
}

// ToDo: Create item if not exists

class TimeClock {
    constructor() {
    }

    async get_list(list_name: string) {
        let item_list: item_list = await pool.getConnection()
        .then( async cnxn => {
            let rows = await cnxn.query(`SELECT ${list_name}id AS itemid, ${list_name}_name AS item_name FROM ${list_name};`)
            cnxn.end()
            return rows
        })
        return item_list
    }

    async get_item_by_id(item_id: string, item_type: string) {
        let item: item = await pool.getConnection()
        .then( async cnxn => {
            let rows = await cnxn.query(`SELECT ${item_type}id AS itemid, ${item_type}_name AS item_name FROM ${item_type} WHERE ${item_type}id = ${item_id};`)
            cnxn.end()
            return rows[0]
        })
        return item

    }

    async get_timelog_by_id(timelogid: string) {
        let timelog: timelog_record = await pool.getConnection()
        .then(async cnxn => {
            let rows = await cnxn.query(`SELECT timelogid, userid, projectid, taskid, noteid, start, stop FROM timelog WHERE timelogid = ${timelogid};`)
            cnxn.end()
            return rows[0]
        })
        return timelog
    }

    async get_timelog_display_by_id(timelogid: string): Promise<timelog_form_data> {
        let timelog: timelog_form_data = await pool.getConnection()
        .then(async cnxn => {
            let sql_query = `
            SELECT timelogid, project_name AS project, task_name AS task, note_name AS note, start AS start_time
            FROM timelog t
                INNER JOIN project p ON p.projectid = t.projectid
                INNER JOIN task tk ON tk.taskid = t.taskid
                INNER JOIN note n ON n.noteid = t.noteid
            WHERE t.timelogid = ${timelogid}
            ;`
            let rows = await cnxn.query(sql_query)
            cnxn.end()
            return rows[0]
        })
        return timelog
    }

    async get_timelog_by_date(userid: string, timelog_date: string): Promise<timelog_form_data> {
        let timelog: timelog_form_data = await pool.getConnection()
        .then(async cnxn => {
            let sql_query = `
            SELECT timelogid, project_name AS project, task_name AS task, note_name AS note, start, stop
            FROM timelog t
                INNER JOIN project p ON p.projectid = t.projectid
                INNER JOIN task tk ON tk.taskid = t.taskid
                INNER JOIN note n ON n.noteid = t.noteid
            WHERE userid = ${userid}
                AND (Cast(start AS DATE) = '${timelog_date}' OR Cast(stop as DATE) = '${timelog_date}')
            ;`
            let rows = await cnxn.query(sql_query)
            cnxn.end()
            return rows
        })
        return timelog
    }

    async start_timing(timelog_data: timelog_form_data,) {
        let result = await pool.getConnection()
        .then(async cnxn => {
            let sql_query = `
            INSERT INTO timelog (userid, projectid, taskid, noteid, start)
            SELECT ${timelog_data.userid}, projectid, taskid, noteid, '${timelog_data.start}'
            FROM 
            (SELECT projectid FROM project WHERE project_name = '${timelog_data.project}') p,
            (SELECT taskid FROM task WHERE task_name = '${timelog_data.task}') t,
            (SELECT noteid FROM note WHERE note_name = '${timelog_data.note}')n
            ;`
            let rows = await cnxn.query(sql_query)
            cnxn.end()
            return rows
        })
        return result
    }

    async stop_timing(timelogid: number, stop_time: string) {
        let result = await pool.getConnection()
        .then(async cnxn => {
            let rows = await cnxn.query(`UPDATE timelog SET stop = '${stop_time}' WHERE timelogid = ${timelogid};`)
            cnxn.end()
            return rows
        })
        return result
    }

    format_timestamp(timestamp: string): string {
        return new Date(timestamp).toISOString().replace('T', ' ').replace(/\..+/,'')
    }
}

const timeclock = new TimeClock()
export default timeclock