import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SubmissionService {
  async getLeaderboard(challengeId: string) {
    return prisma.submission.findMany({
      where: {
        challengeId,
      },
      include: {
        user: {
          select: {
            name: true,
            picture: true,
          },
        },
      },
      orderBy: {
        totalScore: 'desc',
      },
    });
  }

  async createSubmission(data: any) {
    return prisma.submission.create({
      data,
    });
  }
}
