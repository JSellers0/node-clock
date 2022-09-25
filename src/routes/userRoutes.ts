import express, {Router, Request, Response} from 'express'

import * as userController from '../controllers/userController'
import { authenticateJWT } from '../middleware/auth'
import {crsfProtection, parseForm} from '../middleware/config'

const userRoute:Router = express.Router()

userRoute.route('/register')
    .get(crsfProtection, userController.user_create_get)
    .post(parseForm, crsfProtection, userController.user_create_post)

userRoute.route('/login')
    .get(crsfProtection, userController.user_login_get)
    .post(parseForm, crsfProtection, userController.user_login_post)

userRoute.route('/account')
    .get(authenticateJWT, crsfProtection, userController.user_detail_get)
    .put(parseForm, crsfProtection, userController.user_detail_update)
    .delete(parseForm, crsfProtection, userController.user_detail_delete)

userRoute.route('/logout')
    .get(userController.user_logout)

export default userRoute