import { Router } from "express";
import { MailController } from "../controllers/mail.controller";

const router = Router();
const mailController = new MailController();

/**
 * @swagger
 * /api/mail/reminder:
 *   post:
 *     summary: Send a reminder email
 *     tags: [Mail]
 *     responses:
 *       200:
 *         description: Reminder sent
 */
router.post("/reminder", mailController.sendReminder);

/**
 * @swagger
 * /api/mail/promotion:
 *   post:
 *     summary: Send a promotional email
 *     tags: [Mail]
 *     responses:
 *       200:
 *         description: Promotion sent
 */
router.post("/promotion", mailController.sendPromotion);

export default router;
