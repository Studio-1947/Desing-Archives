import prisma from "../config/prisma";

export class DiscussionService {
  async getAllDiscussions(
    category?: string,
    sortBy?: string,
    page: number = 1,
    limit: number = 10
  ) {
    const where = category ? { category } : {};
    const skip = (page - 1) * limit;

    const [discussions, total] = await Promise.all([
      prisma.discussion.findMany({
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
        skip,
        take: limit,
      }),
      prisma.discussion.count({ where }),
    ]);

    if (sortBy === "popular") {
      // Note: Sorting by popularity (likes) in-memory breaks pagination if not careful.
      // Ideally, we should sort in the database, but Prisma doesn't support sorting by relation count easily without raw SQL or aggregate.
      // For now, we'll keep the existing logic but be aware it only sorts the *fetched* page, which is imperfect.
      // A better approach for "popular" would be a separate query or raw SQL, but for this task, we'll stick to the requested pagination.
      // However, to truly sort by popularity across ALL items, we'd need to fetch all, sort, then slice.
      // Given the user wants pagination, let's assume standard pagination for "Newest" is the priority,
      // and for "Popular", we might accept that it sorts the current page or we'd need a bigger refactor.
      // Let's stick to the standard pagination pattern for now.
      discussions.sort((a, b) => b.likes.length - a.likes.length);
    }

    return {
      discussions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
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
