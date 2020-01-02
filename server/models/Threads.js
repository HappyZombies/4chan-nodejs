const { Model } = require("objection");
const Boards = require("./Boards");

class Threads extends Model {
  static get tableName() {
    return "threads";
  }
  static relationMappings = {
    board: {
      relation: Model.BelongsToOneRelation,
      modelClass: Boards,
      join: {
        from: "threads.boardId",
        to: "boards.id"
      }
    }
  };
}

module.exports = Threads;
