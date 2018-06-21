const mongoose = require('mongoose');
const config = require('../config/database');
const Hotel = require('./hotel');
const Schema = mongoose.Schema;

const RoomSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    hotel: { type: Schema.Types.ObjectId, ref: 'Hotel' },
    room_no: {
        type: String,
        required: true
    },
    tariff: {
        type: Number,
        default: 0
    }
});

const Room = module.exports = mongoose.model('Room', RoomSchema);

module.exports.addRoom = function(newRoom, callback){
    newRoom.save(callback);
}