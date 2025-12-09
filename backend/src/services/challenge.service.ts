import prisma from "../config/prisma";
import { Challenge } from "../types/challenge.types";
import { getIO } from "../socket";

export class ChallengeService {
  async getAllChallenges(type?: string): Promise<Challenge[]> {
    const where: any = type ? { type } : {};
    const challenges = await prisma.challenge.findMany({ where });
    return challenges as unknown as Challenge[];
  }

  async getChallengeById(id: string): Promise<Challenge | undefined> {
    const challenge = await prisma.challenge.findUnique({
      where: { id },
    });
    return challenge as unknown as Challenge | undefined;
  }

  async createChallenge(
    challengeData: Omit<Challenge, "id">
  ): Promise<Challenge> {
    const {
      title,
      description,
      shortDescription,
      status,
      type,
      category,
      organizer,
      prizePool,
      currency,
      startDate,
      endDate,
      imageUrl,
      difficulty,
      tags,
      location,
      overview,
      rules,
      assets,
    } = challengeData;

    const challenge = await prisma.challenge.create({
      data: {
        title,
        description,
        shortDescription,
        status,
        type: type || "standard",
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
        assets: assets as any,
      },
    });
    return challenge as unknown as Challenge;
  }

  async updateChallenge(
    id: string,
    challengeData: Partial<Challenge>
  ): Promise<Challenge | null> {
    try {
      const challenge = await prisma.challenge.update({
        where: { id },
        data: {
          ...challengeData,
          overview: challengeData.overview
            ? (challengeData.overview as any)
            : undefined,
          assets: challengeData.assets
            ? (challengeData.assets as any)
            : undefined,
        },
      });
      return challenge as unknown as Challenge;
    } catch (error) {
      return null;
    }
  }

  async deleteChallenge(id: string): Promise<boolean> {
    try {
      await prisma.challenge.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async registerParticipant(userId: string, challengeId: string): Promise<any> {
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const participant = await prisma.participant.create({
          data: {
            userId,
            challengeId,
            status: "registered",
          },
        });

        const challenge = await prisma.challenge.update({
          where: { id: challengeId },
          data: {
            totalParticipants: {
              increment: 1,
            },
          },
        });

        return { participant, challenge };
      });

      // Emit socket event
      try {
        const io = getIO();
        io.to(`challenge_${challengeId}`).emit("challenge_updated", {
          type: "participants_update",
          challengeId,
          count: result.challenge.totalParticipants,
        });
      } catch (error) {
        console.error("Socket emission failed:", error);
      }

      return result.participant;
    } catch (error) {
      // Check if already registered
      const existing = await prisma.participant.findUnique({
        where: {
          userId_challengeId: {
            userId,
            challengeId,
          },
        },
      });
      if (existing) return existing;
      throw error;
    }
  }

  async getParticipantStatus(
    userId: string,
    challengeId: string
  ): Promise<string | null> {
    const participant = await prisma.participant.findUnique({
      where: {
        userId_challengeId: {
          userId,
          challengeId,
        },
      },
    });
    return participant ? participant.status : null;
  }

  async incrementViews(
    id: string,
    userId?: string,
    ipAddress?: string
  ): Promise<void> {
    try {
      // If userId is provided, check if user already viewed
      if (userId) {
        try {
          const existingView = await prisma.challengeView.findUnique({
            where: {
              challengeId_userId: {
                challengeId: id,
                userId,
              },
            },
          });

          if (existingView) return;

          await prisma.challengeView.create({
            data: {
              challengeId: id,
              userId,
              ipAddress,
            },
          });
        } catch (error: any) {
          // Handle foreign key constraint violation (invalid userId)
          if (error.code === "P2003") {
            // Fallback to IP tracking if userId is invalid
            if (ipAddress) {
              try {
                await prisma.challengeView.create({
                  data: {
                    challengeId: id,
                    ipAddress,
                  },
                });
              } catch (innerError) {
                // Ignore
              }
            }
          } else {
            throw error;
          }
        }
      } else if (ipAddress) {
        // Optional: Check by IP if no user ID (less reliable but good for anonymous)
        // For now, we just track it without strict uniqueness enforcement for anonymous to avoid IP collisions
        // or implement a simple check if needed.
        // Let's just create the view record for analytics.
        try {
          await prisma.challengeView.create({
            data: {
              challengeId: id,
              ipAddress,
            },
          });
        } catch (error) {
          // Ignore duplicate IP view
        }
      }

      const challenge = await prisma.challenge.update({
        where: { id },
        data: {
          totalViews: {
            increment: 1,
          },
        },
      });

      // Emit socket event
      try {
        const io = getIO();
        io.to(`challenge_${id}`).emit("challenge_updated", {
          type: "views_update",
          challengeId: id,
          count: challenge.totalViews,
        });
      } catch (error) {
        console.error("Socket emission failed:", error);
      }
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  }

  async getChallengeStats(id: string) {
    const challenge = await prisma.challenge.findUnique({
      where: { id },
      select: {
        totalViews: true,
        totalParticipants: true,
      },
    });
    return challenge;
  }
}
