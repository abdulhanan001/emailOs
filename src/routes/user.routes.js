import express from 'express';
import { saveUser, getAllUsers } from '../controllers/user.controller.js';
import  asyncHandler from 'express-async-handler';
import { validateMiddleware } from '../middlewares/validateSchema.middleware.js';
import { createUserSchema } from '../schemas/user.schema.js';

const userRouter = express.Router();

// POST endpoint to save user data to the 'users' table
userRouter.post('/', validateMiddleware(createUserSchema) ,asyncHandler(saveUser));
userRouter.get('/', asyncHandler(getAllUsers));

export { userRouter };