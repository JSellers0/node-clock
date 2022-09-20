"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const path_1 = __importDefault(require("path"));
const clock_1 = __importDefault(require("./routes/clock"));
const users_1 = __importDefault(require("./routes/users"));
dotenv_1.default.config();
const PORT = Number(process.env.PORT) || 3000;
const app = (0, express_1.default)();
app.use('/', clock_1.default);
app.use('/users', users_1.default);
nunjucks_1.default.configure(path_1.default.resolve(__dirname, 'views'), {
    express: app,
    autoescape: true,
    noCache: false,
    watch: true
});
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
};
app.use(errorHandler);
const server = app.listen(PORT, () => console.log(`Broadcasting on Port ${PORT}`));
