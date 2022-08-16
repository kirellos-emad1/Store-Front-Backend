import supertest from "supertest";
import app from "../../server";
import { resetTable } from "../../helpers/helperFunction";

const request = supertest(app);

describe("Test User Endpoints responses", () => {
  afterAll(async (): Promise<void> => {
    await resetTable("users");
  });

  let token: string;

  it("POST /users should create new user and return status code 200", async (): Promise<void> => {
    const data: object = {
      firstname: "abc",
      lastname: "cba",
      hashpwd: "12345",
    };
    const response = await request.post("/users").send(data);
    token = response.body.token;
    expect(response.status).toBe(200);
    expect(response.body.result).toEqual({
      id: 1,
      firstname: "abc",
      lastname: "cba",
    });
  });

  it("GET /users should return [] of users and return status code 200", async (): Promise<void> => {
    const response = await request
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        firstname: "abc",
        lastname: "cba",
      },
    ]);
  });

  it("GET /user/:id should return user of given id and return status code 200", async (): Promise<void> => {
    const response = await request
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      firstname: "abc",
      lastname: "cba",
    });
  });
});