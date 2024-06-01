"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const helperFunction_1 = require("../../helpers/helperFunction");
const user = new users_1.userModel();
describe("Testing User Model", () => {
    afterAll(async () => {
        await (0, helperFunction_1.resetTable)("users");
    });
    it("index method should return empty [] when users table have no data", async () => {
        const result = await user.getAllUsers();
        expect(result).toEqual([]);
    });
    it("should create new user and return new user", async () => {
        const data = {
            firstName: "abc",
            lastName: "cba",
            email: "abc@gmail,com",
            role: "USER",
            isEmailVerified: true,
            password: "123456789",
        };
        const result = await user.create(data);
        expect(result).toEqual({
            id: 1,
            firstName: "abc",
            lastName: "cba",
            email: "abc@gmail.com",
            role: "USER",
            isEmailVerified: true,
            password: "123456789"
        });
    });
    it("index method should return [] of all users", async () => {
        const result = await user.getAllUsers();
        expect(result).toEqual([{
                id: 1,
                firstName: "abc",
                lastName: "cba",
                email: "abc@gmail.com",
                password: "123456789",
                role: "USER",
                isEmailVerified: true
            },]);
    });
    it("show method should return user of given Id", async () => {
        const result = await user.getSpecificUser(1);
        expect(result).toEqual({
            id: 1,
            firstName: "abc",
            lastName: "cba",
            email: "abc@gmail.com",
            role: "USER",
            isEmailVerified: true,
            password: "123456789"
        });
    });
});
