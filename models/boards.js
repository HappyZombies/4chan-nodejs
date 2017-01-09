var sequelize = require("../config/index").getSequelize();
var Sequelize = require('sequelize');

var Boards = sequelize.define('boards', {
    name: {
        type: Sequelize.STRING(150),
        field: 'name',
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING(150),
        field: 'slug',
        allowNull: false
    }
});

Boards.sync();
module.exports = Boards;