const express = require('express');

const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    currentUser,
    addDescriptionUser
} = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');

//routes
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/current-user', userMiddleware, currentUser);
router.put('/add-description-user', userMiddleware, addDescriptionUser);

module.exports = router;