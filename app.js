/* 
 * Project Name: 4chan NodeJS
 * Written by Daniel <daniel.reguero@hotmail.com>
 */
//Import our Modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
require('dotenv').config();
var config = require("./config");
var Boards = require("./models/boards");
var Threads = require("./models/threads");
var Comments = require("./models/comments");

//Seed our database.
console.log("Seeding ...");
config.seedDatabase(Boards, Comments, Threads, app);
//var middlewares = require("./middlewares");
//'Custom' modules/variables.
var port = process.env.PORT || 3000;
var indexController = require("./controllers");
var boardController = require("./controllers/boards");

// Begin Middleware
app.use('/assets', express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

//Call in our controllers/routes
indexController(app);
boardController(app, Boards, Threads, Comments);
//Listen on port specified.
app.listen(port, function(){
    console.log("Website is running on http://" + process.env.HOST + ":" + port);
});