const router = require('express').Router();
let bookchef = require('../model/bookchef');
router.route('/').get((req,res)=>{
    bookchef.find()
    .then(bookchef => res.json(bookchef))
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
    
    const newbookchef = new bookchef({
        Owner,
        user,
        // phono,
        category,
        price,
        from,
        to,
        time
    });
    newbookchef.save()
    .then(()=>res.json('Booked'))
    .catch(err=>res.status(400).json('Error',+err));
});
router.route('/disp').post((req,res)=>{
   const user = req.body.user;
   console.log(user)
    bookchef.find({user : req.body.user})
    .then(bookchef =>res.json(bookchef))
    .catch(err=>res.status(400).json('Error',+err));
})
router.route('/disprof').post((req,res)=>{
    const Owner = req.body.owner;
    console.log(Owner)
     bookchef.find({Owner : req.body.Owner})
     .then(bookchef =>res.json(bookchef))
     .catch(err=>res.status(400).json('Error',+err));
 })
router.route('/mdisd').post((req,res)=>{
    bookchef.deleteOne({_id:req.body._id})
    .then(()=>res.json('Deleted'))
    .catch(err=>res.res.status(400).json('Error'+err));
});

router.route('/cancel').post((req,res)=>{
    const id = req.body._id;
    console.log(id)
    bookchef.remove({_id:req.body._id})
    .then(()=>res.json('Deleted'))
    .catch(err=>res.res.status(400).json('Error'+err));
});
router.route('/accept').post((req,res)=>{
    const id = req.body._id;
    console.log(id)
    bookchef.findByIdAndUpdate({_id:req.body._id},{status:"Accepted!"})
    .then(()=>res.json('Accepted!'))
    .catch(err=>res.res.status(400).json('Error'+err));
})
router.route('/reject').post((req,res)=>{
    const id = req.body._id;
    console.log(id)
    bookchef.findByIdAndUpdate({_id:req.body._id},{status:"Rejected!"})
    .then(()=>res.json('Rejected!'))
    .catch(err=>res.res.status(400).json('Error'+err));
})




// router.route('/book').post((req,res)=>{
//    const book_id = req.body.bookID
//     console.log("BOoK:", book_id);
//     // Malediscount.find({Owner:email})
//     // .then(malediscounts =>res.json(malediscounts))
//     // .catch(err=>res.status(400).json('Error',+err));
// });

// router.route('/payment').post((req,res)=>{
//     var params = {};
//     params['MID'] = config.PaytmConfig.mid;
//     params['WEBSITE'] = config.PaytmConfig.website;
//     params['CHANNEL_ID'] = 'WEB';
//     params['INDUSTRY_TYPE_ID'] = 'Retail';
//     params['ORDER_ID'] = 'TEST_'  + new Date().getTime();
//     params['CUST_ID'] = paymentDetails.customerId;
//     params['TXN_AMOUNT'] = paymentDetails.amount;
//     params['CALLBACK_URL'] = 'http://localhost:3000/userhome';
//     // params['EMAIL'] = paymentDetails.customerEmail;
//     // params['MOBILE_NO'] = paymentDetails.customerPhone;
//     checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
//         var txn_url = "https://securegw-stage.paytm.in/order/process"; // for staging
//         // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

//         var form_fields = "";
//         for (var x in params) {
//             form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
//         }
//         form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
//         res.end();
// })

// })





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