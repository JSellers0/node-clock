import express, {Router, Request, Response} from 'express'

import * as reportController from '../controllers/reportController'
import {crsfProtection, parseForm} from '../middleware/config'
