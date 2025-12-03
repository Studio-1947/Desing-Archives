import cron from "node-cron";
import { BackupService } from "../services/backup.service";

export const initCronJobs = () => {
  // Run every day at midnight (0 0 * * *)
  // For testing purposes, you can change this to '* * * * *' to run every minute
  cron.schedule("0 0 * * *", async () => {
    console.log("[Cron] Triggering daily database backup...");
    await BackupService.performBackup();
  });

  console.log("[Cron] Database backup job scheduled for midnight daily.");
};
