/*********
 *  This file will export important setup functions, including .env files and mysql connections.
 *******/

var Sequelize = require("sequelize");

module.exports = {

    getSequelize: function(){
        var seq = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASS, {
            host: process.env.HOST,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        });
        return seq;
    }


}