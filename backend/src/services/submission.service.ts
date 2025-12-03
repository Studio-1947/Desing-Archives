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

  async createSubmission(data: { challengeId: string; userId: string; fileUrl: string; description?: string }) {
    return prisma.submission.create({
      data: {
        ...data,
        status: 'pending',
      },
    });
  }

  async getPendingSubmissions() {
    return prisma.submission.findMany({
      where: {
        status: 'pending',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            picture: true,
          },
        },
        challenge: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async gradeSubmission(id: string, scores: { creativity: number; technical: number; adherence: number }) {
    const { creativity, technical, adherence } = scores;

    // Validate scores
    if (
      creativity < 0 || creativity > 100 ||
      technical < 0 || technical > 100 ||
      adherence < 0 || adherence > 100
    ) {
      throw new Error('Scores must be between 0 and 100');
    }

    // Check if submission exists
    const submission = await prisma.submission.findUnique({ where: { id } });
    if (!submission) {
      throw new Error('Submission not found');
    }

    const totalScore = (creativity + technical + adherence) / 3;
    
    return prisma.submission.update({
      where: { id },
      data: {
        ...scores,
        totalScore,
        status: 'graded',
      },
    });
  }
}
