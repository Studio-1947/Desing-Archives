import { Request, Response } from "express";
import { ChallengeService } from "../services/challenge.service";

const challengeService = new ChallengeService();

export class ChallengeController {
  async getAllChallenges(req: Request, res: Response) {
    try {
      const { type } = req.query;
      const challenges = await challengeService.getAllChallenges(
        type as string
      );
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Error fetching challenges", error });
    }
  }

  async getChallengeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const challenge = await challengeService.getChallengeById(id);

      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }

      res.json(challenge);
    } catch (error) {
      res.status(500).json({ message: "Error fetching challenge", error });
    }
  }

  async createChallenge(req: Request, res: Response) {
    try {
      const newChallenge = await challengeService.createChallenge(req.body);
      res.status(201).json(newChallenge);
    } catch (error) {
      res.status(500).json({ message: "Error creating challenge", error });
    }
  }

  async updateChallenge(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedChallenge = await challengeService.updateChallenge(
        id,
        req.body
      );

      if (!updatedChallenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }

      res.json(updatedChallenge);
    } catch (error) {
      res.status(500).json({ message: "Error updating challenge", error });
    }
  }

  async deleteChallenge(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await challengeService.deleteChallenge(id);

      if (!deleted) {
        return res.status(404).json({ message: "Challenge not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting challenge", error });
    }
  }

  async registerParticipant(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId } = req.body; // In a real app, get from auth middleware

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const participant = await challengeService.registerParticipant(
        userId,
        id
      );
      res.status(201).json(participant);
    } catch (error) {
      res.status(500).json({ message: "Error registering participant", error });
    }
  }

  async getParticipantStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const status = await challengeService.getParticipantStatus(
        userId as string,
        id
      );
      res.json({ status });
    } catch (error) {
      res.status(500).json({ message: "Error fetching status", error });
    }
  }

  async incrementViews(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const ipAddress = req.ip || req.socket.remoteAddress;

      await challengeService.incrementViews(id, userId, ipAddress as string);
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ message: "Error incrementing views", error });
    }
  }
  async getStats(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const stats = await challengeService.getChallengeStats(id);

      if (!stats) {
        return res.status(404).json({ message: "Challenge not found" });
      }

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Error fetching stats", error });
    }
  }
}
