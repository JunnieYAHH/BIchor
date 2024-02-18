const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    inventoryType: {
        type: String,
        required: [true, 'Inventory Type Required'],
        enum: ['in', 'out']
    },
    bloodGroup: {
        type: String,
        required: [true, 'Blood Group Required'],
        enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-']
    },
    quantity: {
        type: Number,
        required: [true, 'Blood Quantity Required'],
    },
    email:{
        type:String,
        required:[true, "Donor Email is Required"]
    },
    event:{
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
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        // required: function () {
        //     return this.inventoryType === "in"
        // }
    },  
}, { timestamps: true });

module.exports = mongoose.model('appointment ', appointmentSchema)