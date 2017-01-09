/**
 * Controllers (or routes) for our boards!
 */

module.exports = function(app, Boards, Threads, Comments){

    //view board with all threads.
    app.get('/board/:slug/:page?', function(req, res){
        Boards.findOne({
            where: {
                slug: req.params.slug
            }
        }).then(function(board){
            if(board == null){
                res.status(400).send({ error: 'Board Not Found!' });
            }else{
                //Determine what we want to do... 
                //FIXME: This could all be in it's own method.
                var threadsPerpage = 5; //4chan has 20. Leave 5 for now.
                var pageRequested = req.params.page ? (parseInt(req.params.page, 10) || 0 )-1 : 0;
                var numOfPages = 10; //total of 10 pages.
                var offSet = pageRequested * threadsPerpage;
                var threadConfig = {
                    where: { board_id: board.id },
                    offset: offSet,
                    limit: threadsPerpage,
                    order: "createdAt DESC",
                    include: [ {model: Comments, as: "comments", limit: 5, order: "createdAt DESC"} ]
                };
                //Are they over the page limit allowed ?, is it 
                if((!isNaN(req.params.page)  || req.params.page === undefined) &&(pageRequested < numOfPages)){
                     Threads.findAll(threadConfig).then(function(threads){
                         threads.pagination = {
                             nextPage: pageRequested < numOfPages - 2 ? pageRequested + 2 : undefined
                         }
                        res.render('boards', {board: board, threads: threads});
                    }).catch(function(err){
                        res.status(500).send({ error: 'Something went wrong!' });
                    });
                }else{
                    //They are over (aka, on page 11. No such thing exists).
                    res.status(500).send({ error: 'There are only 10 pages avialable and/or you entered something that wasnt a number' });                    
                }
               
            }
        }).catch(function(err){
            res.status(500).send({ error: 'Something went wrong!' });
        });
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