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
//Default, create pol
Boards.findOrCreate({
    where:{slug: "pol"}, 
    defaults: {name: "Politically Incorrect", slug: "pol"}
}).then(function(board, created){
    if(created){
        console.log("pol board not found, it was created");
    }
}).catch(function(err){
    console.log("DB Error: " + err);
});
Boards.sync();
module.exports = Boards;