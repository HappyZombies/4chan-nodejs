var sequelize = require("../config/index").getSequelize();
var Sequelize = require('sequelize');

var Threads = sequelize.define('threads', {
    board_id: {
        type: Sequelize.INTEGER(120),
        field: 'board_id',
        allowNull: false
    },
    subject: {
        type: Sequelize.STRING(150),
        field: 'subject',
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
        field: 'file',
        allowNull: false
    }

});
Threads.findOrCreate({
    where:{id: 1},
    defaults: {
        board_id: 1,
        subject: "First /Pol/ thread",
        author: "HappyZombies",
        comment: "This is the comment, pretty nice",
        file: "https://s.4cdn.org/image/fp/logo-transparent.png"
    }
}).then(function(board, created){
    if(created){
        console.log("Thread created in pol with success.");
    }
}).catch(function(err){
    console.log("DB Error: " + err);
});
Threads.sync();
module.exports = Threads;