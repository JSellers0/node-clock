"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_user = exports.pool = void 0;
const mariadb_1 = require("mariadb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function init() {
    try {
        let pool = (0, mariadb_1.createPool)({
            connectionLimit: 4,
            host: '192.168.40.100',
            user: process.env.MDB,
            password: process.env.MARIADB,
            database: 'clock',
        });
        console.debug('MariaDB Adapter Pool generated successfully.');
        return pool;
    }
    catch (error) {
        console.error('[db.ts][init][Error]: ', error);
        throw new Error('failed to initialize pool');
    }
}
exports.pool = init();
function get_user(retrieval_key, retrival_value) {
    return __awaiter(this, void 0, void 0, function* () {
        let conn;
        try {
            conn = yield exports.pool.getConnection();
            const rows = yield conn.query(`SELECT * FROM user WHERE ${retrieval_key} = '${retrival_value}';`);
            return rows;
        }
        catch (err) {
            throw err;
        }
        finally {
            if (conn)
                return conn.end();
        }
    });
}
exports.get_user = get_user;
