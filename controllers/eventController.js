const eventModel = require('../models/eventModel');
const userModel = require('../models/userModel');

const createEvent = async (req, res) => {
    try {
        const { clinic } = req.body
        //validate
        const _id = clinic

        console.log(_id)

        const user = await userModel.findOne({ _id })
        if (!user) {
            throw new Error(`User not found`)
        }
        //save Event
        const event = new eventModel(req.body)
        await event.save();
        return res.status(201).send({
            success: true,
            message: 'New Event Added'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error Creating Event'
        })
    }
};

const getAllEvents = async (req, res) => {
    try {
        // Retrieve all events from the database
        const events = await eventModel.find();
        // console.log(events)
        
        return res.status(200).send({
            success: true,
            data: events
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error retrieving events'
        });
    }
};

module.exports = { createEvent, getAllEvents};