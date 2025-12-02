import { PrismaClient } from '@prisma/client';
try {
  const prisma = new PrismaClient();
  console.log('PrismaClient instantiated successfully');
} catch (e) {
  console.error(e);
}
