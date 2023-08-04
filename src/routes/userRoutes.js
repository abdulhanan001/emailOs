import express from 'express';
import { saveUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// POST endpoint to save user data to the 'users' table
router.post('/', saveUser);
router.get('/', getAllUsers);

export default router;