const request = require("supertest");

// NOTE: app abhi exist nahi karta — isi liye test fail hoga
const app = require("../src/app");

describe("Auth API - Register", () => {
  it("should register a new user and return a token", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("token");
  });
});