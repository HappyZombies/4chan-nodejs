/* 
 * Project Name: 4chan NodeJS
 * Written by Daniel Reguero <daniel.reguero@hotmail.com>
 */
//Import our Modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
require('dotenv').config();
var config = require("./config");
config.seedDatabase(Boards, Comments, Threads, app);

var Boards = require("./models/boards");
var Threads = require("./models/threads");
var Comments = require("./models/comments");

//Seed our database.
console.log("Seeding ...");

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

//set global variable for all the boards for every page.
//when running node app.js for the first time, this local variable will not get set. Run node app.js twice!


//Call in our controllers/routes
indexController(app);
boardController(app, Boards, Threads, Comments);
//Listen on port specified.
app.listen(port, function(){
    console.log("Website is running on http://" + process.env.HOST + ":" + port);
});