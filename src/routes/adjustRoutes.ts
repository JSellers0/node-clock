import express, {Router, Request, Response} from 'express'

import * as adjustController from '../controllers/adjustController'
import {crsfProtection, parseForm} from '../modules/config'
import {user_manager} from '../modules/user_manager'