import { Router } from "express";
import { DiscussionController } from "../controllers/discussion.controller";

const router = Router();
const discussionController = new DiscussionController();

router.get("/", discussionController.getAllDiscussions);
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
