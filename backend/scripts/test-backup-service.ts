import { BackupService } from "../src/services/backup.service";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("Testing BackupService...");
  try {
    const result = await BackupService.performBackup();
    console.log("BackupService result:", result);
  } catch (error) {
    console.error("BackupService test failed:", error);
  }
}

main();
