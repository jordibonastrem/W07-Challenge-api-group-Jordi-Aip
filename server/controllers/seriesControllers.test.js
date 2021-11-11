const Serie = require("../../database/models/series");

const {
  getSeries,
  deleteSerie,
  updateSeriesById,
  createSerie,
} = require("./seriesControllers");

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

  describe("When it receives an object res and an invalid object req", () => {
    test("Then it should invoke next with an error", async () => {
      const req = {};
      const error = {};

      Serie.create = jest.fn().mockRejectedValue(error);

      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();

      await createSerie(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
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
        const error = new Error("Wrong series! SO typical of you...");
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

describe("Given a updateSeriesById function", () => {
  describe("When it receives an object with an id 5, a response and a next function", () => {
    test("Then it should invoke Serie.findbyIdAndUpdate with a 5", async () => {
      const idSerie = 5;
      const req = {
        body: {
          _id: idSerie,
        },
      };

      const next = () => {};
      Serie.findByIdAndUpdate = jest.fn().mockResolvedValue({});
      const res = {
        json: jest.fn(),
      };

      await updateSeriesById(req, res, next);

      expect(Serie.findByIdAndUpdate).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("And When it receives an id that does not correspond to an existing serie (404)", () => {
    test("Then it should invoke next with the error ", async () => {
      const idSerie = 5;
      const req = {
        body: {
          _id: idSerie,
        },
      };
      Serie.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      const expectedError = {
        code: 404,
        message: "Yeah... sorry. Serie not found.",
      };

      await updateSeriesById(req, res, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });

  describe("And When the promise Serie.findByIdAndUpdate rejects", () => {
    test("Then it should invoke next with the error ", async () => {
      const req = {};
      const error = {};

      Serie.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();

      await updateSeriesById(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a createSeries function", () => {
  describe("When it receives an object res and an object req with a body", () => {
    test("Then it should invoke the method json of res and call the Serie.create function", async () => {
      const series = {
        name: "serie17",
        isSeen: true,
        platform: "Netflix",
      };

      const req = {
        body: series,
      };

      Serie.create = jest.fn().mockResolvedValue(series);
      const res = {
        json: jest.fn(),
      };
      const next = () => {};

      await createSerie(req, res, next);

      expect(Serie.create).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(series);
    });
  });
});
