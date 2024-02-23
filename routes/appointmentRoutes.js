const express = require("express");
const {
    createAppointment,
    getAppointment,
    getAllAppointment
} = require("../controllers/appointmentController");
const userMiddleware = require('../middlewares/userMiddleware');

const router = express.Router();
//ADD  createAppointment
router.post('/create-appointment', userMiddleware, createAppointment);
//Get  getAppointment
router.get('/get-appointment', userMiddleware, getAppointment);
router.get('/getAllAppointments', userMiddleware, getAllAppointment);

module.exports = router;