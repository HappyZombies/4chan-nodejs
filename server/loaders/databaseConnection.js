const knex = require("knex");
const { Model } = require("objection");

const knexConfig = require("../knexfile");
const Logger = require("../services/Logger");

module.exports = async () => {
  Logger.debug("Starting Database connection");
  const k = knex(knexConfig);
  try {
    await k.raw("select 1 + 1 as result");
    Model.knex(k);
  } catch (e) {
    Logger.error("Database connection failed! Here's the error => " + e);
    process.exit(1);
    return;
  }
  k.on("query", query => Logger.debug("DB Query Ran: " + query.sql));
  Logger.debug("Database connection is good!");
};
