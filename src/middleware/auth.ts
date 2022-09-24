import {Request, Response, NextFunction} from 'express'

export function check_auth(req: Request, res: Response, next: NextFunction) {
    if (!req.cookies['IsAuthenticated']) {
        return res.redirect('/users/login')
    }
    next();
}