import * as formfield from './form_fields'
import { DataRequired, Length } from './validators'

export class RegisterForm {
    tzs: Array<[string, string]> = [
        ["US/Eastern", "US/Eastern"],
        ["US/Central", "US/Central"],
        ["US/Pacific", "US/Pacific"]
    ]
    user_name: formfield.StringField = new formfield.StringField("Username", [new DataRequired(), new Length({"max": "40"})])
    email: formfield.StringField = new formfield.StringField("Email", [new DataRequired()])
    timezone: formfield.SelectField = new formfield.SelectField("Local timezone", this.tzs)
    password: formfield.PasswordField = new formfield.PasswordField('Password', [new DataRequired()])
    confirm_password: formfield.PasswordField = new formfield.PasswordField('Confirm Password', [new DataRequired()])
    submit: formfield.SubmitField = new formfield.SubmitField("Register")
}

export class LoginForm {
    user_name: formfield.StringField = new formfield.StringField("Username", [new DataRequired()])
    password: formfield.PasswordField = new formfield.PasswordField('Password', [new DataRequired()])
    remember: formfield.BooleanField = new formfield.BooleanField("Remember Me")
    submit: formfield.SubmitField = new formfield.SubmitField("Login")
}

export class StartForm {
    project: formfield.StringField = new formfield.StringField("Project", [new DataRequired()])
    task: formfield.StringField = new formfield.StringField("Task", [new DataRequired()])
    note: formfield.StringField = new formfield.StringField("Note", [new DataRequired()])
    submit: formfield.SubmitField = new formfield.SubmitField("Start")
}

export class DateSelectForm {
    range_begin: formfield.DateField = new formfield.DateField("Starting Date", [new DataRequired()])
    range_end: formfield.DateField = new formfield.DateField("Ending Date", [new DataRequired()])
    submit: formfield.SubmitField = new formfield.SubmitField("Submit")
}

export class ItemEditForm {
    project: formfield.StringField = new formfield.StringField("Project")
    task: formfield.StringField = new formfield.StringField("Task")
    note: formfield.StringField = new formfield.StringField("Note")
    start: formfield.StringField = new formfield.StringField("Start Time")
    stop: formfield.StringField = new formfield.StringField("Stop Time")
    adjacent: formfield.BooleanField = new formfield.BooleanField("Update adjacent timestamp rows.")
    submit: formfield.SubmitField = new formfield.SubmitField("Submit")
}