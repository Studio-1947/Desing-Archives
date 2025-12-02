import prisma from '../config/prisma';
import { Challenge } from '../types/challenge.types';

export class ChallengeService {
  async getAllChallenges(type?: string): Promise<Challenge[]> {
    const where: any = type ? { type } : {};
    const challenges = await prisma.challenge.findMany({ where });
    return challenges as unknown as Challenge[];
  }

  async getChallengeById(id: string): Promise<Challenge | undefined> {
    const challenge = await prisma.challenge.findUnique({
      where: { id }
    });
    return challenge as unknown as Challenge | undefined;
  }

  async createChallenge(challengeData: Omit<Challenge, 'id'>): Promise<Challenge> {
    const {
      title, description, shortDescription, status, type, category, organizer,
      prizePool, currency, startDate, endDate, imageUrl, difficulty, tags,
      location, overview, rules, assets
    } = challengeData;

    const challenge = await prisma.challenge.create({
      data: {
        title,
        description,
        shortDescription,
        status,
        type: type || 'standard',
        category,
        organizer,
        prizePool: Number(prizePool) || 0,
        currency,
        startDate,
        endDate,
        imageUrl,
        difficulty,
        tags,
        location,
        overview: overview as any,
        rules,
        assets: assets as any
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
