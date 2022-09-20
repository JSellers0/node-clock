import bodyParser from 'body-parser'
import csrf from 'csurf'
import {ErrorRequestHandler} from 'express'

export const crsfProtection = csrf({ cookie: true })
export const parseForm = bodyParser.urlencoded({ extended: false })

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message,
    })

}