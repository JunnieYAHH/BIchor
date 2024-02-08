const express = require("express");
const {
    createInventoryController
} = require("../controllers/inventoryController");
const userMiddleware = require('../middlewares/userMiddleware');

const router = express.Router();
//ADD  Inventory
router.post('/create-inventory', userMiddleware, createInventoryController);

module.exports = router;