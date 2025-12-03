import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const backupDir = path.join(__dirname, '../backups');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

const date = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
const backupFile = path.join(backupDir, `backup-${date}.sql`);
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not defined in .env');
  process.exit(1);
}

console.log(`Starting backup to ${backupFile}...`);

exec(`pg_dump "${databaseUrl}" -f "${backupFile}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Backup failed: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`pg_dump stderr: ${stderr}`);
  }
  console.log(`Backup completed successfully: ${backupFile}`);
});
