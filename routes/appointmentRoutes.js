const express = require("express");
const {
    createAppointment,
    getAppointment,
    getAllAppointment,
    getSingleAppointment,
    updateAppointmentStatus
} = require("../controllers/appointmentController");
const userMiddleware = require('../middlewares/userMiddleware');

const router = express.Router();
//ADD  createAppointment
router.post('/create-appointment', userMiddleware, createAppointment);
//Get  getAppointment
router.get('/get-appointment', userMiddleware, getAppointment);
router.get('/getAllAppointments', userMiddleware, getAllAppointment);
router.get('/getSingleAppointment/:_id', userMiddleware, getSingleAppointment);
router.put('/updateStatus/:id',userMiddleware, updateAppointmentStatus);


module.exports = router;