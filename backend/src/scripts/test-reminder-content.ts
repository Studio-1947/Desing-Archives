import dotenv from "dotenv";
import { MailService } from "../services/mail.service";

dotenv.config();

const mailService = new MailService();

async function main() {
  try {
    console.log("Sending test reminder email with content...");
    await mailService.sendReminderEmail(
      {
        name: "Test User",
        email: process.env.EMAIL_USER || "test@example.com",
      },
      {
        title: "Test Reminder with Content",
        date: "December 25, 2025",
        content: "This is a test content to verify the new feature.",
      }
    );
    console.log("Test reminder email sent successfully!");
  } catch (error) {
    console.error("Error sending test email:", error);
  }
}

main();
