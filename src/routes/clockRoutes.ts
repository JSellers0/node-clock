import express, {Router, Request, Response} from 'express'

import * as clockController from '../controllers/clockController'
import {crsfProtection, parseForm} from '../modules/config'

const clockRoute:Router = express.Router()

clockRoute.get('/', (req: Request, res: Response) => {
    res.setHeader('Set-Cookie', 'isAuth=false')
    res.send("Home Route")
})

clockRoute.route('/start')
    .get(crsfProtection, clockController.clock_start_get)
    .post(parseForm, crsfProtection, clockController.clock_start_post)

export default clockRoute