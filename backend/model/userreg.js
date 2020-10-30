const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userregSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    useremailid:{
        type:String,
        required:true
    },
    userphno:{
        type:String,
        minlength:10,
        required:true
    },
    userpassword:{
        type:String,
        required:true
    }
},{
    timestamps:true,
});

const Userreg = mongoose.model('Userreg',userregSchema);
module.exports = Userreg;
