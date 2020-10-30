const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  sampleSchema = new Schema({
    name:{
        type:String
    },
    Num:{
        type:String
    }
});
const Sam = mongoose.model('Sam',sampleSchema);
module.exports = Sam;