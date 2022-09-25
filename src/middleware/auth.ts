import { JWTSECRET } from "./config";
import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from 'express'

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.locals.jwtPayload  = <any>jwt.verify(req.cookies["token"], JWTSECRET)
    } catch(err) {
        res.cookie('flash', "You must be logged in to access this area!")
        res.cookie('flash_class', "danger")
        return res.redirect("/users/login")
    }
    next()
}
