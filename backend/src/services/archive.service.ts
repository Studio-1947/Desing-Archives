import prisma from "../config/prisma";

export class ArchiveService {
  async getAllArchives(page: number = 1, limit: number = 9) {
    const skip = (page - 1) * limit;

    const [archives, total] = await Promise.all([
      prisma.archive.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.archive.count(),
    ]);

    return {
      archives,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async getArchiveById(id: string) {
    return prisma.archive.findUnique({
      where: { id },
    });
  }

  async createArchive(data: {
    title: string;
    description: string;
    content: string;
    coverImage: string;
    images?: string[];
    type?: string;
  }) {
    return prisma.archive.create({
      data: {
        ...data,
        images: data.images || [],
        type: data.type || "story",
      },
    });
  }

  async updateArchive(
    id: string,
    data: {
      title?: string;
      description?: string;
      content?: string;
      coverImage?: string;
      images?: string[];
      type?: string;
    }
  ) {
    return prisma.archive.update({
      where: { id },
      data,
    });
  }

  async deleteArchive(id: string) {
    return prisma.archive.delete({
      where: { id },
    });
  }
}
