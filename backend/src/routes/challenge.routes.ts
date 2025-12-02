import { Router } from 'express';
import { ChallengeController } from '../controllers/challenge.controller';
import { SubmissionController } from '../controllers/submission.controller';

const router = Router();
const challengeController = new ChallengeController();
const submissionController = new SubmissionController();

router.get('/', challengeController.getAllChallenges);
router.get('/:id', challengeController.getChallengeById);
router.get('/:id/leaderboard', submissionController.getLeaderboard);
router.post('/', challengeController.createChallenge);
router.put('/:id', challengeController.updateChallenge);
router.delete('/:id', challengeController.deleteChallenge);
router.post('/:id/participate', challengeController.registerParticipant);
router.get('/:id/status', challengeController.getParticipantStatus);

export default router;
