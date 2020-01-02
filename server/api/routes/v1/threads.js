const { Router } = require("express");
const { Container } = require("typedi");
const HttpStatus = require("http-status-codes");

const ThreadsService = require("../../../services/ThreadsService");

const route = Router();

module.exports = app => {
  const threadsService = Container.get(ThreadsService);

  app.use("/threads", route);

  route.get("/:id", async (req, res) => {
    return res.json(await threadsService.getThread()).status(HttpStatus.OK);
  });
};
