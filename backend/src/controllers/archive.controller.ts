import { Request, Response } from "express";
import { ArchiveService } from "../services/archive.service";

const archiveService = new ArchiveService();

export class ArchiveController {
  async getAllArchives(req: Request, res: Response) {
    try {
      const archives = await archiveService.getAllArchives();
      res.json(archives);
    } catch (error) {
      res.status(500).json({ message: "Error fetching archives", error });
    }
  }

  async getArchiveById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const archive = await archiveService.getArchiveById(id);
      if (!archive) {
        return res.status(404).json({ message: "Archive not found" });
      }
      res.json(archive);
    } catch (error) {
      res.status(500).json({ message: "Error fetching archive", error });
    }
  }

  async createArchive(req: Request, res: Response) {
    try {
      const archive = await archiveService.createArchive(req.body);
      res.status(201).json(archive);
    } catch (error) {
      res.status(500).json({ message: "Error creating archive", error });
    }
  }

  async updateArchive(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const archive = await archiveService.updateArchive(id, req.body);
      res.json(archive);
    } catch (error) {
      res.status(500).json({ message: "Error updating archive", error });
    }
  }

  async deleteArchive(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await archiveService.deleteArchive(id);
      res.json({ message: "Archive deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting archive", error });
    }
  }
}
