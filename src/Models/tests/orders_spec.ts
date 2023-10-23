import {
    orderModel,
    order,
    orderProduct,
    userOrder,
} from "../orders";
import {
    testingDb,
    resetTable
} from "../../helpers/helperFunction";
const orderTest = new orderModel();

describe("Testing Order Model", (): void => {
    beforeAll(async (): Promise < void > => {
        await testingDb();
    });

    afterAll(async (): Promise < void > => {
        await resetTable("order_products");
        await resetTable("orders");
        await resetTable("products");
        await resetTable("users");
    });

    it("should create new order and return new order record", async (): Promise<void> => {
        const data: order = {
          status: "active",
          user_id: 1,
        };
        const result: order = await orderTest.create(data);
        expect(result).toEqual({
          id: 1,
          status: "active",
          user_id: 1,
        });
      });

    it("should add product to order_products table", async (): Promise < void > => {
        const data: orderProduct = {
            quantity: 3,
            order_id: 1,
            product_id: 1,
        };
        const result: orderProduct = await orderTest.addProductToOrder(data);
        expect(result).toEqual({
            id: 1,
            quantity: 3,
            order_id: 1,
            product_id: 1,
        });
    });

    it("should return user orders given user id", async (): Promise < void > => {
        const result: userOrder[] = await orderTest.completedOrders(1);
        expect(result).toEqual([{
            user_id: 1,
            order_id: 1,
            status: "active",
            quantity: 3,
            name: "milk",
            price: 5,
            product_id: 1,
        }, ]);
    });
});