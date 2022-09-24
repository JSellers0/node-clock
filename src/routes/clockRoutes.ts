import express, {Router, Request, Response} from 'express'

import * as clockController from '../controllers/clockController'
import {crsfProtection, parseForm} from '../middleware/config'

const clockRoute:Router = express.Router()

clockRoute.get('/', clockController.clock_get)

clockRoute.route('/start')
    .get(crsfProtection, clockController.clock_start_get)
    .post(parseForm, crsfProtection, clockController.clock_start_post)

export default clockRoute