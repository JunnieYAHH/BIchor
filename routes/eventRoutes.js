const express = require("express");
const upload = require('../utils/multer')
const {
    createEvent,
    getAllEvents,
    getSingleEvent,
    updateEvent,
    eventAddComment,
    deleteComment,
    eventInPostStatus,
    eventOutPostStatus
} = require("../controllers/eventController");
const userMiddleware = require('../middlewares/userMiddleware');

const router = express.Router();
//ADD  createAppointment
router.post('/create-event', userMiddleware, upload.single('images'), createEvent);
router.get('/getAllEvents', userMiddleware, getAllEvents);
router.get('/get-single-event/:_id', userMiddleware, getSingleEvent);
router.put("/update-event/:id", upload.single("images"),  updateEvent);
router.put('/create-comment', userMiddleware, upload.array('image'), eventAddComment);
router.delete("/delete-comment/:eventId/:commentId", deleteComment);
router.put("/event-status-inPost/:id",  eventInPostStatus);
router.put("/event-status-outPost/:id",  eventOutPostStatus);

//Get  getAppointment
// router.get('/get-appointment', userMiddleware, getAppointment);

module.exports = router;