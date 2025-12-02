import { Request, Response } from 'express';
import { SubmissionService } from '../services/submission.service';

const submissionService = new SubmissionService();

export class SubmissionController {
  async getLeaderboard(req: Request, res: Response) {
    try {
      const { challengeId } = req.params;
      const leaderboard = await submissionService.getLeaderboard(challengeId);
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching leaderboard', error });
    }
  }

  async createSubmission(req: Request, res: Response) {
    try {
      const submission = await submissionService.createSubmission(req.body);
      res.status(201).json(submission);
    } catch (error) {
      res.status(500).json({ message: 'Error creating submission', error });
    }
  }

  async getPendingSubmissions(req: Request, res: Response) {
    try {
      const submissions = await submissionService.getPendingSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching pending submissions', error });
    }
  }

  async gradeSubmission(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const scores = req.body;
      const submission = await submissionService.gradeSubmission(id, scores);
      res.json(submission);
    } catch (error: any) {
      if (error.message === 'Submission not found') {
        res.status(404).json({ message: error.message });
      } else if (error.message === 'Scores must be between 0 and 100') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error grading submission', error: error.message });
      }
    }
  }
}
