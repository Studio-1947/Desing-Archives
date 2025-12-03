import { Router } from 'express';
import { SubmissionController } from '../controllers/submission.controller';

const router = Router();
const submissionController = new SubmissionController();

// Create a new submission
router.post('/', (req, res) => submissionController.createSubmission(req, res));

// Get pending submissions (Admin only - middleware to be added later if needed)
router.get('/pending', (req, res) => submissionController.getPendingSubmissions(req, res));

// Grade a submission (Admin only)
router.post('/:id/grade', (req, res) => submissionController.gradeSubmission(req, res));

// Get leaderboard for a challenge
router.get('/leaderboard/:challengeId', (req, res) => submissionController.getLeaderboard(req, res));

export default router;
