"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const helperFunction_1 = require("../../helpers/helperFunction");
const request = (0, supertest_1.default)(server_1.default);
describe("Test User Endpoints responses", () => {
    afterAll(async () => {
        await (0, helperFunction_1.resetTable)("users");
    });
    let token;
    it("POST /users should create new user and return status code 200", async () => {
        const data = {
            firstname: "abc",
            lastname: "cba",
            hashpwd: "12345",
        };
        const response = await request.post("/users").send(data);
        token = response.body.token;
        expect(response.status).toBe(200);
        expect(response.body.result).toEqual({
            id: 1,
            firstname: "abc",
            lastname: "cba",
        });
    });
    it("GET /users should return [] of users and return status code 200", async () => {
        const response = await request
            .get("/users")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                id: 1,
                firstname: "abc",
                lastname: "cba",
            },
        ]);
    });
    it("GET /user/:id should return user of given id and return status code 200", async () => {
        const response = await request
            .get("/users/1")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 1,
            firstname: "abc",
            lastname: "cba",
        });
    });
});
