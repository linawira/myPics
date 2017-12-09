var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var photoSchema = new Schema({
        Id: { type: Schema.Types.ObjectId, required: true },
        // photo: { type: String, requred: true },
        // description:{type: String},
        // dateCreated: {type:Date, default:Date.now},
        file: {
            fileName: { type: String},
            originalName: {type: String},
            dateUploaded: {type: Date, default: Date.now}
        },
    });
    
    module.exports = 
     Mongoose.model('photos', photoSchema);
    