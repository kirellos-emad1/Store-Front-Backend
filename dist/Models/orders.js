"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const database_1 = __importDefault(require("../database"));
class orderModel {
    async create(order) {
        try {
            const myConn = await database_1.default.connect();
            const sql = `INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *`;
            const result = await myConn.query(sql, [order.status, order.user_id]);
            myConn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Can't create order :Error ${error}`);
        }
    }
    async show(id) {
        try {
            const myConn = await database_1.default.connect();
            const sql = `SELECT * FROM orders WHERE id=($1)`;
            const result = await myConn.query(sql, [id]);
            myConn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`No orders to view ${err}`);
        }
    }
    async addProductToOrder(product) {
        try {
            const myConn = await database_1.default.connect();
            const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *`;
            const result = await myConn.query(sql, [
                product.quantity,
                product.order_id,
                product.product_id,
            ]);
            myConn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Can't add product to order${err}`);
        }
    }
    async completedOrders(id) {
        try {
            const myConn = await database_1.default.connect();
            const sql = `select orders.user_id, orders.id as order_id, orders.status, order_products.quantity, products.name, products.price, products.id as product_id
    from orders
    join order_products on orders.id = order_products.order_id
    join products on order_products.product_id = products.id
    where user_id = $1`;
            const result = await myConn.query(sql, [id]);
            myConn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`There is no completed order${err}`);
        }
    }
}
exports.orderModel = orderModel;
