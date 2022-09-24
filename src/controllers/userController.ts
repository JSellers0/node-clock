import bcrypt from 'bcrypt'
import {Request, Response, NextFunction} from 'express'
import { pool } from '../config/db.config'
import {LoginForm, RegisterForm} from '../forms/forms'

export function user_create_get(req: Request, res: Response, next: NextFunction) {
    let form = new RegisterForm()
    let site_components = {
        crsfToken: req.csrfToken(), 
        domain: res.locals.domain, 
        form: form
    }
    res.render("register.njk", site_components)
}

export async function user_create_post(req: Request, res: Response, next: NextFunction) {
    res.send("NOT IMPLEMENTED: User create POST")
}

export function user_login_get(req: Request, res: Response, next: NextFunction) {
    let form = new LoginForm()
    let site_components = {
        crsfToken: req.csrfToken(), 
        domain: res.locals.domain, 
        form: form,
        flash: req.cookies['flash'],
        flash_class: req.cookies['flash_class']
    }
    res.clearCookie('flash')
    res.clearCookie('flash_class')
    res.render("login.njk", site_components)
}

export async function user_login_post(req: Request, res: Response, next: NextFunction) {
    let isAuth: boolean  = await pool.getConnection()
        .then( conn => {
            return conn.query(`SELECT user_token FROM user WHERE user_name = ? LIMIT 1;`, [req.body.username])
        }) .then( rows => { return rows.length ? rows[0].user_token : ''})
        .then( token => { return bcrypt.compare(req.body.password, token) })
        .then( authorized => { return authorized })
    if (isAuth) {
        // I know this is not secure.
        res.cookie('isAuth', isAuth)
        res.redirect('/')
    }
    else {
        res.cookie('flash', "User not recognized.  Please check your info or Register an Account!")
        res.cookie('flash_class', "danger")
        res.redirect('/users/login')
    }
    
}

export function user_detail_get(req: Request, res: Response, next: NextFunction) {
    res.send("NOT IMPLEMENTED: User detail GET")
}

export async function user_detail_update(req: Request, res: Response, next: NextFunction) {
    res.send("NOT IMPLEMENTED: User detail UPDATE")
}

export async function user_detail_delete(req: Request, res: Response, next: NextFunction) {
    res.send("NOT IMPLEMENTED: User detail DELETE")
}

export function user_logout(req: Request, res: Response, next: NextFunction) {
    res.clearCookie('isAuth')
    res.redirect('/')
}