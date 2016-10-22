/**
 * Controllers (or routes) for home page only!
 */

module.exports = function(app, Boards){

    app.get('/', function(req, res){
        Boards.findAll().then(function(boards){
            res.render('index', {boards: boards});
        }).catch(function(err){
            res.status(500).send({ error: 'Something went wrong!' });
        })
    });

}