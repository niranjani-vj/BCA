const router = require('express').Router();
let Malediscount = require('../model/profhousekeeping');

router.route('/').get((req,res)=>{
    Malediscount.find()
    .then(malediscounts => res.json(malediscounts))
    .catch(err =>res.status(400).json('Error'+err));
});
router.route('/add').post((req,res)=>{
    const Owner = req.body.Owner;
    // const Shopname = req.body.Shopname;
    const category = req.body.category;
    // const typeofdiscounts=req.body.typeofdiscounts;
    // const brand = req.body.brand;
    const discount = req.body.discount;
    const from = req.body.from;
    const to = req.body.to;
    // const lat = Number(req.body.lat);
    // const lng =Number(req.body.lng);
    // let data={};
    // data['lat']=lat;
    // data['lng']=lng;
    // const location=data;
    const newMalediscount = new Malediscount({
        Owner,
        // Shopname,
        category,
        // typeofdiscounts,
        // brand,
        discount,
        from,
        to,
        // location
    });
    newMalediscount.save()
    .then(()=>res.json('Discount Added'))
    .catch(err=>res.status(400).json('Error',+err));
});
router.route('/mdis').post((req,res)=>{
    const email = req.body.Owner;
    //console.log(req.body.Owner)
    console.log(email);
    Malediscount.find({Owner:email})
    .then(malediscounts =>res.json(malediscounts))
    .catch(err=>res.status(400).json('Error',+err));
});
router.route('/book').post((req,res)=>{
    var book_id = req.body.bookID
     console.log("BooK:", book_id," Owner: "+req.body.Owner);
     //User.findOne({},{'useremailid':useremailid,'userpassword':userpassword})
     Malediscount.findOne({book_id : req.body.bookID,Owner:req.body.Owner},{})
     .then(malediscounts =>res.json(malediscounts))
     .catch(err=>res.status(400).json('Error',+err));
    // Malediscount.aggregate([
    //     {
    //         $lookup:{
    //             from :"profreg",
    //             localField: "Owner",
    //             foreignField : "Owner",
    //             pipeline : [
    //                 {$match : {book_id : req.body.bookID,Owner:req.body.Owner}}
    //             ],
    //             as : "book_hk"
    //         }
    //     }
    // ])
 });
router.route('/mdisd').post((req,res)=>{
    Malediscount.deleteOne({_id:req.body._id})
    .then(()=>res.json('Deleted'))
    .catch(err=>res.res.status(400).json('Error'+err));
});
router.route('/dist').post((req,res)=>{
    const sep = "-";
const newDate = new Date()
const da = newDate.getDate();
const month = "0" + (newDate.getMonth() + 1);
const year = newDate.getFullYear();
    let today = `${year}${sep}${month}${sep}${da}`;
    Malediscount.find({$and:[{from:{$lte:today}},{to:{$gte:today}}]})
//     // let lat =Number(req.body.lat);
//     // let lng = Number(req.body.lng);
    // let data ={};
//     // data['lat']=lat;
//     // data['lng']=lng;
//         let category = (req.body.category)

//         console.log(category)
//    Malediscount.find({category:{
//        $near:{
//            $maxDistance:1000,
//            $geometry:{
//                type:"Point",
//                coordinates:data
//            }
//        }
//    }})
    .then(maps=>res.json(maps))
    .catch(err=>res.status(400).json('Error'+err));

});
module.exports = router;