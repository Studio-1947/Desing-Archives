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
router.delete("/comments/:commentId", discussionController.deleteComment);
router.post("/:id/view", discussionController.incrementViews);

export default router;
