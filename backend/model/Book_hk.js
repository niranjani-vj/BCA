const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const book_hk = new Schema({
    Owner:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true
    },
    User:{
        type:String,
        required:true
    },
    
    category:{
        type:String,
        required:true
    },
    
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
    time:{
        type:String,
        required:true
    },
    //  location:{

    //  }
},{
    timestamps:true
});
book_hk.index({location:"2dsphere"});
const Book_hk = mongoose.model('Book_hk',book_hk);
module.exports=Book_hk;