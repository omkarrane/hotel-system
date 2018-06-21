const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../models/booking');

router.post('/add', (req, res) => {
    const booking = new Booking({
        _id: mongoose.Types.ObjectId(),
        room: req.body.room,
        user: req.body.user,
        booking_from: new Date(req.body.booking_from),
        booking_till: new Date(req.body.booking_till)
    });
    Booking.addBooking(booking, (err, response) => {
        if(err){
            console.log(err);
            res.json({success: false, msg: "Failed to add booking"});
        }
        else{
            res.json({success: true, msg: "Booking added"});
        }
    })
});

router.post('/get/rooms', (req, res) => {
    const date_from = new Date(req.body.date_from);
    const date_till = new Date(req.body.date_till);
    Booking.getRoomsList(date_from, date_till, (err, response) => {
        if(err){
            console.log(err);
            res.json({success: false, msg: "Failed to fetch rooms list"});
        }
        else{
            res.json({success: true, list: response});
        }
    });
})

module.exports = router;