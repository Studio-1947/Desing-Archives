import { MailService } from "../services/mail.service";
import dotenv from "dotenv";

dotenv.config();

const mailService = new MailService();

async function testEmail() {
  try {
    console.log("Testing Welcome Email...");
    await mailService.sendWelcomeEmail({
      name: "Test User",
      email: process.env.EMAIL_USER || "test@example.com", // Send to self for testing
    });
    console.log("Welcome Email Sent!");

    console.log("Testing Reminder Email...");
    await mailService.sendReminderEmail(
      {
        name: "Test User",
        email: process.env.EMAIL_USER || "test@example.com",
      },
      {
        title: "Test Challenge",
        date: "2025-12-25",
      }
    );
    console.log("Reminder Email Sent!");

    console.log("Testing Promotion Email...");
    await mailService.sendPromotionEmail(
      {
        name: "Test User",
        email: process.env.EMAIL_USER || "test@example.com",
      },
      {
        title: "Special Offer",
        content: "This is a test promotion.",
      }
    );
    console.log("Promotion Email Sent!");
  } catch (error) {
    console.error("Test Failed:", error);
  }
}

testEmail();
