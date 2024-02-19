const express = require("express");
const {
    createEvent,
    getAllEvents
} = require("../controllers/eventController");
const userMiddleware = require('../middlewares/userMiddleware');

const router = express.Router();
//ADD  createAppointment
router.post('/create-event', userMiddleware, createEvent);
router.get('/getAllEvents', userMiddleware, getAllEvents);
//Get  getAppointment
// router.get('/get-appointment', userMiddleware, getAppointment);

module.exports = router;