"use strict";

const mongoose = require('../config');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    fetchByName: (name, cb) => {
        return User
            .findOne({
                userName: name
            })
            .exec(cb);
    }
};

UserSchema.path('userName').required(true, 'User name cannot be blank!');

const User = mongoose.model('User', UserSchema);
module.exports = User;
