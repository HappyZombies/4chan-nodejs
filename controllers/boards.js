/**
 * Controllers (or routes) for our boards!
 */

module.exports = function(app, Boards){

    app.get('/board/:slug', function(req, res){

        Boards.findOne({
            where: {
                slug: req.params.slug
            }
        }).then(function(boards){
            console.dir(boards);
            if(boards == null){
                res.status(400).send({ error: 'Not Found!' });
            }else{
                res.render('boards', {boards: boards});
            }
        }).catch(function(err){
            res.status(500).send({ error: 'Something went wrong!' });
        })
    });

};