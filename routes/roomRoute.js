const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Room = require('../models/room');

router.post('/add', (req, res) => {
    const room = new Room({
        _id: mongoose.Types.ObjectId(),
        hotel: req.body.hotel,
        room_no: req.body.room_no,
        tariff: req.body.tariff,
    });
    Room.addRoom(room, (err, response) => {
        if(err){
            console.log(err);
            res.json({success: false, msg: "Failed to add room"});
        }
        else{
            res.json({success: true, msg: "Room added"});
        }
    });
});

module.exports = router;