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
                Threads.findAll({
                    where: { board_id: board.id },
                    limit: 5,
                    order: "createdAt DESC",
                    include: [ {model: Comments, as: "comments", limit: 5, order: "createdAt DESC"} ]
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

        //Let's still check if we are in the proper board 
        Boards.findOne({
            where: {
                slug: req.params.slug
            }
        }).then(function(board){
            if(board == null){
                res.status(400).send({ error: 'Board Not Found!' });
            }else{
                 if(!isNaN(req.params.thread_id)){
                    //threads are numbers.
                    Threads.findById(req.params.thread_id, {include: [ {model: Comments, as: "comments", order: "createdAt ASC"}]}).then(function(thread){
                        res.render('threads', {board: board, thread: thread});
                    });
                }else{
                    res.status(400).send({ error: 'Thread Not Found!' });
                }
            }
        }).catch(function(err){
            res.status(500).send({ error: 'Something went wrong!' });
        });
    });

    //Post methods.
    app.post('/board/:slug/thread', function(req, res){
        Boards.findOne({
            where: {
                slug: req.params.slug
            }
        }).then(function(board){
            if(board == null){
                res.status(400).send({ error: 'Board Not Found!' });
            }else{
                Threads.create({
                    boardId: board.id,
                    subject: req.body.subject,
                    author: req.body.name,
                    comment: req.body.comment,
                    file: req.body.upfile
                }).then(function(thread){
                    res.redirect('/board/'+req.params.slug+'/thread/'+thread.id);
                }).catch(function(err){
                    console.dir(err);
                    res.status(500).send({ error: 'Something went wrong when creating...' });
                });
            }
        }).catch(function(err){
            console.dir(err);
            res.status(500).send({ error: 'Something went wrong when finding...' });
        })
    });

    app.post('/board/:slug/thread/:thread_id', function(req, res){
        //Let's still check if we are in the proper board 
        Boards.findOne({
            where: {
                slug: req.params.slug
            }
        }).then(function(board){
            if(board == null){
                res.status(400).send({ error: 'Board Not Found!' });
            }else{
                 if(!isNaN(req.params.thread_id)){
                    //threads are numbers.
                    Threads.findById(req.params.thread_id).then(function(thread){
                        if(thread === null){
                            res.status(400).send({ error: 'Thread Not Found!' });                         
                        }else{
                            //Create a comment.
                            Comments.create({
                                    threadId: req.params.thread_id,
                                    author: req.body.name,
                                    comment: req.body.comment,
                                    file: req.body.upfile
                            }).then(function(comment){
                                //After we create the new comment. Update the thread with the new create date FROM the comment.
                                Threads.update({createdAt: comment.createdAt}, {where:{id: req.params.thread_id}});
                                res.redirect(req.originalUrl);                                
                            });
                        }
                    });
                }else{
                    res.status(400).send({ error: 'Thread Not Found!' });
                }
            }
        }).catch(function(err){
            res.status(500).send({ error: 'Something went wrong!' });
        });
    });

};