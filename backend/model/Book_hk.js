const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const book_hk = new Schema({
    Owner:{
        type:String,
        required:true
    },
    
    user:{
        type:String,
        required:true
    },
    // phono:{
    //     type:String
    // },
    category:{
        type:String,
        required:true
    },
    
    price:{
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