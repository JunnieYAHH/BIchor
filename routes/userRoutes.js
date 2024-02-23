const express = require('express');
const upload = require('../utils/multer')


const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    currentUser,
    addDescriptionUser,
    getAllUsers
} = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');

//routes
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/current-user', userMiddleware, currentUser);
router.get('/getAllUsers', userMiddleware, getAllUsers);
router.put('/add-description-user', userMiddleware, upload.single('avatar'), addDescriptionUser);
// router.put('/add-description-user', userMiddleware, upload.array('avatar'), addDescriptionUser);

module.exports = router;