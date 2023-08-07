import express from 'express';
import { saveUser, getAllUsers } from '../controllers/users.controller.js';
import  asyncHandler from 'express-async-handler'

const router = express.Router();

// POST endpoint to save user data to the 'users' table
router.post('/', asyncHandler(saveUser));
router.get('/', asyncHandler(getAllUsers));

export default router;