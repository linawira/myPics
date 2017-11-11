
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Mypics = mongoose.model('mypics');

module.exports = function (app, config) {
    app.use('/api', router);
    
    router.get('/mypics/user/:userId', function (req, res, next){
        logger.log('Get mypics for a user', 'verbose');

        var query = Mypics.find({userId:req.params.userId})
        .sort(req.query.order)
        .exec()
        .then(result => {
           if(result && result.length) {
             res.status(200).json(result);
         } else {
             res.status(404).json({message: "No my pics"});
         }
        })
        .catch(err => {
          return next(err);
        });
    });  


    router.get('/mypics/:mypicsId', function (req, res, next){
        logger.log('Get My Pics List'+ req.params.mypicsId, 'verbose');

        Mypics.findById(req.params.mypicsId)
                    .then(mypics => {
                        if(mypics){
                            res.status(200).json(mypics);
                        } else {
                            res.status(404).json({message: "No mypics found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            });  

    router.post('/mypics', function(req, res, next){
        logger.log('Create mypics', 'verbose');

        var mypics = new Mypics(req.body);
        mypics.save()
       .then(result => {
           res.status(201).json(result);
       })
       .catch( err => {
          return next(err);
       });
    });  
    
    router.put('/mypics/:mypicsId', function (req, res, next){
        logger.log('Update mypics'+ req.params.mypicsId, 'verbose');

        
        Mypics.findOneAndUpdate({_id: req.params.mypicsId}, 		
            req.body, {new:true, multi:false})
                .then(mypics => {
                    res.status(200).json(mypics);
                })
                .catch(error => {
                    return next(error);
                });
    });


    router.delete('/mypics/:mypicsId', function (req, res, next){
        logger.log('Delete mypics'+ req.params.mypicsId, 'verbose');

        Mypics.remove({ _id: req.params.mypicsId })
                .then(mypics => {
                    res.status(200).json({msg: "mypics Deleted"});
                })
                .catch(error => {
                    return next(error);
                });
    });
  
};
