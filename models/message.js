"use strict";

const mongoose = require('../config');
const Schema = mongoose.Schema;

let MessageSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    content: {
        type: String,
        required: true
    }
});

MessageSchema.statics = {
    fetchById: (id, cb) => {
        return Message
            .findById(id)
            .exec(cb);
    },
    fetch: (json, cb) => {
        return Message
            .find(json)
            .sort({
                '_id': -1
            })
            .exec(cb);
    },
    fetchOne: function(id, cb) {
        return Message
            .findById(id)
            .populate('author')
            .populate('room')
            .exec(cb);
    }
};


const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
