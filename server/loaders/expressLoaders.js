const bodyParser = require("body-parser");
const morgan = require("morgan");
const HttpStatus = require("http-status-codes");

const api = require("../api");

module.exports = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan("combined"));

  app.use(api);

  // for any other error handlers
  app.use((err, req, res, next) => {
    res.status(err.httpStatusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    res.json(err);
  });
};
