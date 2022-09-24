"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateField = exports.SelectField = exports.SubmitField = exports.BooleanField = exports.PasswordField = exports.StringField = void 0;
class FormField {
    constructor(name) {
        this.name = name.toLowerCase();
        this.display_name = name;
    }
    label(class_string) {
        return `<label class="${class_string}" for="${this.name}">${this.display_name}</label>`;
    }
}
class StringField extends FormField {
    constructor(name, validators) {
        super(name);
        this.validators = validators;
    }
    field(class_string) {
        let html_field = `<input id="${this.name}" class="${class_string}" name="${this.name}" type="text" value="">`;
        for (const validator of this.validators) {
            html_field = validator.validate(html_field);
        }
        return html_field;
    }
}
exports.StringField = StringField;
class PasswordField extends FormField {
    constructor(name) {
        super(name);
    }
    field(class_string) {
        return `<input id="${this.name}" class="${class_string}" name="${this.name}" type="password" value="">`;
    }
}
exports.PasswordField = PasswordField;
class BooleanField extends FormField {
    constructor(name) {
        super(name);
    }
    field(class_string) {
        return `<input id="${this.name}" class="${class_string}" name="${this.name}" type="checkbox" value="">`;
    }
}
exports.BooleanField = BooleanField;
class SubmitField extends FormField {
    constructor(name) {
        super(name);
    }
    field(class_string) {
        return `<input id="${this.name}" class="${class_string}" name="${this.name}" type="submit" value="${this.display_name}">`;
    }
}
exports.SubmitField = SubmitField;
class SelectField extends FormField {
    constructor(name, choices) {
        super(name);
        this.choices = choices;
    }
    field(class_string) {
        var field_string = `<select id="${this.name}" class="${class_string}" name="${this.name}" required="">`;
        for (const option of this.choices) {
            field_string += `\n\t<option value="${option[0]}">${option[1]}</option>`;
        }
        field_string += '\n</select>';
        return field_string;
    }
}
exports.SelectField = SelectField;
class DateField extends FormField {
    constructor(name) {
        super(name);
    }
    field(class_string) {
        return `<input id="${this.name}" class="${class_string}" name="${this.name}" type="date" value="">`;
    }
}
exports.DateField = DateField;
