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

  async updateChallenge(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedChallenge = await challengeService.updateChallenge(id, req.body);
      
      if (!updatedChallenge) {
        return res.status(404).json({ message: 'Challenge not found' });
      }
      
      res.json(updatedChallenge);
    } catch (error) {
      res.status(500).json({ message: 'Error updating challenge', error });
    }
  }

  async deleteChallenge(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await challengeService.deleteChallenge(id);
      
      if (!deleted) {
        return res.status(404).json({ message: 'Challenge not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting challenge', error });
    }
  }
}
