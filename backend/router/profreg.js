const router = require('express').Router();
let Profreg = require('../model/profreg');

router.route('/').get((req, res) => {
    Profreg.find()
        .then(shops => res.json(shops))
        .catch(err => res.status(400).json('Error:' + err));
});
router.route('/add').post((req, res) => {
    const name = req.body.name;
    // const shopname = req.body.shopname;
    // const gstno = req.body.gstno;
    const phono = req.body.phono;
    const email = req.body.email;
    const password = req.body.password;
    const lat = Number(req.body.lat);
    const lng = Number(req.body.lng);
    // const data = {};
    // data['lat'] = lat;
    // data['lng'] = lng;
    // const location = data;
    const newProfreg = new Profreg({
        name,
        // shopname,
        // gstno,
        phono,
        email,
        password
        // location
    });
    newProfreg.save()
        .then(() => res.json('Shop added'))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/shoplogin').post((req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    Profreg.findOne({ 'email': email, 'password': password }, { email: 1 })
        .then(shops => res.json(shops));
});
router.route('/det').post((req, res) => {
    const email = req.body.email;
    //console.log(email);
    Profreg.find({ email: email })
        .then(shops => res.json(shops))
        .catch(err => res.status(400).json('Error' + err));
});
module.exports = router;