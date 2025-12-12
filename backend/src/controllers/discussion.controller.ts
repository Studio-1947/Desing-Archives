import { Request, Response } from "express";
import { DiscussionService } from "../services/discussion.service";

const discussionService = new DiscussionService();

export class DiscussionController {
  async getAllDiscussions(req: Request, res: Response) {
    try {
      const { category } = req.query;
      const discussions = await discussionService.getAllDiscussions(
        category as string
      );
      res.json(discussions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching discussions", error });
    }
  }

  async getDiscussionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const discussion = await discussionService.getDiscussionById(id);

      if (!discussion) {
        return res.status(404).json({ message: "Discussion not found" });
      }

      res.json(discussion);
    } catch (error) {
      res.status(500).json({ message: "Error fetching discussion", error });
    }
  }

  async createDiscussion(req: Request, res: Response) {
    try {
      const discussion = await discussionService.createDiscussion(req.body);
      res.status(201).json(discussion);
    } catch (error) {
      res.status(500).json({ message: "Error creating discussion", error });
    }
  }

  async updateDiscussion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const discussion = await discussionService.updateDiscussion(id, req.body);
      res.json(discussion);
    } catch (error) {
      res.status(500).json({ message: "Error updating discussion", error });
    }
  }

  async deleteDiscussion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await discussionService.deleteDiscussion(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting discussion", error });
    }
  }

  async addComment(req: Request, res: Response) {
    try {
      const { id } = req.params; // discussionId
      const comment = await discussionService.addComment({
        ...req.body,
        discussionId: id,
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: "Error adding comment", error });
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      await discussionService.deleteComment(commentId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting comment", error });
    }
  }

  async incrementViews(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await discussionService.incrementViews(id);
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ message: "Error incrementing views", error });
    }
  }
}
