import {Request, Response, NextFunction} from 'express'

export function clock_get(req: Request, res: Response, next: NextFunction) {
    //res.render("webtime.njk", {domain: res.locals.domain})
    res.send("NOT IMPLEMENTED: clock GET")
}

export function clock_start_get(req: Request, res: Response, next: NextFunction) {
    //res.render("start.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    res.send("NOT IMPLEMENTED: clock start GET")
}

export async function clock_start_post(req: Request, res: Response, next: NextFunction) {
    //res.render("start.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    res.send("NOT IMPLEMENTED: clock start POST")
}