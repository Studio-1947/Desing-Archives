import { Router } from "express";
import { submitContactForm } from "../controllers/contact.controller";

const router = Router();

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit a contact form
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: Form submitted
 */
router.post("/", submitContactForm);

export default router;
