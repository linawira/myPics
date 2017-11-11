var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var myMyPicsSchema = new Schema({
        userId: { type: Schema.Types.ObjectId, required: true },
        mypics: { type: String, requred: true },
        description:{type: String},
        dateCreated: {type:Date, default:Date.now},
        dateDue:{type:Date, default:Date.now},
        completed: {type: Boolean, default: false},
        file: {fileName: String, originalName: String},
    });
    
    module.exports = 
     Mongoose.model('mypics', myMyPicsSchema);
    