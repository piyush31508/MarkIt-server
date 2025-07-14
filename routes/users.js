import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { registerUser, loginUser, getMe, verifyOtp } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', isAuth, getMe);
router.post("/verify-otp", verifyOtp);

export default router;
