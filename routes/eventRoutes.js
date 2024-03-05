const express = require("express");
const upload = require('../utils/multer')
const {
    createEvent,
    getAllEvents,
    getSingleEvent,
    updateEvent,
} = require("../controllers/eventController");
const userMiddleware = require('../middlewares/userMiddleware');

const router = express.Router();
//ADD  createAppointment
router.post('/create-event', userMiddleware, upload.single('images'), createEvent);
router.get('/getAllEvents', userMiddleware, getAllEvents);
router.get('/get-single-event/:_id', userMiddleware, getSingleEvent);
router.put("/update-event/:id", upload.single("images"),  updateEvent);
//Get  getAppointment
// router.get('/get-appointment', userMiddleware, getAppointment);

module.exports = router;