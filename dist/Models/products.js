"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const database_1 = __importDefault(require("../database"));
class productModel {
    async index() {
        try {
            const myConn = await database_1.default.connect();
            const sql = `SELECT * FROM products`;
            const result = await myConn.query(sql);
            myConn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`There no products found ${err}`);
        }
    }
    async show(id) {
        try {
            const myConn = await database_1.default.connect();
            const sql = `SELECT * FROM products WHERE id=($1)`;
            const result = await myConn.query(sql, [id]);
            myConn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`There is no products for this id ${err}`);
        }
    }
    async create(product) {
        try {
            const myConn = await database_1.default.connect();
            const sql = `INSERT INTO products (name, price) VALUES($1, $2) RETURNING *`;
            const result = await myConn.query(sql, [product.name, product.price]);
            myConn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can't create product ${err}`);
        }
    }
}
exports.productModel = productModel;
