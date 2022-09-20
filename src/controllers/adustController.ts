import {Request, Response, NextFunction} from 'express'

export function item_select_get(req: Request, res: Response, next: NextFunction) {
    //res.render("register.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    res.send("NOT IMPLEMENTED: item selection GET")
}

export async function item_select_post(req: Request, res: Response, next: NextFunction) {
    //res.render("register.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    res.send("NOT IMPLEMENTED: item selection POST")
}

export function item_adjust_get(req: Request, res: Response, next: NextFunction) {
    //res.render("register.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    res.send("NOT IMPLEMENTED: item adjustment GET")
}

export async function item_adjust_put(req: Request, res: Response, next: NextFunction) {
    //res.render("register.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    res.send("NOT IMPLEMENTED: item adjustment PUT")
}