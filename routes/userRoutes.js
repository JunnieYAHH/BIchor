const express = require('express');

const router = express.Router();
const { registerController } = require('../controllers/userController')

//routes
router.post('/register', registerController)

module.exports = router;