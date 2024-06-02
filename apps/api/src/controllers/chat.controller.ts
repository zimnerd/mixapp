import { Request, Response } from 'express';
import Chat from '../models/Chat';
import User from '../models/User';
import multer from 'multer';
import mongoose from 'mongoose';

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Send a message
// Send a message
export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  let { sender, receiver, message } = req.body;

  try {
    // Convert to ObjectId
    sender = mongoose.Types.ObjectId.isValid(sender) ? new mongoose.Types.ObjectId(sender) : null;
    receiver = mongoose.Types.ObjectId.isValid(receiver) ? new mongoose.Types.ObjectId(receiver) : null;

    if (!sender || !receiver) {
      res.status(400).json({ message: 'Invalid sender or receiver ID' });
      return;
    }

    const senderExists = await User.findById(sender);
    const receiverExists = await User.findById(receiver);

    if (!senderExists || !receiverExists) {
      res.status(400).json({ message: 'Sender or receiver does not exist' });
      return;
    }

    const chat = new Chat({ sender, receiver, message });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Upload a file
export const uploadFile = [
  upload.single('file'),
  async (req: Request, res: Response): Promise<void> => {
    const { sender, receiver } = req.body;

    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    try {
      const chat = new Chat({
        sender,
        receiver,
        fileUrl: `/uploads/${req.file.filename}`
      });

      await chat.save();
      res.status(201).json(chat);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

// Fetch chat messages
export const getChatMessages = async (req: Request, res: Response): Promise<void> => {
  const { userId1, userId2 } = req.params;

  try {
    const chats = await Chat.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
