import { Router } from 'express';
import { sendMessage, uploadFile, getChatMessages } from '../controllers/chat.controller';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/send', sendMessage);
router.post('/upload', upload.single('file'), uploadFile);
router.get('/:userId1/:userId2', getChatMessages);

export default router;
