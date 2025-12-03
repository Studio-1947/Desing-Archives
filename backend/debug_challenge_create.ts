
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const challengeData = {
    title: 'Test Challenge',
    description: 'Test Description',
    shortDescription: 'Test Short Description',
    status: 'upcoming',
    category: [],
    organizer: 'Studio 1947',
    prizePool: 0,
    currency: 'INR',
    startDate: '2025-01-01',
    endDate: '2025-02-01',
    imageUrl: 'https://example.com/image.jpg',
    difficulty: 'Intermediate',
    tags: [],
    location: '',
    overview: {
        brief: '',
        deliverables: [],
        criteria: [],
        schedule: []
    },
    rules: [],
    assets: [],
    // type is missing, simulating undefined in frontend
  };

  try {
    console.log('Attempting to create challenge with data:', JSON.stringify(challengeData, null, 2));
    const challenge = await prisma.challenge.create({
      data: {
        ...challengeData,
        overview: challengeData.overview,
        assets: challengeData.assets
      }
    });
    console.log('Challenge created successfully:', challenge);
  } catch (error) {
    console.error('Error creating challenge:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
