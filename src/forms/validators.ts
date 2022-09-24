import {JSDOM} from 'jsdom'

export abstract class FormValidator {
    abstract validate(form_field_html: string): string
}

export class DataRequired extends FormValidator {
    constructor() {
        super()
    }

    validate(form_field_html: string): string {
        let input_field = new JSDOM(form_field_html).window.document.getElementsByTagName("input")[0]
        input_field.setAttribute("required", "")
        return input_field.outerHTML
    }
}

export class Length extends FormValidator {
    settings: {[key: string]: string}
    constructor(settings: {[key: string]: string}) {
        super()
        this.settings = settings
    }

    validate(form_field_html: string): string {
        let input_field = new JSDOM(form_field_html).window.document.getElementsByTagName("input")[0]
        if (typeof(this.settings.min) !== 'undefined') {
            input_field.setAttribute('minlength', this.settings.min)
        }
        if (typeof(this.settings.max) !== 'undefined') {
            input_field.setAttribute('maxlength', this.settings.max)
        }
        return input_field.outerHTML
    }
}