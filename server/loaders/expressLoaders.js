const bodyParser = require("body-parser");
const morgan = require("morgan");
const HttpStatus = require("http-status-codes");

const ApiError = require("../services/ApiError");

module.exports = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan("combined"));

  app.get("/", (req, res) => res.json({ hello: "there" }));

  app.use((req, res, next) => {
    const err = new ApiError("Not Found", 404);
    next(err);
  });

  // for any other error handlers
  app.use((err, req, res, next) => {
    res.status(err.httpStatusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    res.json(err);
  });
};
