import {Request, Response, NextFunction} from 'express'
import timeclock from '../models/timeclock.model'

export function adjust_get(req: Request, res: Response, next: NextFunction) {
    //res.render("register.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    res.render("adjust.njk", {domain: res.locals.domain})
}

export async function item_select_get(req: Request, res: Response, next: NextFunction) {
    //res.render("register.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    let items: string[] = await timeclock.get_list(req.params.item_type)
    res.send(`NOT IMPLEMENTED: item selection GET ${items}`)
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