"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const helperFunction_1 = require("../../helpers/helperFunction");
const request = (0, supertest_1.default)(server_1.default);
describe("Test Order Endpoints responses", () => {
    let token;
    beforeAll(async () => {
        const data = {
            firstName: "abc",
            lastName: "cba",
            password: "12345",
        };
        const response = await request.post("/users").send(data);
        token = response.body.token;
        await request
            .post("/products")
            .send({
            name: "milk",
            price: 5,
            category: 'Food'
        })
            .set("Authorization", `Bearer ${token}`);
    });
    afterAll(async () => {
        await (0, helperFunction_1.resetTable)("order_products");
        await (0, helperFunction_1.resetTable)("orders");
        await (0, helperFunction_1.resetTable)("products");
        await (0, helperFunction_1.resetTable)("users");
    });
    it("POST /orders should create new order and return status code 200", async () => {
        const response = await request
            .post("/orders")
            .send({
            status: "active"
        })
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            status: "active",
            user_id: 1,
        });
    });
    it("POST /orders/:id/addProduct should add product to given order id and return status code 200", async () => {
        const response = await request
            .post("/orders/1/addproduct")
            .send({
            quantity: 3,
            product_id: 1
        })
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            quantity: 3,
            order_id: 1,
            product_id: 1,
        });
    });
    it("GET /orders/userorders should return [] of orders belong to given user id inside the token and return status code 200", async () => {
        const response = await request
            .get("/orders/userorders")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
                user_id: 1,
                order_id: 1,
                status: "active",
                quantity: 3,
                name: "milk",
                price: 5,
                product_id: 1,
            },]);
    });
});
