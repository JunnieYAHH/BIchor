const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventType: {
        type: String,
        required: [true, 'Event Type Required'],
        enum: ["campain", "donation", "transfusion"],

    },
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
        enum: ["pending", "completed"],
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, 'Clinic ID Required'],
    },
}, { timestamps: true });

module.exports = mongoose.model('event ', eventSchema)