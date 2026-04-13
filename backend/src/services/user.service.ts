import prisma from "../config/prisma";
import bcrypt from "bcryptjs";

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
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async updateProfile(userId: string, data: { name?: string; picture?: string }) {
    return prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        picture: true,
        role: true,
      },
    });
  }

  async updatePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.password) {
      throw new Error("User not found or password not set");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new Error("Current password doesn't match");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: "Password updated successfully" };
  }
}
