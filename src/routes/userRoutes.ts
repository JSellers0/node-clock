import express, {Router, Request, Response} from 'express'

import * as userController from '../controllers/userController'
import {crsfProtection, parseForm} from '../modules/config'
import {user_manager} from '../modules/user_manager'

const userRoute:Router = express.Router()

userRoute.route('/register')
    .get(crsfProtection, userController.user_create_get)
    .post(parseForm, crsfProtection, userController.user_create_post)

userRoute.route('/login')
    .get(crsfProtection, userController.user_login_get)
    .post(parseForm, crsfProtection, userController.user_login_post)

userRoute.route('/account')
    .get(crsfProtection, userController.user_detail_get)
    .put(parseForm, crsfProtection, userController.user_detail_update)
    .delete(parseForm, crsfProtection, userController.user_detail_delete)

export default userRoute