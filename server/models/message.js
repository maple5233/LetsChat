"use strict";

const mongoose = require('../config');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
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
    },
    createTime: {
        type: Date,
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
    fetchOne: (id, cb) => {
        return Message
            .findById(id)
            .populate('author')
            .populate('room')
            .exec(cb);
    },
    fetchByRoom: (roomId, cb) => {
        return Message
            .find({ room: roomId })
            .populate('author')
            .populate('room')
            .sort({ 'createTime' : -1 })
            .exec(cb);
    }
};


const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
