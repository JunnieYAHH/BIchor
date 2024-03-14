const appointmentModel = require('../models/appointmentModel.js');
const userModel = require('../models/userModel');

//Create appointment
const createAppointment = async (req, res) => {
    try {
        const { email, appointmentType } = req.body
        //validate
        // console.log(email, appointmentType)
        const user = await userModel.findOne({ email })
        if (!user) {
            throw new Error(`User not found`)
        }

        const userID = req.body.userID;
        const appointmentData = {
            ...req.body,
            userID: userID
        };

        // Save the appointment
        const appointment = new appointmentModel(appointmentData);
        await appointment.save();
        return res.status(201).send({
            success: true,
            message: 'New Appointment Added'
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
    const appointmentId = req.params._id;

    if (!appointmentId) {
        return res.status(400).json({ success: false, message: 'Appointment ID is required' });
    }

    try {
        const appointment = await appointmentModel.findById(appointmentId);

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

const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Find the appointment by ID and update its status
        const updatedAppointment = await appointmentModel.findByIdAndUpdate(id, { status }, { new: true });

        res.status(200).json({ success: true, appointment: updatedAppointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateAppointmentQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        // Find the appointment by ID and update its status
        const updatedAppointment = await appointmentModel.findByIdAndUpdate(id, { quantity }, { new: true });

        res.status(200).json({ success: true, message: 'Appointment Was successfully updated ', appointment: updatedAppointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const appointmentStatusComplete = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const AppointmentStatus = {
        status: 'confirmed',
      };
  
      const appointment = await appointmentModel.findByIdAndUpdate(id, AppointmentStatus, {
        new: true,
      });
      // console.log(appointment)
  
      res.status(200).json({ success: true, message: 'Appointment is now Completed', appointment });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };



module.exports = { createAppointment, getAppointment, getAllAppointment, getSingleAppointment, updateAppointmentStatus, updateAppointmentQuantity, appointmentStatusComplete };