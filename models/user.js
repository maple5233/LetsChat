"use strict";

const mongoose = require('../config');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    userPass: {
        type: String,
        required: true
    }
});

UserSchema.statics = {
    fetchById: (id, cb) => {
        return User
            .findById(id)
            .exec(cb);
    },
    fetch: (json, cb) => {
        return User
            .find(json)
            .sort({
                '_id': -1
            })
            .exec(cb);
    },
    fetchByName: (name, cb)=> {
        return User
            .findOne({
                userName: name
            })
            .exec(cb);
    }
};

UserSchema.path('userName').required(true, 'User name cannot be blank!');

module.exports = mongoose.model('User', UserSchema);
