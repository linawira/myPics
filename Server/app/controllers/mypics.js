
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    mypics = mongoose.model('mypics');

module.exports = function (app, config) {
    app.use('/api', router);
    
    router.get('/mypics/:userId', function (req, res, next){
        logger.log('Find pics by Id', 'verbose');

        var query = mypics.find({userId:req.params.userId})
        .sort(req.query.order)
        .exec()
        .then(result => {
           if(result && result.length) {
             res.status(200).json(result);
         } else {
             res.status(404).json({message: "No pics"});
         }
        })
        .catch(err => {
          return next(err);
        });
    });  


    router.get('mypics/:mypicsId', function (req, res, next){
        logger.log('Get My Pics List'+ req.params.userId, 'verbose');

        mypics.findById(req.params.todoId)
                    .then(mypics => {
                        if(mypics){
                            res.status(200).json(mypics);
                        } else {
                            res.status(404).json({message: "No pics found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            });  

    router.post('mypics/mypicsId', function(req, res, next){
        logger.log('Create mypics', 'verbose');

        var mypics = new mypics(req.body);
        mypics.save()
       .then(result => {
           res.status(201).json(result);
       })
       .catch( err => {
          return next(err);
       });
    });  
    
    router.put('mypics/mypicsId', function (req, res, next){
        logger.log('Update todo'+ req.params.mypicsId, 'verbose');

        
        mypics.findOneAndUpdate({_id: req.params.userId}, 		
            req.body, {new:true, multi:false})
                .then(mypics => {
                    res.status(200).json(todo);
                })
                .catch(error => {
                    return next(error);
                });
    });


    router.delete('mypics/mypicsId', function (req, res, next){
        logger.log('Delete mypics'+ req.params.userId, 'verbose');

        mypics.remove({ _id: req.params.mypicsId })
                .then(mypics => {
                    res.status(200).json({msg: "mypics Deleted"});
                })
                .catch(error => {
                    return next(error);
                });
    });
  
};
