const router = require('express').Router();
let Dai = require('../model/Da');

router.route('/').get((req,res)=>{
    Dai.find()
    .then(das =>res.json(das))
    .catch(err=>res.status(400).json('Error'+err));
});
router.route('/add').post((req,res)=>{
    //const From = req.body.From;
    const email = req.body.email;
    const password = req.body.password;
    const newDai = new Dai({email,password});
    newDai.save()
    .then(()=>res.json('Date added'))
    .catch(err=>res.status(400).json('Error'+err));
});
router.route('/check').post((req,res)=>{
    const admin=req.body.email;
    const adminpass = req.body.password;
    Dai.find({email:admin,password:adminpass})
    .then(das=>res.json(das));
})
module.exports = router;

//rebatesnearby@gmail.com
//1532020