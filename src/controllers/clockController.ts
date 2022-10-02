import {Request, Response} from 'express'
import { StartForm } from '../forms/forms'
import timeclock, { timelog_form_data } from '../models/timeclock.model'

export function home_get(req: Request, res: Response) {
    return res.render("webhome.njk", res.locals.site_components)
}

export async function clock_get(req: Request, res: Response) {
    let message: string = "Click Start to start timing"
    if (req.cookies['timelogid']) {
        let tld = await timeclock.get_timelog_display_by_id(req.cookies['timelogid'])
        // ToDo: Local time
        message = `Started ${tld.project} - ${tld.task}<br />${tld.note}<br />at ${timeclock.format_timestamp(tld.start)}`
    }
    // Need a message for stopped timing
    let site_components = Object.assign({}, res.locals.site_components, {
        message: message,
        flash: req.cookies['flash'],
        flash_class: req.cookies['flash_class']
    })
    res.clearCookie('flash')
    res.clearCookie('flash_class')
    return res.render("webtime.njk", site_components)
}

export async function clock_start_get(req: Request, res: Response) {
    let form: StartForm = new StartForm()
    let site_components = Object.assign({}, res.locals.site_components, {
        crsfToken: req.csrfToken(),
        form: form,
        projects: await timeclock.get_list('project'),
        tasks: await timeclock.get_list('task'),
        notes: await timeclock.get_list('note')
    })
    return res.render("start.njk", site_components)
}

export async function clock_start_post(req: Request, res: Response) {
    req.body['userid'] = res.locals.jwtPayload.userid
    req.body['start'] = new Date().toISOString().replace(/\..+/,'')
    if (req.cookies['timelogid']) {
        // I'm already timing something, so I need to switch
        await timeclock.stop_timing(req.cookies['timelogid'], req.body['start'])
        let db_result = await timeclock.start_timing(req.body)
        res.cookie('timelogid', Number(db_result.insertId))
        return res.redirect("/clock")
    } else {
        // I'm not timing anything, so I just need to start.
        let db_result = await timeclock.start_timing(req.body)
        res.cookie('timelogid', Number(db_result.insertId))
        return res.redirect("/clock")
    }
}

export async function clock_stop(req: Request, res: Response) {
    if (req.cookies['timelogid']) {
        let stop: string = new Date().toISOString().replace(/\..+/,'')
        await timeclock.stop_timing(req.cookies['timelogid'], stop)
        // ToDo: Add Project-Task-Name to flash message.
        res.clearCookie('timelogid')
        res.cookie('flash', `Stopped timing at ${stop}`)
        res.cookie('flash_class', "success")
        return res.redirect("/clock")
    } else {
        res.cookie('flash', "Could not stop timing because not currently timing anything!")
        res.cookie('flash_class', "warning")
        return res.redirect("/clock")
    }
}