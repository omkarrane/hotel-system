const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.get('/get/:username', (req, res) => {
    var username = req.params.username;
    User.getUser(username, (err, response) => {
        if(err){
            console.log(err);
            res.json({success: false, msg: "No such user exists"});
        }
        else{
            res.json({success: true, user: response});
        }
    });
});

router.post('/add', (req, res) => {
    var user = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        license: req.body.license,
        license_number: req.body.license_number
    });
    User.addUser(user, (err, response) => {
        if(err){
            console.log(err);
            res.json({success: false, msg: "Failed to add user"});
        }
        else{
            res.json({success: true, msg: "User added"});
        }
    });
});

router.get('/delete/:username', (req, res) => {
    var username = req.params.username;
    User.deleteUser(username, (err, response) => {
        if(err){
            console.log(err);
            res.json({success: false, msg: "Failed to delete user"});
        }
        else{
            res.json({success: true, msg: "User deleted"});
        }
    });
});

router.post('/update/:username', (req, res) => {
    var username = req.params.username;
    var data = req.body;
    User.updateUser(username, data, (err, response) => {
        if(err){
            console.log(err);
            res.json({success: false, msg: "Failed to update user"});
        }
        else{
            res.json({success: true, msg: "User updated"});
        }
    });
});

module.exports = router;