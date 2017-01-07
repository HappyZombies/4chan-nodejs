/**
 * Controllers (or routes) for our boards!
 */

module.exports = function(app, Boards, Threads, Comments){

    //view board with all threads.
    app.get('/board/:slug', function(req, res){

        Boards.findOne({
            where: {
                slug: req.params.slug
            }
        }).then(function(board){
            if(board == null){
                res.status(400).send({ error: 'Board Not Found!' });
            }else{
                //maybe we could use a has many / belongs to relationship ?
                Threads.findAll({
                    where: {
                        board_id: board.id
                    }
                }).then(function(threads){
                    res.render('boards', {board: board, threads: threads});
                }).catch(function(err){
                    res.status(500).send({ error: 'Something went wrong!' });
                });
            }
        }).catch(function(err){
            res.status(500).send({ error: 'Something went wrong!' });
        })
    });

    //view individual thread
    app.get('/board/:slug/thread/:thread_id', function(req, res){
        if(!isNaN(req.params.thread_id)){
            //threads are numbers.
            res.json({it: "Yes a number"});
        }else{
            res.status(400).send({ error: 'Thread Not Found!' });
        }
    });

};