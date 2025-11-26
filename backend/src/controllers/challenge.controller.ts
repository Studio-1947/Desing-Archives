import { Request, Response } from 'express';
import { ChallengeService } from '../services/challenge.service';

const challengeService = new ChallengeService();

export class ChallengeController {
  async getAllChallenges(req: Request, res: Response) {
    try {
      const challenges = await challengeService.getAllChallenges();
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching challenges', error });
    }
  }

  async getChallengeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const challenge = await challengeService.getChallengeById(id);
      
      if (!challenge) {
        return res.status(404).json({ message: 'Challenge not found' });
      }
      
      res.json(challenge);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching challenge', error });
    }
  }

  async createChallenge(req: Request, res: Response) {
    try {
      const newChallenge = await challengeService.createChallenge(req.body);
      res.status(201).json(newChallenge);
    } catch (error) {
      res.status(500).json({ message: 'Error creating challenge', error });
    }
  }
}
