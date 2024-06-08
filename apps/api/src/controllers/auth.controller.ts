import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User';
import { Twilio } from 'twilio';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;
const twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const OTP_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Register a new user (email and password)
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password, username, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
      username,
      phone // Include phone field here
    });

    await user.save();

    const payload = {
      id: user.id,
      email: user.email
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Log in a user (email and password)
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Email not registered' });
      return;
    }

    console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid password' });
      return;
    }

    const payload = {
      id: user.id,
      email: user.email
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send OTP to phone number
export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  const { phone } = req.body;

  if (!phone) {
    res.status(400).json({ message: 'Phone number is required' });
    return;
  }

  try {
    const user = await User.findOne({ phone });
    if(!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await twilioClient.messages.create({
      body: `Your OTP code is ${otp}`,
      from: twilioPhoneNumber,
      to: phone
    });

    const otpExpiry = new Date(Date.now() + OTP_EXPIRATION_TIME);

    await User.findOneAndUpdate(
      { phone },
      { otp, otpExpiry },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify OTP and log in
export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    res.status(400).json({ message: 'Phone number and OTP are required' });
    return;
  }

  try {
    const user = await User.findOne({ phone, otp });

    if (!user) {
      res.status(400).json({ message: 'Invalid OTP' });
      return;
    }

    if (user.otpExpiry && user.otpExpiry < new Date()) {
      res.status(400).json({ message: 'OTP has expired' });
      return;
    }

    const payload = {
      id: user.id,
      phone: user.phone
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateToken: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    (req as AuthenticatedRequest).user = user; // Type assertion here
    next();
  });
};
