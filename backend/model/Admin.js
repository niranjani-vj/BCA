const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const admin = mongoose.model('admin',AdminSchema);
module.exports=admin;