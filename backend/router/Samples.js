const router = require('express').Router();
let Sam = require('../model/Sample');           

router.route('/').get((req,res)=>{
    Sam.find()
    .then(sams => res.json(sams))
    .catch(err =>res.status(400).json('Error:'+err));
});
router.route('/add').post((req,res)=>{
    const name = req.body.name;
    const num = req.body.num;
    const newSam = new Sam({name,num});
    newSam.save()
    .then(()=>res.json('name added'))
    .catch(err=>res.status(400).json('Error:'+err));
});
module.exports = router;    