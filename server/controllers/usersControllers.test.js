require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");
const { loginUser } = require("./usersControllers");

jest.mock("../../database/models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Given a loginUser function", () => {
  describe("When it receives a request with an incorrect username", () => {
    test("Then it should invoke the next function with an error", async () => {
      const username = "Manuel";

      const req = {
        body: {
          username,
        },
      };

      const res = {};

      User.findOne = jest.fn().mockResolvedValue(false);
      const error = new Error("Wrong user");
      error.code = 401;
      const next = jest.fn();

      await loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it recieves a request with an incorrect password", () => {
    test("Then it should invoke the next function with an error", async () => {
      const body = {
        username: "Jordi",
        password: "Jordi12",
      };

      const req = {
        body,
      };
      const res = {};

      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue({
        username: "Jordi",
        password: "JORDI1234",
      });

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const error = new Error("Wrong password");
      error.code = 401;

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it recieves a request with a correct username and a correct password", () => {
    test("Then it has to invoke res.json with an object that contains a token", async () => {
      const body = {
        username: "Jordi",
        password: "Jordi123",
      };

      const req = {
        body,
      };
      const res = {
        json: jest.fn(),
      };

      User.findOne = jest.fn().mockResolvedValue({
        id: "1",
        username: "Jordi",
        password: "Jordi123",
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      const expectedToken = "ola";

      jwt.sign = jest.fn().mockReturnValue(expectedToken);

      const error = new Error("Wrong password");

      error.code = 401;
      const expectedResponse = {
        token: expectedToken,
      };

      await loginUser(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
