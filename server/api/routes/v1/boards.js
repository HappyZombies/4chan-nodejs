const { Router } = require("express");
const { Container } = require("typedi");
const HttpStatus = require("http-status-codes");

const BoardService = require("../../../services/BoardsService");

const route = Router();

module.exports = app => {
  const boardService = Container.get(BoardService);

  app.use("/boards", route);

  route.get("/", async (req, res) =>
    res.json(await boardService.getAllBoards()).status(HttpStatus.OK)
  );
};
