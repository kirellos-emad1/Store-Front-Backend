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
        const result = await user.index();
        expect(result).toEqual([]);
    });
    it("should create new user and return new user", async () => {
        const data = {
            firstname: "abc",
            lastname: "cba",
            hashpwd: "12345",
        };
        const result = await user.create(data);
        expect(result).toEqual({
            id: 1,
            firstname: "abc",
            lastname: "cba",
        });
    });
    it("index method should return [] of all users", async () => {
        const result = await user.index();
        expect(result).toEqual([{
                id: 1,
                firstname: "abc",
                lastname: "cba",
            },]);
    });
    it("show method should return user of given Id", async () => {
        const result = await user.show(1);
        expect(result).toEqual({
            id: 1,
            firstname: "abc",
            lastname: "cba",
        });
    });
});
