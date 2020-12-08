const router = require('express').Router();
let User = require('../model/userreg');
router.route('/').get((req,res)=>{
    User.find()
    .then(users => res.json(users))
    .catch(err =>res.status(400).json('Error:'+err));
});
router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const useremailid = req.body.useremailid;
    const userphno = req.body.userphno;
    const userpassword = req.body.userpassword;
    const newUser = new User({
        username,
        useremailid,
        userphno,
        userpassword
    });
    newUser.save()
    .then(()=>res.json('User added'))
    .catch(err => res.status(400).json('Error:'+err));
});
router.route('/login').post((req,res)=>{
    var email = req.body.useremailid;
    var password = req.body.userpassword;
    User.findOne({ 'useremailid': email, 'userpassword': password }, { useremailid: 1 })
        .then(user => res.json(user));
});
router.route('/userd').post((req,res)=>{
    User.deleteOne({_id:req.body._id})
    .then(()=>res.json('Deleted'))
    .catch(err=>res.res.status(400).json('Error'+err));
});
module.exports= router;