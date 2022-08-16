"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const database_1 = __importDefault(require("../database"));
class userModel {
    async index() {
        try {
            const myConn = await database_1.default.connect();
            const sql = `SELECT id, firstName, lastName FROM users`;
            const result = await myConn.query(sql);
            myConn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`no user is found${err}`);
        }
    }
    async show(id) {
        try {
            const myConn = await database_1.default.connect();
            const sql = `SELECT id, firstName, lastName FROM users WHERE id=($1)`;
            const result = await myConn.query(sql, [id]);
            myConn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`no user found with this id ${err}`);
        }
    }
    async create(info) {
        try {
            const myConn = await database_1.default.connect();
            const sql = `INSERT INTO users (firstName, lastName, hashpwd) VALUES($1, $2, $3) RETURNING id, firstName, lastName`;
            const result = await myConn.query(sql, [
                info.firstname,
                info.lastname,
                info.hashpwd,
            ]);
            myConn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`can't create user ${err}`);
        }
    }
}
exports.userModel = userModel;
