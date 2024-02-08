const inventoryModel = require('../models/inventoryModel');
const userModel = require('../models/userModel');

//Create Inventory
const createInventoryController = async (req, res) => {
    try {
        const { email, inventoryType } = req.body
        //validate
        const user = await userModel.findOne({ email })
        if (!user) {
            throw new Error(`User not found`)
        }
        if (inventoryType === 'in' && user.role !== 'donor') {
            throw new Error('Not a donor account')
        }
        if (inventoryType === 'out' && user.role !== 'hospital' && user.role !== 'user') {
            throw new Error('Must be a patient or hospital')
        }
        //save inventory
        const inventory = new inventoryModel(req.body)
        await inventory.save();
        return res.status(201).send({
            success: true,
            message: 'New Blood Record Added'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error Creating Inventory'
        })
    }
};

module.exports = { createInventoryController };