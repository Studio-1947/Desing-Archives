
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.challenge.count();
    console.log(`Total challenges in DB: ${count}`);
    
    if (count > 0) {
      const challenges = await prisma.challenge.findMany({ take: 3 });
      console.log('Sample challenges:', JSON.stringify(challenges, null, 2));
    }
  } catch (error) {
    console.error('Error checking challenges:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
