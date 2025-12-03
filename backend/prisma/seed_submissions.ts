import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get the first challenge and user
  const challenge = await prisma.challenge.findFirst();
  const user = await prisma.user.findFirst();

  if (!challenge || !user) {
    console.log('No challenge or user found. Please seed challenges and users first.');
    return;
  }

  console.log(`Seeding submissions for challenge: ${challenge.title} and user: ${user.name}`);

  const submissions = [
    {
      challengeId: challenge.id,
      userId: user.id,
      creativity: 95,
      technical: 90,
      adherence: 92,
      totalScore: 92.3,
      fileUrl: 'https://example.com/submission1.pdf',
      description: 'My awesome submission',
    },
    {
      challengeId: challenge.id,
      userId: user.id,
      creativity: 88,
      technical: 95,
      adherence: 90,
      totalScore: 91.0,
      fileUrl: 'https://example.com/submission2.zip',
      description: 'Another great design',
    },
  ];

  for (const submission of submissions) {
    await prisma.submission.create({
      data: submission,
    });
  }

  console.log('Submissions seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
