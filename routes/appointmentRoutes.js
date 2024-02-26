const express = require("express");
const {
    createAppointment,
    getAppointment,
    getAllAppointment,
    getSingleAppointment
} = require("../controllers/appointmentController");
const userMiddleware = require('../middlewares/userMiddleware');

const router = express.Router();
//ADD  createAppointment
router.post('/create-appointment', userMiddleware, createAppointment);
//Get  getAppointment
router.get('/get-appointment', userMiddleware, getAppointment);
router.get('/getAllAppointments', userMiddleware, getAllAppointment);
router.get('/getSingleAppointment/:id', userMiddleware, getSingleAppointment);

module.exports = router;