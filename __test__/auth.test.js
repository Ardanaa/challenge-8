require('dotenv').config()
const request = require("supertest");
const app = require("../app");

describe("POST /v1/auth/login", () => {
  it("should response with 201 as status code", async () => {
    const email = "johnny@binar.co.id";
    const password = "123456";
    let data = {
      email: email,
      password: password
    }

    return request(app)
      .post("/v1/auth/login")
      .set("Content-Type", "application/json")
      .send(data)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(res.body);
      });
  });

  it("should response with 404 as status code", async () => {
    const email = "johnny@binar";
    const password = "123450";
    let data = {
      email: email,
      password: password
    }

    return request(app)
      .post("/v1/auth/login")
      .set("Content-Type", "application/json")
      .send(data)
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(res.body);
      });
  });

  it("should response with 401 as status code", async () => {
    const email = "johnny@binar.co.id";
    const password = "salah";
    let data = {
      email: email,
      password: password
    }

    return request(app)
      .post("/v1/auth/login")
      .set("Content-Type", "application/json")
      .send(data)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual(res.body);
        expect(res.body).toEqual(
          expect.objectContaining({
            accessToken: expect.any(String),
          })
        );
        
      });
  });

  it("should response with 422 as status code, kalau akun ternyata sudah ada", async () => {
    const email = "ardana@gmail.com";
    const password = "1234";
    let data = {
      email: email,
      password: password
    }

    return request(app)
      .post("/v1/auth/register")
      .set("Content-Type", "application/json")
      .send(data)
      .then((res) => {
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual(res.body);
        
      });
  });

  it("should response with 200 as status code, kalau token benar di WhoAmI", async () => {

    let token = "yb4^$Hn6iHv2bu^%*$B5U%M4b5t3twdejbn87on^Y$GV#%5b6iN%ywb4r"
    
    return request(app)
      .get("/v1/Auth/whoami")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(res.body);
      });
  });

  it("should response with 401 as status code, kalau token tidak benar di WhoAmI", async () => {

    let token = "token_tidak_benar"
    
    return request(app)
      .get("/v1/Auth/whoami")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual(res.body);
      });
  });
});

