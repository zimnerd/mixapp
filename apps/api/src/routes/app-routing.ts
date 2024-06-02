import { Router } from 'express';
import userRoutes from './user.routes';
import matchRoutes from './match.routes';
import messageRoutes from './message.routes';
import authRoutes from './auth.routes';
import chatRoutes from './chat.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/matches', matchRoutes);
router.use('/messages', messageRoutes);
router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);

export default router;
