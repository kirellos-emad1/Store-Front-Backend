"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const helperFunction_1 = require("../../helpers/helperFunction");
const request = (0, supertest_1.default)(server_1.default);
describe("Test Product Endpoints responses", () => {
    let token;
    beforeAll(async () => {
        const data = {
            firstname: "abc",
            lastname: "cba",
            hashpwd: "12345",
        };
        const response = await request.post("/users").send(data);
        token = response.body.token;
    });
    afterAll(async () => {
        await (0, helperFunction_1.resetTable)("users");
        await (0, helperFunction_1.resetTable)("products");
    });
    it("POST /products should create new product and return status code 200", async () => {
        const data = {
            name: "milk",
            price: 5,
        };
        const response = await request
            .post("/products")
            .send(data)
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            name: "milk",
            price: 5,
        });
    });
    it("GET /product should return [] of products and return status code 200", async () => {
        const response = await request.get("/products");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                id: 1,
                name: "milk",
                price: 5,
            },
        ]);
    });
    it("GET /product/:id should return product of given id and return status code 200", async () => {
        const response = await request.get("/products/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            name: "milk",
            price: 5,
        });
    });
});
