const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const maledisSchema = new Schema({
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
    //  location:{

    //  }
},{
    timestamps:true
});
maledisSchema.index({location:"2dsphere"});
const profhousekeeping = mongoose.model('profhousekeeping',maledisSchema);
module.exports=profhousekeeping;