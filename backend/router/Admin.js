const router = require('express').Router();
let admin = require('../model/Admin');

router.route('/').get((req,res)=>{
    admin.find()
    .then(das =>res.json(das))
    .catch(err=>res.status(400).json('Error'+err));
});
router.route('/add').post((req,res)=>{
    //const From = req.body.From;
    const email = req.body.email;
    const password = req.body.password;
    const newadmin = new admin({email,password});
    newadmin.save()
    .then(()=>res.json('Date added'))
    .catch(err=>res.status(400).json('Error'+err));
});
router.route('/check').post((req,res)=>{
    const admine=req.body.email;
    const adminpass = req.body.password;
    admin.find({email:admine,password:adminpass})
    .then(das=>res.json(das));
})
module.exports = router;

//rebatesnearby@gmail.com
//1532020