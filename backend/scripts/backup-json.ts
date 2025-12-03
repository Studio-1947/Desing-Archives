import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const backupDir = path.join(__dirname, '../backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  const date = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
  const backupFile = path.join(backupDir, `backup-${date}.json`);

  console.log('Starting JSON backup...');

  try {
    const data: Record<string, any> = {};
    
    // Dynamically backup all models defined in the Prisma schema
    // This ensures new tables are automatically included in future backups
    // @ts-ignore - Prisma.ModelName is available in the generated client
    const modelNames = Object.values(Prisma.ModelName || {});

    if (modelNames.length === 0) {
       // Fallback if ModelName is not available (older prisma versions)
       // But for 5.22 it should be there. 
       // We can also try to inspect the prisma instance properties
       console.warn("Could not dynamically find models, falling back to manual list if needed or empty.");
    }

    for (const model of modelNames as string[]) {
      const modelKey = model.charAt(0).toLowerCase() + model.slice(1);
      if ((prisma as any)[modelKey] && typeof (prisma as any)[modelKey].findMany === 'function') {
        console.log(`Backing up ${model}...`);
        data[modelKey] = await (prisma as any)[modelKey].findMany();
      }
    }

    fs.writeFileSync(backupFile, JSON.stringify(data, null, 2));
    console.log(`Backup completed successfully: ${backupFile}`);
  } catch (error) {
    console.error('Backup failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
