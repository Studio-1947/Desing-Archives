import prisma from "../config/prisma";
import fs from "fs";
import path from "path";
import { Prisma } from "@prisma/client";

export class BackupService {
  static async performBackup() {
    const backupDir = path.join(__dirname, "../../backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    const date = new Date()
      .toISOString()
      .replace(/:/g, "-")
      .replace(/\..+/, "");
    const backupFile = path.join(backupDir, `backup-${date}.json`);

    console.log(`[BackupService] Starting automated backup...`);

    try {
      const data: Record<string, any> = {};

      // @ts-ignore
      const modelNames = Object.values(Prisma.ModelName || {});

      for (const model of modelNames as string[]) {
        const modelKey = model.charAt(0).toLowerCase() + model.slice(1);
        if (
          (prisma as any)[modelKey] &&
          typeof (prisma as any)[modelKey].findMany === "function"
        ) {
          data[modelKey] = await (prisma as any)[modelKey].findMany();
        }
      }

      fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));
      console.log(
        `[BackupService] Backup completed successfully: ${backupFile}`
      );
      return true;
    } catch (error) {
      console.error("[BackupService] Backup failed:", error);
      return false;
    }
  }
}
