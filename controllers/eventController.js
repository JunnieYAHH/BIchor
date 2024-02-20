const eventModel = require('../models/eventModel');
const userModel = require('../models/userModel');
const cloudinary = require('cloudinary');

const createEvent = async (req, res) => {
    try {
        const { clinic, images } = req.body;

        // Validate
        if (!clinic || !images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'Missing clinic or image data',
            });
        }

        const uploadedImages = [];
        for (const image of images) {
            const result = await cloudinary.v2.uploader.upload(image.url, {
                folder: 'Blood/events',
                width: 150,
                crop: 'scale',
            });
            uploadedImages.push({ public_id: result.public_id, url: result.secure_url });
        }

        // Save event
        const event = await eventModel.create({
            clinic,
            eventType: req.body.eventType,
            title: req.body.title,
            date: req.body.date,    
            place: req.body.place,
            details: req.body.details,
            status: 'pending',
            images: uploadedImages,
        });
        // await event.save();

        return res.status(201).send({
            success: true,
            message: 'New Event Added',
            event,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error Creating Event',
        });
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

module.exports = { createEvent, getAllEvents };