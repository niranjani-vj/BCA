const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  samSchema = new Schema({
    
    email:{
        type:String,
        required:true
    },
    lat:{
        type:String,
        required:true
    },
    lng:{
        type:String,
        required:true
    },
    location:{
        type:{type:String},
        coordinates:[]
    }
});
samSchema.index({location:"2dsphere"});
const Sami = mongoose.model('Sam',samSchema);
module.exports = Sami;