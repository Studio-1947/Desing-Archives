import prisma from "../config/prisma";

export class DiscussionService {
  async getAllDiscussions(category?: string) {
    const where = category ? { category } : {};
    return prisma.discussion.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
        _count: {
          select: { comments: true },
        },
      },
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    });
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
}
