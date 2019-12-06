const expressLoader = require("./expressLoaders");

module.exports = async app => {
  expressLoader(app);
};
