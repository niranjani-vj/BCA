const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const femaledisSchema = new Schema({
    Owner:{
        type:String,
        required:true
    },
    // Shopname:{
    //     type:String,
    //     required:true
    // },
    category:{
        type:String,
        required:true
    },
    // typeofdiscounts:{
    //     type:String,
    //     required:true
    // },
    // brand:{
    //     type:String,
    //     required:true
    // },
    discount:{
        type:String,
        required:true
    },
    from:{
        type:Date,
        required:true
    },
    to:{
        type:Date,
        required:true
    },
    // location:{

    // }
},{
    timestamps:true
});
femaledisSchema.index({location:"2dsphere"});
const Femaledis = mongoose.model('Femaledis',femaledisSchema);
module.exports=Femaledis;