const express = require("express");
const {
    createEvent,
} = require("../controllers/eventController");
const userMiddleware = require('../middlewares/userMiddleware');

const router = express.Router();
//ADD  createAppointment
router.post('/create-event', userMiddleware, createEvent);
//Get  getAppointment
// router.get('/get-appointment', userMiddleware, getAppointment);

module.exports = router;