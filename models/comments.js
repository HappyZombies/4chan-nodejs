var sequelize = require("../config/index").getSequelize();
var Sequelize = require('sequelize');

var Comments = sequelize.define('comments', {
    threadId: {
        type: Sequelize.INTEGER(120),
        field: 'thread_id',
        allowNull: false
    },
    author: {
        type: Sequelize.STRING(150),
        field: 'author',
        allowNull: false,
        defaultValue: 'Anonymous'
    },
    comment: {
        type: Sequelize.STRING(1234),
        field: 'comment',
        allowNull: false
    },
    file: {
        type: Sequelize.STRING(150),
        field: 'file'
    }

});

Comments.sync();
module.exports = Comments;