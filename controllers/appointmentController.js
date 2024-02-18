const appointmentModel = require('../models/appointmentModel.js');
const userModel = require('../models/userModel');

//Create appointment
const createAppointment = async (req, res) => {
    try {
        const { email, inventoryType } = req.body
        //validate
        console.log(email)
        const user = await userModel.findOne({ email })
        if (!user) {
            throw new Error(`User not found`)
        }
        if (inventoryType === 'out' && user.role !== 'clinic' && user.role !== 'user') {
            throw new Error('Must be a patient or clinic')
        }
        //save appoint
        const appointment = new appointmentModel(req.body)
        await appointment.save();
        return res.status(201).send({
            success: true,
            message: 'New Appartment Added'
        })
        

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error Creating appointment'
        })
    }
};

//Get appointment data
const getAppointment = async (req, res) => {
    try {
        const appointment = await appointmentModel.find({
            organisation: req.body.userId
        })
            .populate('donor')
            .populate('clinic')
            .sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: 'All Records In appointment',
            appointment
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error Getting appointment',
            error
        })
    }
}

module.exports = { createAppointment, getAppointment };