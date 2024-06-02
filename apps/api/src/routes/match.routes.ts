import { Router } from 'express';
import { createMatch, getAllMatches, acceptMatch, rejectMatch, unmatch } from '../controllers/match.controller';

const router = Router();

router.post('/', createMatch);
router.get('/', getAllMatches);
router.put('/:id/accept', acceptMatch);
router.put('/:id/reject', rejectMatch);
router.delete('/:id', unmatch);  // Add this line for the unmatch route

export default router;
