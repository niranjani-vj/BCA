const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const locSchema = new Schema({
    location:{
        type:"Point",
        coordinates:[lng,lat]
    }
});
const loci = mongoose.model('loci',locSchema);
module.exports=loci;