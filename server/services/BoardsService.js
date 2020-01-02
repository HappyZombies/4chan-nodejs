const Boards = require("../models/Boards");

class BoardService {
  async getAllBoards() {
    return await Boards.query().select("name", "slug");
  }
  async boardsHomePage(slug, page) {
    return await Boards.query()
      .where("slug", slug)
      .withGraphFetched("threads");
  }
}

module.exports = BoardService;
