import { Request, Response } from 'express';
import User from '../models/User';
import Match from '../models/Match';

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Get users within the radius excluding rejected/unmatched/matched users
  export const getUsersWithinRadius = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    try {
      const currentUser = await User.findById(userId);
      if (!currentUser) {
        res.status(404).send('User not found');
        return;
      }

      const rejectedUserIds = await Match.find({
        $or: [
          { user1: userId, status: 'rejected' },
          { user2: userId, status: 'rejected' }
        ]
      }).distinct('user2').exec();

      const unmatchedUserIds = await Match.find({
        $or: [
          { user1: userId, status: 'unmatched' },
          { user2: userId, status: 'unmatched' }
        ]
      }).distinct('user2').exec();

      const matchedUserIds = await Match.find({
        $or: [
          { user1: userId, status: 'accepted' },
          { user2: userId, status: 'accepted' }
        ]
      }).distinct('user2').exec();

      const excludedUserIds = [...rejectedUserIds, ...unmatchedUserIds, ...matchedUserIds, userId];

      const usersWithinRadius = await User.find({
        _id: { $nin: excludedUserIds },
        location: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: currentUser.location.coordinates
            },
            $maxDistance: currentUser.searchRadius * 1000 // convert km to meters
          }
        }
      });

      res.json(usersWithinRadius);
    } catch (error) {
      res.status(500).send(error);
    }
  };

// Update user location and search radius
  export const updateUserPreferences = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const { coordinates, searchRadius } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).send('User not found');
        return;
      }

      if (coordinates) user.location.coordinates = coordinates;
      if (searchRadius !== undefined) user.searchRadius = searchRadius;

      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).send(error);
    }
  };
