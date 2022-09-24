import bodyParser from 'body-parser'
import csrf from 'csurf'
import {ErrorRequestHandler, Request, Response, NextFunction} from 'express'

export const crsfProtection = csrf({ cookie: true })
export const parseForm = bodyParser.urlencoded({ extended: false })

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message,
    })

}

export const PORT: Number = Number(process.env.PORT) || 4000

export const domainHandler = (req: Request, res: Response, next: NextFunction) => {
    res.locals.domain = "http://localhost:4000";
    next();
}