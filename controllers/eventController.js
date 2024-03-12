const eventModel = require('../models/eventModel');
// const userModel = require('../models/userModel');
const cloudinary = require('cloudinary');

const createEvent = async (req, res) => {
    try {
        const { clinic } = req.body;

        // console.log(req.file)

        const imageData = [];
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'Blood/events',
            width: 150,
            crop: "scale"
        })
        imageData.push({ public_id: result.public_id, url: result.secure_url });

        // Save event
        const newEvent = await eventModel.create({
            clinic,
            eventType: req.body.eventType,
            title: req.body.title,
            date: req.body.date,
            place: req.body.place,
            details: req.body.details,
            status: 'pending',
            images: imageData,
        });
        const event = new eventModel(newEvent);
        await event.save();

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

const getSingleEvent = async (req, res) => {
    const eventID = req.params._id;

    try {
        const event = await eventModel.findById(eventID);

        // console.log(article)

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Article found',
            event
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, eventType, date, place, details, status, clinic } = req.body;
        // console.log(id)
        // console.log(req.body)
        // console.log(req.file)

        const imageData = [];
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'Blood/events',
            width: 150,
            crop: "scale"
        })
        imageData.push({ public_id: result.public_id, url: result.secure_url });

        const updateNewEvent = {
            title,
            eventType,
            date,
            place,
            details,
            status,
            clinic,
            images: imageData
        };

        const event = await eventModel.findByIdAndUpdate(id, updateNewEvent, { new: true });
        // console.log(updatedUser)

        res.status(200).json({ success: true, message:'Event has been Updated!' ,user: event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const eventAddComment = async (req, res) => {
    try {

        const eventID = req.body.eventID;
        const { userID, detail } = req.body;
        // console.log(req.files)
        // Handle multiple file uploads
        if (req.files && req.files.length > 0) {
            const imageData = [];

            for (const file of req.files) {
                const result = await cloudinary.v2.uploader.upload(file.path, {
                    folder: 'Blood/events/comments',
                    width: 150,
                    crop: "scale"
                });

                imageData.push({ public_id: result.public_id, url: result.secure_url });
            }

            addedComment = {
                eventID: eventID,
                userID: userID,
                detail: detail,
                image: imageData
            };
            const newComment = await eventModel.findByIdAndUpdate(eventID, {
                $push: { comment: addedComment }
            }, { new: true });
            console.log(newComment);
            res.status(200).json({ success: true, message: 'The Comment Was Added', comment: newComment.comment });
        } else {
            addedComment = {
                eventID: eventID,
                userID: userID,
                detail: detail
            };
            const newComment = await eventModel.findByIdAndUpdate(eventID, {
                $push: { comment: addedComment }
            }, { new: true });
            console.log(newComment);
            res.status(200).json({ success: true, message: 'The Comment Was Added', comment: newComment.comment });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Your Added Comment Failed ' });
    }
}

const deleteComment = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const commentId = req.params.commentId;

        // console.log(eventId, commentId)
        const event = await eventModel.findById(eventId);

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        const commentIndex = event.comment.findIndex(comment => comment._id.toString() === commentId);

        if (commentIndex === -1) {
            return res.status(404).json({ success: false, message: 'Comment not found' });
        }

        event.comment.splice(commentIndex, 1);

        await event.save();

        return res.status(200).json({ success: true, message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = { createEvent, getAllEvents, getSingleEvent, updateEvent, eventAddComment, deleteComment };