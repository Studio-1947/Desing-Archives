import { Router } from "express";
import { DiscussionController } from "../controllers/discussion.controller";

const router = Router();
const discussionController = new DiscussionController();

/**
 * @swagger
 * /api/discussions:
 *   get:
 *     summary: Get all discussions
 *     tags: [Discussions]
 *     responses:
 *       200:
 *         description: List of discussions
 *   post:
 *     summary: Create a new discussion
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Discussion created
 */
router.get("/", discussionController.getAllDiscussions);

/**
 * @swagger
 * /api/discussions/stats:
 *   get:
 *     summary: Get discussion statistics
 *     tags: [Discussions]
 *     responses:
 *       200:
 *         description: Discussion statistics
 */
router.get("/stats", discussionController.getStats);

/**
 * @swagger
 * /api/discussions/{id}:
 *   get:
 *     summary: Get discussion by ID
 *     tags: [Discussions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Discussion details
 */
router.get("/:id", discussionController.getDiscussionById);

router.post("/", discussionController.createDiscussion);
router.put("/:id", discussionController.updateDiscussion);
router.delete("/:id", discussionController.deleteDiscussion);
router.post("/:id/comments", discussionController.addComment);
router.put("/comments/:commentId", discussionController.updateComment);
router.delete("/comments/:commentId", discussionController.deleteComment);
router.post("/:id/view", discussionController.incrementViews);
router.post("/:id/like", discussionController.toggleLikeDiscussion);
router.post(
  "/comments/:commentId/like",
  discussionController.toggleLikeComment
);

export default router;
