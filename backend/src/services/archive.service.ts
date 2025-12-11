import prisma from "../config/prisma";

export class ArchiveService {
  async getAllArchives() {
    return prisma.archive.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
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
