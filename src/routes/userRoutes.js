const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST endpoint to save user data to the 'users' table
router.post('/', userController.saveUser);
router.get('/', userController.getAllUsers);

module.exports = router;