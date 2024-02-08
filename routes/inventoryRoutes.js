const express = require("express");
const {
    createInventory,
    getInventory
} = require("../controllers/inventoryController");
const userMiddleware = require('../middlewares/userMiddleware');

const router = express.Router();
//ADD  Inventory
router.post('/create-inventory', userMiddleware, createInventory);
//Get  Inventory
router.get('/get-inventory', userMiddleware, getInventory);

module.exports = router;