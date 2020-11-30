const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookchef = new Schema({
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
    status:{
        type:String,
        default:"Pending!"
},
    //  location:{

    //  }
},{
    timestamps:true
});
bookchef.index({location:"2dsphere"});
const Bookchef = mongoose.model('bookchef',bookchef);
module.exports=Bookchef;