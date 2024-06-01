import {
    productModel,
    Product
} from "../products";
import {
    resetTable
} from "../../helpers/helperFunction";

const product = new productModel();

describe("Testing Product Model", (): void => {
    afterAll(async (): Promise < void > => {
        await resetTable("products");
    });

    it("index method should return empty [] when products table have no data", async (): Promise < void > => {
        const result: Product[] = await product.showAllProducts();
        expect(result).toEqual([]);
    });

    it("should create new product and return new product", async (): Promise < void > => {
        const data: Product = {
            name: "milk",
            price: 5,
            category:'drinks',
            description:'healthy drink',
            images:["img1.jpg"],
            quantity:5,
            user_id:1
        };
        const result: Product = await product.create(data);
        expect(result).toEqual({
            id: 1,
            name: "milk",
            price: 5,
            category:'drinks',
            description:'healthy drink',
            images:["img1.jpg"],
            quantity:5,
            user_id:1
        });
    });

    it("index method should return [] of all products", async (): Promise < void > => {
        const result: Product[] = await product.showAllProducts();
        expect(result).toEqual([{
            id: 1,
            name: "milk",
            price: 5,
            category:'drinks',
            description:'healthy drink',
            images:["img1.jpg"],
            quantity:5,
            user_id:1
        }, ]);
    });

    it("show method should return product of given Id", async (): Promise < void > => {
        const result: Product = await product.showSpecificProduct(1);
        expect(result).toEqual({
            id:1,
            name: "milk",
            price: 5,
            category:'drinks',
            description:'healthy drink',
            images:["img1.jpg"],
            quantity:5,
            user_id:1
        });
    });
});