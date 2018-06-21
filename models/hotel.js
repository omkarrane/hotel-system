const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('./user');

const Schema = mongoose.Schema;

const HotelSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    }
});

const Hotel = module.exports = mongoose.model('Hotel', HotelSchema);

module.exports.getHotel = function(hotel, callback){
    const query = {_id: hotel};
    Hotel.findOne(query, callback);
}

module.exports.addHotel = function(newHotel, callback){
    newHotel.save(callback);
}

module.exports.deleteHotel = function(hotel, callback){
    const query = {
        _id: hotel
    };
    Hotel.remove(query, callback);
}

module.exports.updateHotel = function(id, hotel, callback){
    const query = {
        _id: id
    }
    const update = {
        name: hotel.name,
        location: hotel.location,
        description: hotel.description
    };
    const options = { upsert: false, new: false, setDefaultsOnInsert: true };    
    Hotel.update(query, update, options, callback);
}