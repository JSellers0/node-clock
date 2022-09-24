"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRequired = exports.FormValidator = void 0;
const jsdom_1 = require("jsdom");
class FormValidator {
}
exports.FormValidator = FormValidator;
class DataRequired extends FormValidator {
    constructor() {
        super();
    }
    validate(form_field_html) {
        let dom = new jsdom_1.JSDOM(form_field_html);
        dom.window.document.getElementsByTagName("input")[0].setAttribute("required", "");
        return "validated";
    }
}
exports.DataRequired = DataRequired;
