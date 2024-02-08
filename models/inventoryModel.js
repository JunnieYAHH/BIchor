const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
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
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'Organization Required'],
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: function () {
            return this.inventoryType === "out"
        }
    },
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: function () {
            return this.inventoryType === "in"
        }
    },
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema)