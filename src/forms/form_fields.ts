import {FormValidator} from './validators'

abstract class FormField {
    name: string
    display_name: string
    validators: FormValidator[] | []
    constructor(name: string, validators?: FormValidator[]) {
        this.name = name.toLowerCase().replace(' ', '')
        this.display_name = name
        if (typeof validators !== 'undefined'){
            this.validators = validators
        } else this.validators = []
    }

    abstract field(class_string: string, list?:string): string
    label(class_string: string): string {
        return `<label class="${class_string}" for="${this.name}">${this.display_name}</label>`
    }
    validate(html_field: string): string {
        for (const validator of this.validators) {
            html_field = validator.validate(html_field)
        }
        return html_field
    }
}

export class StringField extends FormField {
    constructor(name: string, validators?: FormValidator[]) {
        super(name, validators)
    }
    field(class_string: string, value?:string, list?:string): string {
        let html_field: string
        // ToDo: Do this better
        if (typeof(value) !== 'undefined') {
            if (typeof(list) !== 'undefined') {
                html_field = `<input id="${this.name}" class="${class_string}" name="${this.name}" type="text" value="${value}" list="${list}">`
            }
            else {
                html_field = `<input id="${this.name}" class="${class_string}" name="${this.name}" type="text" value="${value}">`
            }   
        } else {
            html_field = `<input id="${this.name}" class="${class_string}" name="${this.name}" type="text" value="">`
        }
        return this.validate(html_field)
    }
}

export class PasswordField extends FormField {
    constructor(name: string, validators?: FormValidator[]) {
        super(name, validators)
    }
    field(class_string: string): string {
        let html_field: string =  `<input id="${this.name}" class="${class_string}" name="${this.name}" type="password" value="">`
        return this.validate(html_field)
    }
}

export class BooleanField extends FormField {
    constructor(name: string) {
        super(name)
    }
    field(class_string: string): string {
        return `<input id="${this.name}" class="${class_string}" name="${this.name}" type="checkbox" value="">`
    }
}

export class SubmitField extends FormField {
    constructor(name: string) {
        super(name)
    }
    field(class_string: string): string {
        return `<input id="${this.name}" class="${class_string}" name="${this.name}" type="submit" value="${this.display_name}">`
    }
}

export class SelectField extends FormField {
    choices: Array<[string, string]>
    constructor(name: string, choices: Array<[string, string]>) {
        super(name)
        this.choices = choices
    }
    field(class_string: string): string {
        var field_string = `<select id="${this.name}" class="${class_string}" name="${this.name}" required="">`
        for (const option of this.choices) {
            field_string += `\n\t<option value="${option[0]}">${option[1]}</option>`
        }
        field_string += '\n</select>'
        return field_string
    }
}

export class DateField extends FormField {
    constructor(name: string, validators?: FormValidator[]) {
        super(name, validators)
    }
    field(class_string: string): string {
        let html_field: string = `<input id="${this.name}" class="${class_string}" name="${this.name}" type="date" value="">`
        return this.validate(html_field)
    }
}