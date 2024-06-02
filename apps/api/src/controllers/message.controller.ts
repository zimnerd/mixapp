import { Request, Response } from 'express';
import Message from '../models/Message';
import Match from '../models/Match';

// Send a message
export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  const { matchId, sender, content } = req.body;

  if (!matchId || !sender || !content) {
    res.status(400).send('matchId, sender, and content are required');
    return;
  }

  try {
    const message = new Message({ matchId, sender, content });
    await message.save();

    // Update the match to include the new message
    await Match.findByIdAndUpdate(matchId, { $push: { messages: message._id } });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get messages for a match
export const getMessagesForMatch = async (req: Request, res: Response): Promise<void> => {
  const { matchId } = req.params;

  try {
    const messages = await Message.find({ matchId }).sort({ createdAt: 1 }).populate('sender');
    res.json(messages);
  } catch (error) {
    res.status(500).send(error);
  }
};
