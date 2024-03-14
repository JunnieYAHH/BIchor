const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventType: {
        type: String,
        required: [true, 'Event Type Required'],
        enum: ["campaign", "donation", "transfusion"],

    },
    title: {
        type: String,
        required: [true, 'Title Required'],
    },
    date: {
        type: Date,
        required: [true, 'Date Required'],
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
    postEventStatus: {
        type: String,
        default: 'outPost'
    },
    comment: [
        {
            userID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
            eventID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "event",
            },
            detail: {
                type: String,
            },
            image: [
                {
                    public_id: {
                        type: String,
                    },
                    url: {
                        type: String,
                    }
                }
            ],
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('event ', eventSchema)