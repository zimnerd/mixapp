import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser ,getUsersWithinRadius , updateUserPreferences} from '../controllers/user.controller';

const router = Router();

// Define routes and attach controller methods
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:userId/radius', getUsersWithinRadius);
router.put('/:userId/preferences', updateUserPreferences);

export default router;
