const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const daSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const dai = mongoose.model('dai',daSchema);
module.exports=dai;