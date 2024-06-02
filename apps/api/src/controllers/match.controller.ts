import { Request, Response } from 'express';
import Match from '../models/Match';
import User from '../models/User';

// Create a match
export const createMatch = async (req: Request, res: Response): Promise<void> => {
  const { user1, user2 } = req.body;

  if (!user1 || !user2) {
    res.status(400).send('Both user1 and user2 are required');
    return;
  }

  try {
    const match = new Match({ user1, user2 });
    await match.save();
    res.status(201).json(match);
  } catch (error) {
    res.status(500).send(error);
  }
};

// View all matches
export const getAllMatches = async (req: Request, res: Response): Promise<void> => {
  try {
    const matches = await Match.find().populate('user1 user2');
    res.json(matches);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Accept a match
export const acceptMatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
    if (match) {
      res.json(match);
    } else {
      res.status(404).send('Match not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Reject a match
export const rejectMatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    if (match) {
      res.json(match);
    } else {
      res.status(404).send('Match not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Unmatch (delete a match)
export const unmatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (match) {
      res.json({ message: 'Match successfully removed' });
    } else {
      res.status(404).send('Match not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
