import {Request, Response, NextFunction} from 'express'
import { DateSelectForm } from '../forms/forms'
import timeclock from '../models/timeclock.model'

export function adjust_get(req: Request, res: Response, next: NextFunction) {
    return res.render("adjust.njk", res.locals.site_components)
}

export async function item_select_get(req: Request, res: Response, next: NextFunction) {
    let item_type: string = req.params.item_type.substring(0, 1).toUpperCase() + req.params.item_type.substring(1, req.params.item_type.length)
    console.log(item_type)
    if (item_type !== 'Time'){
        try {
            await timeclock.get_list(req.params.item_type)
                .then((items) => {
                    return Object.assign({}, res.locals.site_components, {
                        item_type: item_type,
                        items: items,
                    })
                }). then((site_components) => {
                    return res.render("adjust_itemselect.njk", site_components)
                })
        } catch(err) {
            // ToDo: Real Logging
            console.log(err)
        }
    }
    else {
        let form = new DateSelectForm
        let site_components = Object.assign({}, res.locals.site_components, {
            crsfToken: req.csrfToken(),
            form: form,
            flash: req.cookies['flash'],
            flash_class: req.cookies['flash_class']
        })
        res.clearCookie('flash')
        res.clearCookie('flash_class')
            return res.render("adjust_dateselect.njk", site_components)
    }
    
}

export function item_adjust_get(req: Request, res: Response, next: NextFunction) {
    //res.render("register.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    res.send("NOT IMPLEMENTED: item adjustment GET")
}

export async function item_adjust_put(req: Request, res: Response, next: NextFunction) {
    //res.render("register.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    res.send("NOT IMPLEMENTED: item adjustment PUT")
}

export async function item_adjust_delete(req: Request, res: Response, next: NextFunction) {
    //res.render("register.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    res.send("NOT IMPLEMENTED: item adjustment DELETE")
}