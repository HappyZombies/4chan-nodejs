const { Router } = require("express");

const apiV1 = require("./routes/v1");

const app = Router();
app.use("/api/v1", apiV1);

module.exports = app;
