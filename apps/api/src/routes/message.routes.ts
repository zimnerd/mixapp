import { Router } from 'express';
import { sendMessage, getMessagesForMatch } from '../controllers/message.controller';

const router = Router();

router.post('/', sendMessage);
router.get('/:matchId', getMessagesForMatch);

export default router;
