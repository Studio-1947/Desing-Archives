import { Router } from "express";
import { ArchiveController } from "../controllers/archive.controller";

const router = Router();
const archiveController = new ArchiveController();

/**
 * @swagger
 * /api/archives:
 *   get:
 *     summary: Get all archives
 *     tags: [Archives]
 *     responses:
 *       200:
 *         description: List of archives
 *   post:
 *     summary: Create a new archive
 *     tags: [Archives]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Archive created
 */
router.get("/", (req, res) => archiveController.getAllArchives(req, res));

/**
 * @swagger
 * /api/archives/{id}:
 *   get:
 *     summary: Get archive by ID
 *     tags: [Archives]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Archive details
 */
router.get("/:id", (req, res) => archiveController.getArchiveById(req, res));

router.post("/", (req, res) => archiveController.createArchive(req, res));
router.put("/:id", (req, res) => archiveController.updateArchive(req, res));
router.delete("/:id", (req, res) => archiveController.deleteArchive(req, res));

export default router;
