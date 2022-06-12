require("dotenv").config();
const request = require("supertest");
const app = require("../app");

describe("Application controller", () => {
  it("should response with 201 as status code", async () => {
    return request(app)
      .get("/")
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(res.body);
      });
  });
});
