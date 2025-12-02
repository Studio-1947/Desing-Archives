import prisma from '../config/prisma';
import { Challenge } from '../types/challenge.types';

export class ChallengeService {
  async getAllChallenges(): Promise<Challenge[]> {
    const challenges = await prisma.challenge.findMany();
    return challenges as unknown as Challenge[];
  }

  async getChallengeById(id: string): Promise<Challenge | undefined> {
    const challenge = await prisma.challenge.findUnique({
      where: { id }
    });
    return challenge as unknown as Challenge | undefined;
  }

  async createChallenge(challengeData: Omit<Challenge, 'id'>): Promise<Challenge> {
    const challenge = await prisma.challenge.create({
      data: {
        ...challengeData,
        overview: challengeData.overview as any,
        assets: challengeData.assets as any
      }
    });
    return challenge as unknown as Challenge;
  }

  async updateChallenge(id: string, challengeData: Partial<Challenge>): Promise<Challenge | null> {
    try {
      const challenge = await prisma.challenge.update({
        where: { id },
        data: {
          ...challengeData,
          overview: challengeData.overview ? (challengeData.overview as any) : undefined,
          assets: challengeData.assets ? (challengeData.assets as any) : undefined
        }
      });
      return challenge as unknown as Challenge;
    } catch (error) {
      return null;
    }
  }

  async deleteChallenge(id: string): Promise<boolean> {
    try {
      await prisma.challenge.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
