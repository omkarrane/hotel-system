const mongoose = require('mongoose');
const config = require('../config/database');
const Room = require('./room');
const User = require('./user');
const Schema = mongoose.Schema;

const BookingSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    booking_from: {
        type: Date
    },
    booking_till: {
        type: Date
    },
    payment: {
        type: Boolean,
        default: true       // Default to true as there is no payment gateway involved
    }
});

const Booking = module.exports = mongoose.model('Booking', BookingSchema);

module.exports.addBooking = function(newBooking, callback){
    newBooking.save(callback);
}

// Get All Rooms which falls between these dates and then exclude them
module.exports.getRoomsList = function(date_from, date_till, callback){
    Booking.find({
        $or: [
            {
                $and: [{'booking_from': {$lte: date_from}}, {'booking_till': {$gte: date_till}}]
            },
            {
                'booking_from': {$gte: date_from, $lte: date_till}
            },
            {
                'booking_till': {$gte: date_from, $lte: date_till}
            }
        ]
    }, (err, rooms) => {
        if(err) throw err;
        Rooms.find({
            '_id': {$nin: rooms.room}
        }, callback);
    });    
}