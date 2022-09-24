"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./modules/config");
const clockRoutes_1 = __importDefault(require("./routes/clockRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const adjustRoutes_1 = __importDefault(require("./routes/adjustRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
nunjucks_1.default.configure(path_1.default.resolve(__dirname, 'views'), {
    express: app,
    autoescape: true,
    noCache: false,
    watch: true
});
app.use('/static', express_1.default.static(__dirname + "/static"));
app.use((0, cookie_parser_1.default)());
app.use(config_1.domainHandler);
app.use('/', clockRoutes_1.default);
app.use('/users', userRoutes_1.default);
app.use('/adjust', adjustRoutes_1.default);
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
app.use(config_1.errorHandler);
const server = app.listen(config_1.PORT, () => console.log(`Broadcasting on Port ${config_1.PORT}`));
