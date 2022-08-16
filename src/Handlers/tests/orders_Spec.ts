import app from '../../server';
import supertest from 'supertest';
import {
  resetTable
} from "../../helpers/helperFunction";

const request = supertest(app);

describe("Test Order Endpoints responses", () => {
  let token: string;

  beforeAll(async (): Promise < void > => {
    const data: object = {
      firstname: "abc",
      lastname: "cba",
      hashpwd: "12345",
    };

    
    const response = await request.post("/users").send(data);
    token = response.body.token;
    await request
      .post("/products")
      .send({
        name: "milk",
        price: 5,
      })
      .set("Authorization", `Bearer ${token}`);
  });

  afterAll(async (): Promise < void > => {
    await resetTable("order_products");
    await resetTable("orders");
    await resetTable("products");
    await resetTable("users");
});


  it("POST /orders should create new order and return status code 200", async (): Promise < void > => {
    const response = await request
      .post("/orders")
      .send({
        status: "active"
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      status: "active",
      user_id: 1,
    });
  });

  it("POST /orders/:id/addProduct should add product to given order id and return status code 200", async (): Promise < void > => {
    const response = await request
      .post("/orders/1/addproduct")
      .send({
        quantity: 3,
        product_id: 1
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      quantity: 3,
      order_id: 1,
      product_id: 1,
    });
  });

  it("GET /orders/userorders should return [] of orders belong to given user id inside the token and return status code 200", async (): Promise < void > => {
    const response = await request
      .get("/orders/userorders")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{
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