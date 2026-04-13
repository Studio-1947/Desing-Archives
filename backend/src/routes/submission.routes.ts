import { Router } from "express";
import { SubmissionController } from "../controllers/submission.controller";

const router = Router();
const submissionController = new SubmissionController();

/**
 * @swagger
 * /api/submissions:
 *   post:
 *     summary: Create a new submission
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Submission created
 */
router.post("/", (req, res) => submissionController.createSubmission(req, res));

/**
 * @swagger
 * /api/submissions/pending:
 *   get:
 *     summary: Get pending submissions
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending submissions
 */
router.get("/pending", (req, res) =>
  submissionController.getPendingSubmissions(req, res)
);

/**
 * @swagger
 * /api/submissions/{id}/grade:
 *   post:
 *     summary: Grade a submission
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Submission graded
 */
router.post("/:id/grade", (req, res) =>
  submissionController.gradeSubmission(req, res)
);

/**
 * @swagger
 * /api/submissions/leaderboard/{challengeId}:
 *   get:
 *     summary: Get challenge leaderboard
 *     tags: [Submissions]
 *     parameters:
 *       - in: path
 *         name: challengeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Challenge leaderboard
 */
router.get("/leaderboard/:challengeId", (req, res) =>
  submissionController.getLeaderboard(req, res)
);

/**
 * @swagger
 * /api/submissions/count:
 *   get:
 *     summary: Get submission count for a user and challenge
 *     tags: [Submissions]
 *     responses:
 *       200:
 *         description: Submission count
 */
router.get("/count", (req, res) =>
  submissionController.getSubmissionCount(req, res)
);

export default router;
