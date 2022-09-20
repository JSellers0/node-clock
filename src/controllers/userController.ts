import {Request, Response, NextFunction} from 'express'

export function user_create_get(req: Request, res: Response, next: NextFunction) {
    res.render("register.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
}

export async function user_create_post(req: Request, res: Response, next: NextFunction) {
    res.send("NOT IMPLEMENTED: User create POST")
}

export function user_login_get(req: Request, res: Response, next: NextFunction) {
    res.render("login.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
}

export async function user_login_post(req: Request, res: Response, next: NextFunction) {
    res.send("NOT IMPLEMENTED: User login POST")
}

export function user_detail_get(req: Request, res: Response, next: NextFunction) {
    res.send("NOT IMPLEMENTED: User detail GET")
}

export async function user_detail_update(req: Request, res: Response, next: NextFunction) {
    res.send("NOT IMPLEMENTED: User detail UPDATE")
}

export async function user_detail_delete(req: Request, res: Response, next: NextFunction) {
    res.send("NOT IMPLEMENTED: User detail DELETE")
}

export function user_logout(req: Request, res: Response, next: NextFunction) {
    res.send("NOT IMPLEMENTED: User logout")
}