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
        firstname: "abc",
        lastname: "cba",
        hashpwd: "12345",
    };
    const productData: Product = {
        name: "milk",
        price: 5,
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