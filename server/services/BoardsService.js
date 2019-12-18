const Boards = require("../models/Boards");

class BoardService {
  async getAllBoards() {
    return await Boards.query().select("name", "slug");
  }
}

module.exports = BoardService;
