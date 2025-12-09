import { PrismaClient } from "@prisma/client";
import { MailService } from "../services/mail.service";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const mailService = new MailService();

async function backfillWelcomeEmails() {
  try {
    console.log("Starting welcome email backfill...");

    // Find all users who haven't received the welcome email
    const users = await prisma.user.findMany({
      where: {
        welcomeEmailSent: false,
      },
    });

    console.log(`Found ${users.length} users to backfill.`);

    for (const user of users) {
      try {
        console.log(`Sending email to ${user.email}...`);
        await mailService.sendWelcomeEmail({
          name: user.name,
          email: user.email,
        });

        // Update user record
        await prisma.user.update({
          where: { id: user.id },
          data: { welcomeEmailSent: true },
        });

        console.log(`Successfully sent to ${user.email}`);
      } catch (error) {
        console.error(`Failed to send to ${user.email}:`, error);
      }
    }

    console.log("Backfill complete!");
  } catch (error) {
    console.error("Backfill failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

backfillWelcomeEmails();
