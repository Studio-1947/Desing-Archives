import { Router } from "express";
import { ChallengeController } from "../controllers/challenge.controller";
import { SubmissionController } from "../controllers/submission.controller";

const router = Router();
const challengeController = new ChallengeController();
const submissionController = new SubmissionController();

/**
 * @swagger
 * /api/challenges:
 *   get:
 *     summary: Get all challenges
 *     tags: [Challenges]
 *     responses:
 *       200:
 *         description: List of challenges
 *   post:
 *     summary: Create a new challenge
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Challenge created
 */
router.get("/", challengeController.getAllChallenges);
router.post("/", challengeController.createChallenge);

/**
 * @swagger
 * /api/challenges/{id}:
 *   get:
 *     summary: Get challenge by ID
 *     tags: [Challenges]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Challenge details
 */
router.get("/:id", challengeController.getChallengeById);

/**
 * @swagger
 * /api/challenges/{id}/leaderboard:
 *   get:
 *     summary: Get challenge leaderboard
 *     tags: [Challenges]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Challenge leaderboard
 */
router.get("/:id/leaderboard", submissionController.getLeaderboard);

router.put("/:id", challengeController.updateChallenge);
router.delete("/:id", challengeController.deleteChallenge);
router.post("/:id/participate", challengeController.registerParticipant);
router.get("/:id/status", challengeController.getParticipantStatus);
router.post("/:id/view", challengeController.incrementViews);
router.get("/:id/stats", challengeController.getStats);

export default router;
