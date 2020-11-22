const router = require('express').Router();
let book_hk = require('../model/Book_hk');
router.route('/').get((req,res)=>{
    book_hk.find()
    .then(book_hk => res.json(book_hk))
    .catch(err =>res.status(400).json('Error'+err));
});
router.route('/add').post((req,res)=>{
    const Owner = req.body.Owner;
    const user = req.body.user;
    // const phono = req.body.phono;
    const category = req.body.category;
    const price = req.body.price;
    const from = req.body.from;
    const to = req.body.to;
    const time = req.body.time;
    
    const newBook_hk = new book_hk({
        Owner,
        user,
        // phono,
        category,
        price,
        from,
        to,
        time
    });
    newBook_hk.save()
    .then(()=>res.json('Booked'))
    .catch(err=>res.status(400).json('Error',+err));
});
// router.route('/book').post((req,res)=>{
//    const book_id = req.body.bookID
//     console.log("BOoK:", book_id);
//     // Malediscount.find({Owner:email})
//     // .then(malediscounts =>res.json(malediscounts))
//     // .catch(err=>res.status(400).json('Error',+err));
// });







// router.route('/mdis').post((req,res)=>{
//     const email = req.body.Owner;
//     //console.log(req.body.Owner)
//     console.log(email);
//     Malediscount.find({Owner:email})
//     .then(malediscounts =>res.json(malediscounts))
//     .catch(err=>res.status(400).json('Error',+err));
// });
// router.route('/mdisd').post((req,res)=>{
//     Malediscount.deleteOne({_id:req.body._id})
//     .then(()=>res.json('Deleted'))
//     .catch(err=>res.res.status(400).json('Error'+err));
// });
// router.route('/dist').post((req,res)=>{
//     const sep = "-";
// const newDate = new Date()
// const da = newDate.getDate();
// const month = "0" + (newDate.getMonth() + 1);
// const year = newDate.getFullYear();
//     let today = `${year}${sep}${month}${sep}${da}`;
//     Malediscount.find({$and:[{from:{$lte:today}},{to:{$gte:today}}]})
// //     // let lat =Number(req.body.lat);
// //     // let lng = Number(req.body.lng);
//     // let data ={};
// //     // data['lat']=lat;
// //     // data['lng']=lng;
// //         let category = (req.body.category)

// //         console.log(category)
// //    Malediscount.find({category:{
// //        $near:{
// //            $maxDistance:1000,
// //            $geometry:{
// //                type:"Point",
// //                coordinates:data
// //            }
// //        }
// //    }})
//     .then(maps=>res.json(maps))
//     .catch(err=>res.status(400).json('Error'+err));

// });
module.exports = router;