import { Router } from 'express';
import { registerUser, loginUser, sendOtp, verifyOtp } from '../controllers/auth.controller';
import { check } from 'express-validator';

const router = Router();

// Register a new user (email and password)
router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  registerUser
);

// Log in a user (email and password)
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  loginUser
);

// Send OTP to phone number
router.post(
  '/otp/send',
  [
    check('phone', 'Phone number is required').notEmpty()
  ],
  sendOtp
);

// Verify OTP and log in
router.post(
  '/otp/verify',
  [
    check('phone', 'Phone number is required').notEmpty(),
    check('otp', 'OTP is required').notEmpty()
  ],
  verifyOtp
);

export default router;
