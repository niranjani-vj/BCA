/* eslint-disable no-undef */
const router = require('express').Router();
let  Map = require('../model/Map');

router.route('/').get((req,res)=>{
    Map.find()
    .then(maps=>res.json(maps))
    .catch(err=>res.status(400).json('Error:'+err));
});
router.route('/add').post((req,res)=>{
    const lat = Number(req.body.lat);
    const lng =Number(req.body.lng);
    var data ={};
    data['lat']=lat;
    data['lng']=lng;
    const coordinates=data;
    const newMap = new Map({location:coordinates});
    newMap.save()
    // .then(()=>console.log(newMap))
    .then(()=>res.json('Location Added'))
    .catch(err=>res.status(400).json('Error'+err));
});
router.route('/dist').post((req,res)=>{
    let lat =Number(req.body.lat);
    let lng = Number(req.body.lng);
    let data ={};
    data['lat']=lat;
    data['lng']=lng;
   Map.find({location:{
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