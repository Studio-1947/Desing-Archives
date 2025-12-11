import { exec } from "child_process";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const backupDir = path.join(__dirname, "../backups");

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

const date = new Date().toISOString().replace(/:/g, "-").replace(/\..+/, "");
const backupFile = path.join(backupDir, `backup-${date}.sql`);
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is not defined in .env");
  process.exit(1);
}

function findPgDump(): string {
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

const pgDumpCmd = findPgDump();
console.log(`Using pg_dump at: ${pgDumpCmd}`);
console.log(`Starting backup to ${backupFile}...`);

exec(
  `${pgDumpCmd} "${databaseUrl}" -f "${backupFile}"`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Backup failed: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`pg_dump stderr: ${stderr}`);
    }
    console.log(`Backup completed successfully: ${backupFile}`);
  }
);
