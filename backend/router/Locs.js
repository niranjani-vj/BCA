const router = require('express').Router();
let Loci = require('../model/Loc');

router.route('/').get((req,res)=>{
    Loci.find()
    .then(locs=>res.json(locs))
    .catch(err=>res.status(400).json('Error',+err));
});
router.route('/add').post((req,res)=>{
    const lat = req.body.lat;
    const lng=req.body.lng;
})