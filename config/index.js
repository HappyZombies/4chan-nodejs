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
    },

    seedDatabase: function(Boards, Comments, Threads, app){
        var sequelize = this.getSequelize();

        Threads.belongsTo(Boards, { foreignKey: 'board_id', constraints: true, as: 'boards' });
        Boards.hasMany(Threads, { foreignKey: 'board_id', constraints: true, as: 'threads' });

        Comments.belongsTo(Threads, { foreignKey: 'thread_id', constraints: true, as: 'threads' });
        Threads.hasMany(Comments, { foreignKey: 'thread_id', constraints: true, as: 'comments' });

        sequelize.sync({ force: true }).then(function(){
           return Boards.create({name: "Politically Incorrect", slug: "pol"}).then(function(board, board_created){
                if(board_created){
                    //Board created, now make the threads
                    return Threads.create({
                            board_id: board.id,
                            subject: "First /Pol/ thread",
                            author: "HappyZombies",
                            comment: "This is the comment, pretty nice",
                            file: "https://s.4cdn.org/image/fp/logo-transparent.png" //change this...
                        }).then(function(thread, thread_created){
                        if(thread_created){
                            //Board created, now make the Comments
                            return Comments.create({
                                    thread_id: thread.id,
                                    author: "420",
                                    comment: "This is reply to the thread"
                            }).then(function(){
                                //Update our global variables.
                                Boards.findAll().then(function(boards){
                                    app.locals.boards = boards;
                                }).catch(function(err){
                                    console.log("DB Error "+err);
                                    app.locals.boards = [{}];
                                });
                            }).catch(function(err){
                                console.log("DB Error: " + err);
                            });                           
                        }
                    }).catch(function(err){
                        console.log("DB Error: " + err);
                    });
                }
            }).catch(function(err){
                console.log("DB Error: " + err);
            });
        });
    },


}