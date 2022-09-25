import express, {Router} from 'express'

import * as reportController from '../controllers/reportController'
import { authenticateJWT } from '../middleware/auth'
import {crsfProtection, parseForm} from '../middleware/config'

const reportRoute:Router = express.Router()

reportRoute.use(authenticateJWT)

reportRoute.route('/')
    .get(crsfProtection, reportController.report_get)
    .post(parseForm, crsfProtection, reportController.report_post)

export default reportRoute