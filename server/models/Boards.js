const { Model } = require("objection");
const Threads = require("./Threads");

class Boards extends Model {
  static get tableName() {
    return "boards";
  }
  static relationMappings = {
    threads: {
      relation: Model.HasManyRelation,
      modelClass: Threads,
      join: {
        from: "boards.id",
        to: "threads.boardId"
      }
    }
  };
}

module.exports = Boards;
