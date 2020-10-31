const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shopregSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    // shopname:{
    //     type:String,
    //     required:true
    // },
    // gstno:{
    //     type:String,
    //     required:true
    // },
    phono:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
//    location:{

//    }
},{
    timestamps:true,
});
shopregSchema.index({location:"2dsphere"});
const Shopreg = mongoose.model('Shopreg',shopregSchema);
module.exports = Shopreg;