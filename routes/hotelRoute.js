const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Hotel = require('../models/hotel');

router.get('/get/:hotel', (req, res) => {
    const hotel = req.params.hotel;
    Hotel.getHotel(hotel, (err, response) => {
        if(err){
            console.log(err);
            res.json({success: false, msg: "No such hotel exists"});
        }
        else{
            res.json({success: true, hotel: response});
        }
    });
});

router.post('/add', (req, res) => {
    const hotel = new Hotel({
        _id: mongoose.Types.ObjectId(),
        owner: req.body.owner,
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
    });
    Hotel.addHotel(hotel, (err, response) => {
        if(err){
            console.log(err);
            res.json({success: false, msg: "Failed to add hotel"});
        }
        else{
            res.json({success: true, msg: "Hotel added"});
        }
    });
});

router.get('/delete/:hotel', (req, res) => {
    const hotel = req.params.hotel;
    Hotel.deleteHotel(hotel, (err, response) => {
        if(err){
            console.log(err);
            res.json({success: false, msg: "Failed to delete hotel"});
        }
        else{
            res.json({success: true, msg: "Hotel deleted"});
        }
    });
});

router.post('/update/:hotel', (req, res) => {
    const id = req.params.hotel;
    const hotel = req.body;
    Hotel.updateHotel(id, hotel, (err, response) => {
        if(err){
            console.log(err);
            res.json({success: false, msg: "Failed to update hotel"});
        }
        else{
            res.json({success: true, msg: "Hotel updated"});
        }
    });
});

module.exports = router;