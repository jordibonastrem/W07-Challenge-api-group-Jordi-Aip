require("dotenv").config();
const debug = require("debug")("series:routes:tests");
const chalk = require("chalk");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const initializeDB = require("../../database");
const Serie = require("../../database/models/series");
const { initializeServer } = require("../index");
const { app } = require("../index");

jest.setTimeout(20000);

const request = supertest(app);

let server;
let token;

beforeAll(async () => {
  await initializeDB(process.env.MONGODB_SERVER_TESTING);
  server = await initializeServer(process.env.SERVER_PORT_TEST);
  const myRequest = await request
    .post("/users/login")
    .send({ username: "usuarioGuay", password: "soyUsuario" })
    .expect(200);
  token = myRequest.body.token;
});

beforeEach(async () => {
  await Serie.deleteMany();
  await Serie.create({
    name: "eisventura",
    isSeen: false,
    platform: "amason",
  });
});

afterAll(async () => {
  await mongoose.connection.on("close", () => {
    debug(chalk.red("And you're back to where you started. Bye."));
  });
  await mongoose.connection.close();
  await server.on("close", () => {
    debug(chalk.red("And you're back to where you started. Isolated. Bye."));
  });
  await server.close();
});

describe("Given the endpoint /series", () => {
  describe("When it gets a POST request without all the required fields", () => {
    test("Then it should send a response with an error and a status code of 401", async () => {
      const { body } = await request
        .post("/series")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Parks and Recreation" })
        .expect(401);

      const expectedError = {
        error:
          "Oh no! You've made a mistake! (If it'd only be the first one you've ever made...)",
      };

      expect(body).toEqual(expectedError);
    });
  });
  describe("When it gets a POST series request with all the required fields", () => {
    test("Then it should respond with the series, including the db id", async () => {
      const { body } = await request
        .post("/series")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Parks and Recreation",
          isSeen: false,
          platform: "hulu",
        })
        .expect(200);

      expect(body).toHaveProperty("name", "Parks and Recreation");
    });
  });
});
