import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { MailService } from "../services/mail.service";

const prisma = new PrismaClient();
const mailService = new MailService();

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    // Send email notification
    await mailService.sendContactSubmissionEmail({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({ message: "Message sent successfully", submission });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};
