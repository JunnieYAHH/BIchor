const express = require('express');

const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    currentUser,
} = require('../controllers/userController');
const userMIddleware = require('../middlewares/userMIddleware');

//routes
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/name', userMIddleware, currentUser);

module.exports = router;