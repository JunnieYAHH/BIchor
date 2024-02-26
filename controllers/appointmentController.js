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

const getSingleAppointment = async (req, res) => {
    const appointmentId = req.params.id;

    // Check if appointmentId is provided
    if (!appointmentId) {
        return res.status(400).json({ success: false, message: 'Appointment ID is required' });
    }

    try {
        const appointment = await appointmentModel.findById(appointmentId);

        // Check if appointment exists
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Appointment found',
            appointment
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


const getAllAppointment = async (req, res) => {
    try {
        // Retrieve all events from the database
        const appointment = await appointmentModel.find();
        // console.log(events)

        return res.status(200).send({
            success: true,
            data: appointment
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error retrieving appointment'
        });
    }
}



module.exports = { createAppointment, getAppointment, getAllAppointment, getSingleAppointment };