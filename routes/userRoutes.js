const express = require('express');

const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    currentUser,
} = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');

//routes
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/current-user', userMiddleware, currentUser);

module.exports = router;