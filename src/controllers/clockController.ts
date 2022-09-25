import {Request, Response, NextFunction} from 'express'
import { StartForm } from '../forms/forms'
import timeclock from '../models/timeclock.model'

export function home_get(req: Request, res: Response) {
    return res.render("webhome.njk", {domain: res.locals.domain})
}

export function clock_get(req: Request, res: Response, next: NextFunction) {
    let site_components = {
        domain: res.locals.domain,
        message: "Click Start to start timing",
        flash: req.cookies['flash'],
        flash_class: req.cookies['flash_class'],
        isAuth: true
    }
    res.clearCookie('flash')
    return res.render("webtime.njk", site_components)
}

export async function clock_start_get(req: Request, res: Response, next: NextFunction) {
    let form = new StartForm()
    let projects = await timeclock.get_list('project')
    let tasks = await timeclock.get_list('task')
    let notes = await timeclock.get_list('note')
    let site_components = {
        domain: res.locals.domain,
        crsfToken: req.csrfToken(),
        form: form,
        projects: projects,
        tasks: tasks,
        notes: notes
    }
    return res.render("start.njk", site_components)
}

export async function clock_start_post(req: Request, res: Response, next: NextFunction) {
    console.log(res.locals.jwtPayload.userid)
    if (req.cookies['timelogid']) {
        let current_timelog = await timeclock.get_timelog_by_id(req.cookies['timelogid'])
    }
    return res.send("NOT IMPLEMENTED: clock start POST")
}