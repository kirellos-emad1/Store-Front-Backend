"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../products");
const helperFunction_1 = require("../../helpers/helperFunction");
const product = new products_1.productModel();
describe("Testing Product Model", () => {
    afterAll(async () => {
        await (0, helperFunction_1.resetTable)("products");
    });
    it("index method should return empty [] when products table have no data", async () => {
        const result = await product.showAllProducts();
        expect(result).toEqual([]);
    });
    it("should create new product and return new product", async () => {
        const data = {
            name: "milk",
            price: 5,
            category: 'drinks',
            description: 'healthy drink',
            images: ["img1.jpg"],
            quantity: 5,
            user_id: 1
        };
        const result = await product.create(data);
        expect(result).toEqual({
            id: 1,
            name: "milk",
            price: 5,
            category: 'drinks',
            description: 'healthy drink',
            images: ["img1.jpg"],
            quantity: 5,
            user_id: 1
        });
    });
    it("index method should return [] of all products", async () => {
        const result = await product.showAllProducts();
        expect(result).toEqual([{
                id: 1,
                name: "milk",
                price: 5,
                category: 'drinks',
                description: 'healthy drink',
                images: ["img1.jpg"],
                quantity: 5,
                user_id: 1
            },]);
    });
    it("show method should return product of given Id", async () => {
        const result = await product.showSpecificProduct(1);
        expect(result).toEqual({
            id: 1,
            name: "milk",
            price: 5,
            category: 'drinks',
            description: 'healthy drink',
            images: ["img1.jpg"],
            quantity: 5,
            user_id: 1
        });
    });
});
