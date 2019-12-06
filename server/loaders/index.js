const databaseConnection = require("./databaseConnection");
const expressLoader = require("./expressLoaders");

module.exports = async app => {
  await databaseConnection();
  expressLoader(app);
};
