const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title Required'],
    },
    date: {
        type: Date,
        required: [true, 'Title Required'],
    },
    place: {
        type: String,
        required: [true, 'Place Required'],
    },
    details: {
        type: String,
        required: [true, 'Description Required'],
    },
    status: {
        type: String,
        default: 'pending'
    },
    // status: {
    //     type: String,
    //     default: 'pending'
    // },
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, 'Clinic ID Required'],
    },
}, { timestamps: true });

module.exports = mongoose.model('event ', eventSchema)