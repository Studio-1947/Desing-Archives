import { Router } from "express";
import { MailController } from "../controllers/mail.controller";

const router = Router();
const mailController = new MailController();

router.post("/reminder", mailController.sendReminder);
router.post("/promotion", mailController.sendPromotion);

export default router;
