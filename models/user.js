const mongoose = require('mongoose');
const config = require('../config/database');

const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    license: {
        type: String,
        required: true
    },
    license_number: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUser = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    newUser.save(callback);
}

module.exports.deleteUser = function(username, callback){
    const query = {
        username: username
    };
    User.remove(query, callback);
}

module.exports.updateUser = function(username, data, callback){
    const query = {
        username: username
    };
    const update = data;
    const options = { upsert: false, new: false, setDefaultsOnInsert: false };    
    User.update(query, update, options, callback);
}