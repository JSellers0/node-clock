import express, {Router} from 'express'

import * as clockController from '../controllers/clockController'
import { authenticateJWT } from '../middleware/auth'
import {crsfProtection, parseForm} from '../middleware/config'

const clockRoute:Router = express.Router()

clockRoute.get('/', clockController.home_get)

clockRoute.get("/clock", authenticateJWT, clockController.clock_get)

clockRoute.route('/start')
    .get(authenticateJWT, crsfProtection, clockController.clock_start_get)
    .post(authenticateJWT, parseForm, crsfProtection, clockController.clock_start_post)

clockRoute.get("/stop", authenticateJWT, clockController.clock_stop)
    
export default clockRoute