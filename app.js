/* 
 * Project Name: 4chan NodeJS
 * Written by Daniel Reguero <daniel.reguero@hotmail.com>
 */
//Import our Modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
require('dotenv').config();
var Boards = require("./models/boards");
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
//app.use(middlewares.setLocals); not yet
app.set('view engine', 'ejs');


//Call in our controllers/routes
indexController(app, Boards);
boardController(app, Boards);
//Listen on port specified.
app.listen(port, function(){
    console.log("Website is running on http://" + process.env.HOST + ":" + port);
});