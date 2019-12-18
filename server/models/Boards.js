const { Model } = require("objection");

class Boards extends Model {
  static get tableName() {
    return "boards";
  }
}

module.exports = Boards;
