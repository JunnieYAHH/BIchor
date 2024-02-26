const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    appointmentType: {
        type: String,
        required: [true, 'Inventory Type Required'],
        enum: ['in', 'out', 'apply']
    },
    bloodGroup: {
        type: String,
        enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-','K'],
        required: function () {
            if (this.appointmentType !== 'apply') {
                return true;
            }
            return false;
        },
    },
    quantity: {
        type: Number,
        required: function () {
            if (this.appointmentType !== 'apply') {
                return true;
            }
            return false;
        },
    },
    email: {
        type: String,
        required: [true, "Donor Email is Required"]
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
        required: [true, 'Event Required'],
    },
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: function () {
            return this.inventoryType === "out"
        }
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    status: {
        type: String,
        defaultValue: 'pending',
        required: [true, 'Status is Required']
    }
}, { timestamps: true });

module.exports = mongoose.model('appointment ', appointmentSchema)