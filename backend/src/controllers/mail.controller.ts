import { Request, Response } from "express";
import { MailService } from "../services/mail.service";
import prisma from "../config/prisma";

const mailService = new MailService();

export class MailController {
  async sendReminder(req: Request, res: Response) {
    try {
      const { email, title, date } = req.body;

      if (!email || !title || !date) {
        return res
          .status(400)
          .json({ message: "Email, title, and date are required" });
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await mailService.sendReminderEmail(
        { name: user.name, email },
        { title, date }
      );
      res.json({ message: "Reminder email sent successfully" });
    } catch (error) {
      console.error("Error sending reminder email:", error);
      res.status(500).json({ message: "Failed to send reminder email" });
    }
  }

  async sendPromotion(req: Request, res: Response) {
    try {
      const { email, title, content } = req.body;

      if (!email || !title || !content) {
        return res
          .status(400)
          .json({ message: "Email, title, and content are required" });
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await mailService.sendPromotionEmail(
        { name: user.name, email },
        { title, content }
      );
      res.json({ message: "Promotion email sent successfully" });
    } catch (error) {
      console.error("Error sending promotion email:", error);
      res.status(500).json({ message: "Failed to send promotion email" });
    }
  }
}
