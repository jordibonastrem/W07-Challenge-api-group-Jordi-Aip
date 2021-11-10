const Serie = require("../../database/models/series");


const { getSeries, deleteSerie,getSeriesById } = require("./seriesControllers");


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

  describe("Given a getSeriesById function", () => {
  describe("When it receives an object with an id 5, a response and a next function", () => {
    test("Then it should invoke Serie.findbyId with a 5", async () => {
      const idSerie = 5;

      const next = () => {};
      Serie.findById = jest.fn().mockResolvedValue({});

      await getSeriesById(req, res, next);

      expect(Serie.findById).toHaveBeenLastCalledWith(idSerie);
    });
  });

  describe("And When it receives a request and response, and Serie.findById resolves to serieMolona", () => {
    test("Then it should invoke res.json with serieMolona", async () => {
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

  describe("And when it receives a next function too, and the promise Serie.findById rejects", () => {
    test("Then it should invoke the next function with the rejected error", async () => {
      const error = {};
      const next = jest.fn();
      Serie.findById = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          id: 5,
        },
      };
      const res = {};

      await getSeriesById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });

  describe("And When it receives an id that does not correspond to an existing serie", () => {
    test("Then it should invoke next with the error and the error.code should be 404", async () => {
      const idSeries = 7;
      const error = new Error("Yeah... sorry. Serie not found.");
      Serie.findById = jest.fn().mockResolvedValue(null);

      const req = {
        params: {
          idSeries,
        },
      };

      const res = () => {};

      const next = jest.fn();

      await getSeriesById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);

    });
  });
});
