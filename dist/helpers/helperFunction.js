"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetTable = exports.testingDb = void 0;
const products_1 = require("../Models/products");
const users_1 = require("../Models/users");
const database_1 = __importDefault(require("../database"));
const product = new products_1.productModel();
const user = new users_1.userModel();
async function testingDb() {
    const userData = {
        firstName: "abc",
        lastName: "dfg",
        email: "example@example.com",
        password: "12345",
        role: "ADMIN"
    };
    const productData = {
        name: "milk",
        category: "drink",
        description: 'healthy drink',
        price: 5,
        images: ["img1.png", "img2.png"],
        quantity: 5,
        user_id: 1
    };
    await user.create(userData);
    await product.create(productData);
}
exports.testingDb = testingDb;
async function resetTable(name) {
    const myConn = await database_1.default.connect();
    const sql = `
    delete from ${name};\n
    alter sequence ${name}_id_seq restart with 1;\n
    `;
    await myConn.query(sql);
}
exports.resetTable = resetTable;
