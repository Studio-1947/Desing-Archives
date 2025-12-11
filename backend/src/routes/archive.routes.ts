import { Router } from "express";
import { ArchiveController } from "../controllers/archive.controller";

const router = Router();
const archiveController = new ArchiveController();

// Get all archives
router.get("/", (req, res) => archiveController.getAllArchives(req, res));

// Get archive by ID
router.get("/:id", (req, res) => archiveController.getArchiveById(req, res));

// Create a new archive
router.post("/", (req, res) => archiveController.createArchive(req, res));

// Update an archive
router.put("/:id", (req, res) => archiveController.updateArchive(req, res));

// Delete an archive
router.delete("/:id", (req, res) => archiveController.deleteArchive(req, res));

export default router;
