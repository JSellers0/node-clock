import {Request, Response} from 'express'
import { StartForm } from '../forms/forms'
import timeclock from '../models/timeclock.model'

export function home_get(req: Request, res: Response) {
    return res.render("webhome.njk", {domain: res.locals.domain})
}

export function clock_get(req: Request, res: Response) {
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

export async function clock_start_get(req: Request, res: Response) {
    let form = new StartForm()
    let site_components = {
        domain: res.locals.domain,
        crsfToken: req.csrfToken(),
        form: form,
        projects: await timeclock.get_list('project'),
        tasks: await timeclock.get_list('task'),
        notes: await timeclock.get_list('note')
    }
    return res.render("start.njk", site_components)
}

export async function clock_start_post(req: Request, res: Response) {
    if (req.cookies['timelogid']) {
        // I'm already timing something, so I need to switch
        let current_timelog = await timeclock.get_timelog_by_id(req.cookies['timelogid'])
    }
    // I'm not timing anything, so I just need to start.
    return res.send("NOT IMPLEMENTED: clock start POST")
}

export async function clock_stop(req: Request, res: Response) {
    res.cookie('flash', "Stopped Clock.")
    res.cookie('flash_class', "success")
    return res.redirect('/clock')
}