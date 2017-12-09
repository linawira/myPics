
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Photo = mongoose.model('photos'),

    passportService = require('../../config/passport'),
    passport = require('passport'),

    multer = require('multer'),
    mkdirp = require('mkdirp');

    var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {      
    var path = config.uploads + req.params.userId + "/";
            mkdirp(path, function(err) {
                if(err){
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            let fileName = file.originalname.split('.');   
            cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
        }
      });
    
    router.get('/photos/user/:userId', /*requireAuth,*/ function (req, res, next){
        logger.log('Get photos for a user', 'verbose');

        var query = Photo.find ({userId: req.params.photoId})
        .sort (req.query.order)
        .exec ()
        .then(result => {
            if(result && result.length){
                res.status(200).json (result);
            } else {
                res.status (404).json ({message:"No Pictures"});
            }
        })
        .catch(err => {
            return next (err);
        });
    });


    router.get('/photos', /*requireAuth,*/  function (req, res, next){
        logger.log('Get User','verbose');

        Photo.find()
                    .then(photo => {
                        if(photo){
                            res.status(200).json(photo);
                        } else {
                            res.status(404).json({message: "No user found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            });  

    router.get('/photos/:photoId',/*requireAuth,*/  function (req, res, next){
        logger.log('Get User'+ req.params.photoId, 'verbose');

        Photo.findById(req.params.photoId)
                    .then(photo => {
                        if(photo){
                            res.status(200).json(photo);
                        } else {
                            res.status(404).json({message: "No user found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            });  

    router.post('/photos', function(req, res, next){
        logger.log('Create a photo', 'verbose');

        var photo = new Photo(req.body);
        photo.save()
       .then(result => {
           res.status(201).json(result);
       })
       .catch( err => {
          return next(err);
       });
    });  
    
    router.put('/photos/:photoId', /*requireAuth,*/ function (req, res, next){
        logger.log('Update photos with id photoid'+ req.params.photoId, 'verbose');

        
        Photo.findOneAndUpdate({_id: req.params.photoId}, 		
            req.body, {new:true, multi:false})
                .then(photo => {
                    res.status(200).json(photo);
                })
                .catch(error => {
                    return next(error);
                });
    });


    router.delete('/photos/:photoId',/*requireAuth,*/  function (req, res, next){
        logger.log('Delete photo with id photoid'+ req.params.photoId, 'verbose');

        Photo.remove({ _id: req.params.photoId })
                .then(photo => {
                    res.status(200).json({msg: "Photo Deleted"});
                })
                .catch(error => {
                    return next(error);
                });
    });

    var upload = multer({ storage: storage });
    
    router.post('/photos/upload/:userId/:photoId', upload.any(), function(req, res, next){
        logger.log('Upload photos for gallery ' + req.params.photoId + ' and ' + req.params.userId, 'verbose');
        
        Photo.findById(req.params.photoId, function(err, photo){
            if(err){ 
                return next(err);
            } else {     
                if(req.files){
                    photo.file = {
                        fileName : req.files[0].filename,
                        originalName : req.files[0].originalname,
                        dateUploaded : new Date()
                    };
                }           
                photo.save()
                    .then(photo => {
                        res.status(200).json(photo);
                    })
                    .catch(error => {
                        return next(error);
                    });
            }
        });
    });
  
};
