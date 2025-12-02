import { Router } from 'express';
import { ChallengeController } from '../controllers/challenge.controller';

const router = Router();
const challengeController = new ChallengeController();

router.get('/', challengeController.getAllChallenges);
router.get('/:id', challengeController.getChallengeById);
router.post('/', challengeController.createChallenge);
router.put('/:id', challengeController.updateChallenge);
router.delete('/:id', challengeController.deleteChallenge);

export default router;
