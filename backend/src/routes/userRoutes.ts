import express from 'express';
import { validateRegistration } from '../middlewares/auth-middleware';
import { registerUser } from '../controllers/userController';

const router = express.Router();

router.post('/register', validateRegistration, registerUser);

export { router };