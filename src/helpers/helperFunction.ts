import {
    productModel,
    Product
} from "../Models/products";
import {
    userModel,
    userInfo
} from "../Models/users";
import client from "../database";

const product = new productModel();
const user = new userModel();

export async function testingDb(): Promise < void > {
    const userData: userInfo = {
        firstName: "abc",
        lastName: "dfg",
        email:"example@example.com",
        password: "12345",
        role: "ADMIN"
    };
    const productData: Product = {
        name: "milk",
        category:"drink",
        description:'healthy drink',
        price: 5,
        images:["img1.png","img2.png"],
        quantity: 5,
        user_id:1
    };
    await user.create(userData);
    await product.create(productData);
}

export async function resetTable(name: string): Promise < void > {
    const myConn = await client.connect()
    const sql = `
    delete from ${name};\n
    alter sequence ${name}_id_seq restart with 1;\n
    `;
    await myConn.query(sql);
}