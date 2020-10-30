const router = require('express').Router();
let Femalediscount = require('../model/Femalediscount');

router.route('/').get((req,res)=>{
    Femalediscount.find()
    .then(femalediscounts => res.json(femalediscounts))
    .catch(err =>res.status(400).json('Error'+err));
});

router.route('/add').post((req,res)=>{
    const Owner = req.body.Owner;
    const Shopname = req.body.Shopname;
    const category = req.body.category;
    const typeofdiscounts = req.body.typeofdiscounts;
    const brand = req.body.brand;
    const discount = req.body.discount;
    const from = req.body.from;
    const to = req.body.to;
    const lat = Number(req.body.lat);
    const lng =Number(req.body.lng);
    let data={};
    data['lat']=lat;
    data['lng']=lng;
    const location =data;
    const newFemalediscount = new Femalediscount({
        Owner,
        Shopname,
        category,
        typeofdiscounts,
        brand,
        discount,
        from,
        to,
        location
    });
    newFemalediscount.save()
    .then(()=>res.json('Discount Added'))
    .catch(err => res.status(400).json('Error'+err));
});
router.route('/fdis').post((req,res)=>{
    const email= req.body.Owner;
   // const owner = JSON.Owner
    //query={Owner:Owner};
   // console.log(query)
   // var query={Owner:req.body.Owner}
   console.log(email)
    Femalediscount.find({Owner:email})
    .then(femalediscounts=>res.json(femalediscounts));
});
router.route('/fdisd').post((req,res)=>{
    Femalediscount.deleteOne({_id:req.body._id})
    .then(()=>res.json('Deleted'))
    .catch(err=>res.res.status(400).json('Error'+err));
});
router.route('/dist').post((req,res)=>{
    let lat =Number(req.body.lat);
    let lng = Number(req.body.lng);
    let data ={};
    data['lat']=lat;
    data['lng']=lng;
   Femalediscount.find({location:{
       $near:{
           $maxDistance:1000,
           $geometry:{
               type:"Point",
               coordinates:data
           }
       }
   }})
    .then(maps=>res.json(maps))
    .catch(err=>res.status(400).json('Error'+err));

});
module.exports = router;