import {Request, Response, NextFunction} from 'express'
import { StartForm } from '../forms/forms'
import timeclock from '../models/timeclock.model'

export function clock_get(req: Request, res: Response, next: NextFunction) {
    let site_components = {
        domain: res.locals.domain,
        message: "Click Start to start timing",
        isAuth: req.cookies['isAuth']
    }
    
    res.render("webtime.njk", site_components)
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
    res.render("start.njk", site_components)
}

export async function clock_start_post(req: Request, res: Response, next: NextFunction) {
    //res.render("start.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    res.send("NOT IMPLEMENTED: clock start POST")
}