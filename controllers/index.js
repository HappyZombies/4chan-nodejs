/**
 * Controllers (or routes) for home page only!
 */

module.exports = function(app){

    app.get('/', function(req, res){
        res.render('index');
    });

};