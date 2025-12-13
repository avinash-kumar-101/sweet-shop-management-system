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




it("should fail if email or password is missing", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      email: "",
      password: ""
    });

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toBe("Email and password are required");
});



it("should not return plain text password", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      email: "hash@test.com",
      password: "secret123"
    });

  expect(res.body.password).toBeUndefined();
});



it("should hash the password before storing", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      email: "hashing@test.com",
      password: "secret123"
    });

  expect(res.body.password).not.toBe("secret123");
});



it("should login user with correct credentials", async () => {
  // pehle user register
  await request(app)
    .post("/api/auth/register")
    .send({
      email: "login@test.com",
      password: "login123"
    });

  // phir login
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "login@test.com",
      password: "login123"
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.token).toBeDefined();
});