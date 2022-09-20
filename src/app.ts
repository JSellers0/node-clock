import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express, {Request, Response, NextFunction, Application} from 'express'
import {Server} from 'http'
import createHttpError from 'http-errors'
import nunjucks from 'nunjucks'
import path from 'path'

import {errorHandler} from './modules/config'
import clockRoute from './routes/clock'
import userRoute from './routes/userRoutes'

dotenv.config()

const PORT: Number = Number(process.env.PORT) || 3000
const app: Application = express()

nunjucks.configure(path.resolve(__dirname, 'views'),{
    express:app,
    autoescape:true,
    noCache:false,
    watch:true
})

app.use(cookieParser())

app.use('/', clockRoute)
app.use('/users', userRoute)

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound())
})

app.use (errorHandler)

const server: Server = app.listen(PORT, () => 
    console.log(`Broadcasting on Port ${PORT}`)
    )