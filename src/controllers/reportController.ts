import {Request, Response} from 'express'
import { DateSelectForm } from '../forms/forms'

export function report_get(req: Request, res: Response) {
    let form: DateSelectForm = new DateSelectForm()
    let site_components = {
        domain: res.locals.domain,
        crsfToken: req.csrfToken(),
        form: form,
        isAuth: true
    }
    return res.render("report.njk", site_components)
}

export function report_post(req: Request, res: Response) {
    return res.send("Not implemented: Report POST")
}