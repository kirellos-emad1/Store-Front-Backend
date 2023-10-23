"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../orders");
const helperFunction_1 = require("../../helpers/helperFunction");
const orderTest = new orders_1.orderModel();
describe("Testing Order Model", () => {
    beforeAll(async () => {
        await (0, helperFunction_1.testingDb)();
    });
    afterAll(async () => {
        await (0, helperFunction_1.resetTable)("order_products");
        await (0, helperFunction_1.resetTable)("orders");
        await (0, helperFunction_1.resetTable)("products");
        await (0, helperFunction_1.resetTable)("users");
    });
    it("should create new order and return new order record", async () => {
        const data = {
            status: "active",
            user_id: 1,
        };
        const result = await orderTest.create(data);
        expect(result).toEqual({
            id: 1,
            status: "active",
            user_id: 1,
        });
    });
    it("should add product to order_products table", async () => {
        const data = {
            quantity: 3,
            order_id: 1,
            product_id: 1,
        };
        const result = await orderTest.addProductToOrder(data);
        expect(result).toEqual({
            id: 1,
            quantity: 3,
            order_id: 1,
            product_id: 1,
        });
    });
    it("should return user orders given user id", async () => {
        const result = await orderTest.completedOrders(1);
        expect(result).toEqual([{
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
