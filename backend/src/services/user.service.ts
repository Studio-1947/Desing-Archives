import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
  async getUserParticipations(userId: string) {
    const participations = await prisma.participant.findMany({
      where: { userId },
      include: {
        challenge: {
          select: {
            id: true,
            title: true,
            status: true,
            imageUrl: true,
            startDate: true,
            endDate: true,
            prizePool: true,
            organizer: true
          }
        }
      },
      orderBy: {
        joinedAt: 'desc'
      }
    });

    return participations;
  }
}
