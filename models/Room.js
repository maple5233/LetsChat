"use strict";

const mongoose = require('../config');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    roomName: {
        type: String,
        required: true,
        unique: true
    }
});

RoomSchema.statics = {
    fetchById: (id, cb) => {
        return Room
            .findById(id)
            .exec(cb);
    },
    fetch: (json, cb) => {
        return Room
            .find(json)
            .sort({ '_id': -1 })
            .exec(cb);
    },
    fetchByName: (name, cb) => {
        return Room
            .findOne({ roomName: name })
            .exec(cb);
    }
};

RoomSchema.path('roomName').required(true, 'Room name cannot be blank!');

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;

