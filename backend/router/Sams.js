const router = require('express').Router();
let Sami = require('../model/Sam');
//let Dai = require('../model/Da');

router.route('/').get((req,res)=>{
    Sami.find()
    .then(sas => res.json(sas))
    .catch(err => res.status(400).json('Error:'+err));
});
router.route('/add').post((req,res)=>{
    const email = req.body.email;
    const lat = req.body.lat;
    const lng = req.body.lng;
    const newSami = new Sami({email,lat,lng});
    newSami.save()
    .then(()=>res.json('Added'))
    .catch(err => res.status(400).json('Error'+err));
});
router.route('/ck').post((req,res)=>{
    var email = req.body.email;
    var lat = req.body.lat;
    
    Sami.findOne({'email':email,'lat':lat},{email:1})
    .then(sas=>res.json(sas));
});
module.exports = router;