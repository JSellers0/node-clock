import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from 'express'
import {Server} from 'http'
import createHttpError from 'http-errors'
import {config} from 'dotenv'
import clockRoute from './routes/clock'
import userRoute from './routes/users'

config()

const PORT: Number = Number(process.env.PORT) || 3000
const app: Application = express()

app.use('/', clockRoute)
app.use('/users', userRoute)

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound())
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message,
    })

}

app.use (errorHandler)


const server: Server = app.listen(PORT, () => 
    console.log(`Broadcasting on Port ${PORT}`)
    )