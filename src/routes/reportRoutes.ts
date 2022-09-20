import express, {Router, Request, Response} from 'express'

import * as reportController from '../controllers/reportController'
import {crsfProtection, parseForm} from '../modules/config'
import {user_manager} from '../modules/user_manager'