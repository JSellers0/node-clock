import { time } from 'console'
import {Request, Response, NextFunction} from 'express'
import { DateSelectForm, ItemEditForm } from '../forms/forms'
import timeclock, { item, timelog_form_data } from '../models/timeclock.model'

export function adjust_get(req: Request, res: Response, next: NextFunction) {
    return res.render("adjust.njk", res.locals.site_components)
}

export async function item_select(req: Request, res: Response, next: NextFunction) {
    let item_type: string = req.params.item_type.substring(0, 1).toUpperCase() + req.params.item_type.substring(1, req.params.item_type.length)
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
        if (req.body) {
            try {
                await timeclock.get_timelog_by_date(res.locals.jwtPayload.userid, req.body['startingdate'])
                .then(items => {
                    return Object.assign({}, res.locals.site_components, {
                        item_type: item_type,
                        items: items,
                        ft: timeclock.format_timestamp
                    })
                }). then((site_components) => {
                    return res.render("adjust_itemselect.njk", site_components)
                })
            } catch (err) {
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
}

export async function item_adjust_get(req: Request, res: Response, next: NextFunction) {
    let form: ItemEditForm = new ItemEditForm()
    let item: item | timelog_form_data
    // Get item
    if (req.params.item_type === 'time') {
        item = await timeclock.get_timelog_display_by_id(req.params.item_id)
    } else {
        item = await timeclock.get_item_by_id(req.params.item_id, req.params.item_type)
    }
    let site_components = Object.assign({}, res.locals.site_components, {
        crsfToken: req.csrfToken(),
        form: form,
        item: item,
        item_type: req.params.item_type,
        flash: req.cookies['flash'],
        flash_class: req.cookies['flash_class'],
        ft: timeclock.format_timestamp
    })
    res.render("adjust_item.njk", site_components)
}

export async function item_adjust_put(req: Request, res: Response, next: NextFunction) {
    //res.render("register.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    res.send("NOT IMPLEMENTED: item adjustment PUT")
}

export async function item_adjust_delete(req: Request, res: Response, next: NextFunction) {
    //res.render("register.njk", {crsfToken: req.csrfToken(), domain: res.locals.domain})
    res.send("NOT IMPLEMENTED: item adjustment DELETE")
}