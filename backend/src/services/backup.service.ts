import prisma from "../config/prisma";
import fs from "fs";
import path from "path";
import { Prisma } from "@prisma/client";
import { exec } from "child_process";
import { MailService } from "./mail.service";

export class BackupService {
  private static findPgDump(): string {
    // Common installation paths for PostgreSQL on Windows
    const commonPaths = [
      "C:\\Program Files\\PostgreSQL",
      "C:\\Program Files (x86)\\PostgreSQL",
    ];

    // Check if pg_dump is in PATH (simple check)
    // In a real scenario, we might try to run it, but here we'll just look for the file if we can't assume it's in PATH
    // Or we can just iterate through versions in the common paths

    for (const basePath of commonPaths) {
      if (fs.existsSync(basePath)) {
        const versions = fs.readdirSync(basePath);
        for (const version of versions) {
          const pgDumpPath = path.join(basePath, version, "bin", "pg_dump.exe");
          if (fs.existsSync(pgDumpPath)) {
            return `"${pgDumpPath}"`;
          }
        }
      }
    }

    // Fallback to just 'pg_dump' and hope it's in PATH
    return "pg_dump";
  }

  static async performBackup() {
    const backupDir = path.join(__dirname, "../../backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    const date = new Date()
      .toISOString()
      .replace(/:/g, "-")
      .replace(/\..+/, "");

    // 1. Perform SQL Backup using pg_dump
    const sqlBackupFile = path.join(backupDir, `backup-${date}.sql`);
    const databaseUrl = process.env.DATABASE_URL;

    if (databaseUrl) {
      try {
        const pgDumpCmd = this.findPgDump();
        console.log(
          `[BackupService] Starting SQL backup using ${pgDumpCmd}...`
        );

        await new Promise<void>((resolve, reject) => {
          exec(
            `${pgDumpCmd} "${databaseUrl}" -f "${sqlBackupFile}"`,
            (error, stdout, stderr) => {
              if (error) {
                console.error(
                  `[BackupService] SQL Backup failed: ${error.message}`
                );
                reject(error);
                return;
              }
              if (stderr) {
                // pg_dump writes to stderr even on success sometimes (verbose), but usually errors are critical
                // We'll log it but not fail unless error is present
                console.log(`[BackupService] pg_dump output: ${stderr}`);
              }
              resolve();
            }
          );
        });

        console.log(`[BackupService] SQL Backup completed: ${sqlBackupFile}`);

        // Send Email Notification
        const mailService = new MailService();
        await mailService.sendBackupSuccessEmail(sqlBackupFile);
        console.log(`[BackupService] Backup notification email sent.`);
      } catch (error) {
        console.error("[BackupService] SQL Backup process failed:", error);
        // Continue to JSON backup as fallback? Or just return false?
        // We'll continue to JSON backup as a fallback/secondary measure
      }
    } else {
      console.error(
        "[BackupService] DATABASE_URL not defined, skipping SQL backup."
      );
    }

    // 2. Perform JSON Backup (Legacy/Secondary)
    const jsonBackupFile = path.join(backupDir, `backup-${date}.json`);
    console.log(`[BackupService] Starting JSON backup...`);

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

      fs.writeFileSync(jsonBackupFile, JSON.stringify(data, null, 2));
      console.log(
        `[BackupService] JSON Backup completed successfully: ${jsonBackupFile}`
      );
      return true;
    } catch (error) {
      console.error("[BackupService] JSON Backup failed:", error);
      return false;
    }
  }
}
