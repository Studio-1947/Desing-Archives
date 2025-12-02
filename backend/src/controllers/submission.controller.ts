import { Request, Response } from 'express';
import { SubmissionService } from '../services/submission.service';

const submissionService = new SubmissionService();

export class SubmissionController {
  async getLeaderboard(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const leaderboard = await submissionService.getLeaderboard(id);
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching leaderboard', error });
    }
  }
}
