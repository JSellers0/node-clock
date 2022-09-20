import express, {Router, Request, Response} from 'express'

import * as userController from '../controllers/userController'
import {crsfProtection, parseForm} from '../modules/config'
import {user_manager} from '../modules/user_manager'

const userRoute:Router = express.Router()

userRoute.get('/register', crsfProtection, userController.user_create_get)

userRoute.get('/login', crsfProtection, userController.user_login_get)
userRoute.post('/login', parseForm, crsfProtection, userController.user_login_post)

export default userRoute