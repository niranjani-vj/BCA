const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mapSchema = new Schema({
    location:{

    }
});
mapSchema.index({location:"2dsphere"});
let Map = mongoose.model("Map",mapSchema);
module.exports=Map;