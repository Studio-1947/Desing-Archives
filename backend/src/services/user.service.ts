import prisma from "../config/prisma";

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
            organizer: true,
          },
        },
      },
      orderBy: {
        joinedAt: "desc",
      },
    });

    return participations;
  }

  async getAllUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        picture: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
