import {Request, Response, NextFunction} from 'express'
import timeclock from '../models/timeclock.model'

export function adjust_get(req: Request, res: Response, next: NextFunction) {
    return res.render("adjust.njk", {domain: res.locals.domain, isAuth: res.locals.is_authenticated})
}

export async function item_select_get(req: Request, res: Response, next: NextFunction) {
    let item_type: string = req.params.item_type.substring(0, 1).toUpperCase() + req.params.item_type.substring(1, req.params.item_type.length)
    try {
        await timeclock.get_list(req.params.item_type)
            .then((items) => {
                return {
                    domain: res.locals.domain,
                    item_type: item_type,
                    items: items
                }
            }). then((site_components) => {
                return res.render("adjust_itemselect.njk", site_components)
            })
    } catch(err) {
        // ToDo: Real Logging
        console.log(err)
    }
}

export function item_adjust_get(req: Request, res: Response, next: NextFunction) {
    //res.render("register.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    res.send("NOT IMPLEMENTED: item adjustment GET")
}

export async function item_adjust_put(req: Request, res: Response, next: NextFunction) {
    //res.render("register.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    res.send("NOT IMPLEMENTED: item adjustment PUT")
}

export async function item_adjust_delete(req: Request, res: Response, next: NextFunction) {
    //res.render("register.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    res.send("NOT IMPLEMENTED: item adjustment DELETE")
}