import prisma from "../config/prisma";

export class DiscussionService {
  async getAllDiscussions(category?: string, sortBy?: string) {
    const where = category ? { category } : {};
    const discussions = await prisma.discussion.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
        comments: {
          distinct: ["authorId"],
          take: 5,
          select: {
            author: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
          },
        },
        _count: {
          select: { comments: true },
        },
      },
      orderBy: { createdAt: "desc" }, // Default sort
    });

    if (sortBy === "popular") {
      return discussions.sort((a, b) => b.likes.length - a.likes.length);
    }

    return discussions;
  }

  async getDiscussionById(id: string) {
    return prisma.discussion.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
            replies: {
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    picture: true,
                  },
                },
              },
              orderBy: { createdAt: "asc" },
            },
          },
          where: { parentId: null }, // Only fetch top-level comments initially
          orderBy: { createdAt: "asc" },
        },
      },
    });
  }

  async createDiscussion(data: {
    title: string;
    content: string;
    authorId: string;
    category?: string;
    mediaUrls?: string[];
    tags?: string[];
  }) {
    return prisma.discussion.create({
      data,
    });
  }

  async updateDiscussion(
    id: string,
    data: Partial<{
      title: string;
      content: string;
      isPinned: boolean;
      isLocked: boolean;
      category: string;
      mediaUrls: string[];
    }>
  ) {
    return prisma.discussion.update({
      where: { id },
      data,
    });
  }

  async deleteDiscussion(id: string) {
    return prisma.discussion.delete({
      where: { id },
    });
  }

  async addComment(data: {
    content: string;
    authorId: string;
    discussionId: string;
    parentId?: string;
    mediaUrls?: string[];
  }) {
    return prisma.comment.create({
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
      },
    });
  }

  async deleteComment(id: string) {
    return prisma.comment.delete({
      where: { id },
    });
  }

  async incrementViews(id: string) {
    return prisma.discussion.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }

  async toggleLikeDiscussion(id: string, userId: string) {
    const discussion = await prisma.discussion.findUnique({
      where: { id },
      select: { likes: true },
    });

    if (!discussion) throw new Error("Discussion not found");

    const hasLiked = discussion.likes.includes(userId);
    const newLikes = hasLiked
      ? discussion.likes.filter((uid) => uid !== userId)
      : [...discussion.likes, userId];

    return prisma.discussion.update({
      where: { id },
      data: { likes: newLikes },
    });
  }

  async toggleLikeComment(id: string, userId: string) {
    const comment = await prisma.comment.findUnique({
      where: { id },
      select: { likes: true },
    });

    if (!comment) throw new Error("Comment not found");

    const hasLiked = comment.likes.includes(userId);
    const newLikes = hasLiked
      ? comment.likes.filter((uid) => uid !== userId)
      : [...comment.likes, userId];

    return prisma.comment.update({
      where: { id },
      data: { likes: newLikes },
    });
  }

  async updateComment(id: string, content: string) {
    return prisma.comment.update({
      where: { id },
      data: { content },
    });
  }

  async getCommunityStats() {
    const [totalMembers, totalDiscussions, categoryCounts] = await Promise.all([
      prisma.user.count(),
      prisma.discussion.count(),
      prisma.discussion.groupBy({
        by: ["category"],
        _count: {
          category: true,
        },
      }),
    ]);

    return {
      totalMembers,
      totalDiscussions,
      categoryCounts: categoryCounts.map((c) => ({
        name: c.category,
        count: c._count.category,
      })),
    };
  }
}
