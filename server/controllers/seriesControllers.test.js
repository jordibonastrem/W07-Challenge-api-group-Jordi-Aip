const Serie = require("../../database/models/series");

const { getSeries, getSeriesById } = require("./seriesControllers");

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

describe("Given a getSeriesById function", () => {
  describe("When it receives an object with an id 5, a response and a next function", () => {
    test("Then it should invoke Serie.findbyId with a 5", async () => {
      const idSerie = 5;
      const req = {
        params: {
          idSerie,
        },
      };
      const res = {
        json: () => {},
      };

      const next = () => {};
      Serie.findById = jest.fn().mockResolvedValue({});

      await getSeriesById(req, res, next);

      expect(Serie.findById).toHaveBeenLastCalledWith(idSerie);
    });
  });

  describe("And When it receives a request and response, and Robot.findById resolves to K9", () => {
    test("Then it should invoke res.json with K9", async () => {
      const idSerie = 7;
      const serieMolona = {
        idSerie,
        name: "serie12",
        isSeen: true,
        platform: "netflix",
      };

      Serie.findById = jest.fn().mockResolvedValue(serieMolona);

      const req = {
        params: {
          idSerie,
        },
      };

      const res = {
        json: jest.fn(),
      };

      await getSeriesById(req, res);

      expect(res.json).toHaveBeenCalledWith(serieMolona);
    });
  });
});
