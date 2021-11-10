const Serie = require("../../database/models/series");

const { getSeries, deleteSerie } = require("./seriesControllers");

jest.mock("../../database/models/series");

describe("Given a getSeries function", () => {
  describe("When it receives an object res", () => {
    test("Then it should invoke the method json", async () => {
      const series = [
        {
          name: "serie1",
          isSeen: true,
          platform: "Netflix",
        },
      ];

      Serie.find = jest.fn().mockResolvedValue(series);

      const res = {
        json: jest.fn(),
      };

      await getSeries(null, res);
      expect(Serie.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(series);
    });
  });
});

describe("Given a deleteSeries function", () => {
  describe("When it receives a request with an id 1, a response and a next function", () => {
    test("Then it should call the Serie.findByIdAndDelete with a 1", async () => {
      const idSerie = 1;
      const req = {
        params: {
          idSerie,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};
      Serie.findByIdAndDelete = jest.fn().mockResolvedValue({});

      await deleteSerie(req, res, next);
      expect(Serie.findByIdAndDelete).toHaveBeenCalledWith(idSerie);
    });

    describe("And Serie.findByIdAndDelete rejects", () => {
      test("Then it should call next with error", async () => {
        const error = {};
        Serie.findByIdAndDelete = jest.fn().mockRejectedValue(error);
        const req = {
          params: {
            id: 1,
          },
        };

        const res = {};
        const next = jest.fn();

        await deleteSerie(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(error).toHaveProperty("code");
        expect(error.code).toBe(400);
      });
    });

    describe("And if Series.findByIdAndDelete returns undefined", () => {
      test("Then it should call next with an error", async () => {
        const error = new Error("Series not found");
        Serie.findByIdAndDelete = jest.fn().mockResolvedValue(undefined);

        const req = {
          params: {
            id: 1,
          },
        };
        const res = {};
        const next = jest.fn();
        await deleteSerie(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
