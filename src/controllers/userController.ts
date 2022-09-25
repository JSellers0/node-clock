import bcrypt from 'bcrypt'
import {Request, Response, NextFunction} from 'express'
import { pool } from '../config/db.config'
import {LoginForm, RegisterForm} from '../forms/forms'
import jwt from "jsonwebtoken"
import user from '../models/user.model'
import { JWTSECRET } from '../middleware/config'

export function user_create_get(req: Request, res: Response, next: NextFunction) {
    let form = new RegisterForm()
    let site_components = {
        crsfToken: req.csrfToken(), 
        domain: res.locals.domain, 
        form: form,
        flash: req.cookies['flash'],
        flash_class: req.cookies['flash_class']
    }
    res.clearCookie('flash')
    res.clearCookie('flash_class')
    return res.render("register.njk", site_components)
}

export async function user_create_post(req: Request, res: Response, next: NextFunction) {
    let user_info = await user.get_user_by_username(req.body.username)
    if (user_info) {
        res.cookie('flash', "Username already exists.  Please check your info or Login!")
        res.cookie('flash_class', "danger")
        return res.redirect('/users/register')
    } else if (req.body.password !== req.body.confirmpassword){
        res.cookie('flash', "Passwords did not match! I'll figure out an ajax way to do this later.")
        res.cookie('flash_class', "danger")
        return res.redirect('/users/register')
    }
    let create_result = bcrypt.hash(req.body.password, 10, function(err, hash) {
        req.body.password = hash
        return user.create_user(req.body)
    })
    res.cookie('flash', `User ${req.body.username} Created Successfully!  Login to use NodeClock.`)
    res.cookie('flash_class', "success")
    return res.redirect("/users/login")
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
    return res.render("login.njk", site_components)
}

export async function user_login_post(req: Request, res: Response, next: NextFunction) {
    let user_info = await user.get_user_by_username(req.body.username)
    let isAuth = await bcrypt.compare(req.body.password, user_info.user_token)
    if (isAuth) {
        res.cookie("token", jwt.sign(
            {"userid": user_info.userid, "username": user_info.username},
            JWTSECRET, { expiresIn: "12h"}
        ))
        return res.redirect('/clock')
    } else {
        res.cookie('flash', "User not recognized.  Please check your info or Register an Account!")
        res.cookie('flash_class', "danger")
        return res.redirect('/users/login')
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
    res.clearCookie('token')
    return res.redirect('/')
}