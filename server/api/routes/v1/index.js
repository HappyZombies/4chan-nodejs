const { Router } = require("express");
const boards = require("./boards");

// all endpoints for api/v1/{anything} will be here
const v1 = Router();
boards(v1);

module.exports = v1;
