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
        const result: userInfo[] = await user.index();
        expect(result).toEqual([]);
    });

    it("should create new user and return new user", async (): Promise < void > => {
        const data: userInfo = {
            firstname: "abc",
            lastname: "cba",
            hashpwd: "12345",
        };
        const result: userInfo = await user.create(data);
        expect(result).toEqual({
            id: 1,
            firstname: "abc",
            lastname: "cba",
        });
    });

    it("index method should return [] of all users", async (): Promise < void > => {
        const result: userInfo[] = await user.index();
        expect(result).toEqual([{
            id: 1,
            firstname: "abc",
            lastname: "cba",
        }, ]);
    });

    it("show method should return user of given Id", async (): Promise < void > => {
        const result: userInfo = await user.show(1);
        expect(result).toEqual({
            id: 1,
            firstname: "abc",
            lastname: "cba",
        });
    });
});