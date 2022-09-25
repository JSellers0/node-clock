import cookieParser from 'cookie-parser'
import 'dotenv/config'
import express, {Request, Response, NextFunction, Application} from 'express'
import {Server} from 'http'
import createHttpError from 'http-errors'
import nunjucks from 'nunjucks'
import path from 'path'

import {domainHandler, errorHandler, PORT} from './middleware/config'
import clockRoute from './routes/clockRoutes'
import userRoute from './routes/userRoutes'
import adjustRoute from './routes/adjustRoutes'

const app: Application = express()

nunjucks.configure(path.resolve(__dirname, 'views'),{
    express:app,
    autoescape:true,
    noCache:false,
    watch:true
})

app.use('/static', express.static(__dirname + "/static"))

app.use(cookieParser())

app.use(domainHandler)

app.use('/', clockRoute)
app.use('/users', userRoute)
app.use('/adjust', adjustRoute)

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound())
})

app.use (errorHandler)

const server: Server = app.listen(PORT, () => 
    console.log(`Broadcasting on Port ${PORT}`)
    )