import {
    userModel,
    userInfo
} from "../users";
import {resetTable} from "../../helpers/helperFunction"


const user = new userModel();

describe("Testing User Model", (): void => {
    afterAll(async (): Promise < void > => {
        await resetTable("users");
    });

    it("index method should return empty [] when users table have no data", async (): Promise < void > => {
        const result: userInfo[] = await user.getAllUsers();
        expect(result).toEqual([]);
    });

    it("should create new user and return new user", async (): Promise < void > => {
        const data: userInfo = {
            firstName: "abc",
            lastName: "cba",
            email:"abc@gmail,com",
            role:"USER",
            isEmailVerified:true,
            password: "123456789",
        };
        const result: userInfo = await user.create(data);
        expect(result).toEqual({
            id:1,
            firstName: "abc",
            lastName: "cba",
            email:"abc@gmail.com",
            role:"USER",
            isEmailVerified:true,
            password:"123456789"
        });
    });

    it("index method should return [] of all users", async (): Promise < void > => {
        const result: userInfo[] = await user.getAllUsers();
        expect(result).toEqual([{
            id: 1,
            firstName: "abc",
            lastName: "cba",
            email:"abc@gmail.com",
            password:"123456789",
            role:"USER",
            isEmailVerified:true
        }, ]);
    });

    it("show method should return user of given Id", async (): Promise < void > => {
        const result: userInfo = await user.getSpecificUser(1);
        expect(result).toEqual({
            id: 1,
            firstName: "abc",
            lastName: "cba",
            email:"abc@gmail.com",
            role:"USER",
            isEmailVerified:true,
            password:"123456789"
        });
    });
});