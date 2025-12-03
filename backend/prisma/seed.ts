import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  const challenges = [
    {
      title: 'Minimalist Brand Identity',
      description: 'Create a minimalist brand identity for a sustainable coffee shop. Focus on clean lines, earthy tones, and a modern aesthetic that reflects the brand\'s commitment to the environment.',
      shortDescription: 'Design a brand identity for a sustainable coffee shop.',
      status: 'active',
      category: ['Branding', 'Logo Design'],
      organizer: 'Studio 1947',
      prizePool: 500,
      currency: 'USD',
      startDate: '2025-01-01',
      endDate: '2025-01-15',
      imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop',
      difficulty: 'Intermediate',
      tags: ['branding', 'minimalism', 'coffee'],
      overview: {
        brief: 'The goal is to create a cohesive brand identity that appeals to eco-conscious consumers.',
        deliverables: ['Logo', 'Color Palette', 'Typography', 'Packaging Mockup'],
        criteria: ['Originality', 'Relevance', 'Execution'],
        schedule: [
            { phase: 'Submission', date: '2025-01-01 - 2025-01-15' },
            { phase: 'Judging', date: '2025-01-16 - 2025-01-20' },
            { phase: 'Winners Announced', date: '2025-01-21' }
        ]
      },
      rules: ['Original work only', 'No AI generated content', 'Submit in PDF format'],
      assets: [
        { name: 'Brand Guidelines Template', url: 'https://example.com/template.pdf' }
      ]
    },
    {
      title: 'Futuristic UI Dashboard',
      description: 'Design a futuristic user interface for a space exploration dashboard. Think holograms, dark mode, and data visualization.',
      shortDescription: 'Create a UI for a space exploration dashboard.',
      status: 'upcoming',
      category: ['UI/UX', 'Web Design'],
      organizer: 'TechNova',
      prizePool: 1000,
      currency: 'USD',
      startDate: '2025-02-01',
      endDate: '2025-02-28',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
      difficulty: 'Advanced',
      tags: ['ui', 'dashboard', 'futuristic'],
      overview: {
        brief: 'Design a dashboard that helps astronauts monitor ship systems and navigation.',
        deliverables: ['Dashboard Screen', 'Navigation Menu', 'System Status Widgets'],
        criteria: ['Usability', 'Aesthetics', 'Innovation'],
        schedule: [
             { phase: 'Submission', date: '2025-02-01 - 2025-02-28' }
        ]
      },
      rules: ['Must include dark mode', 'Figma or Sketch files required'],
      assets: []
    },
    {
      title: 'Vintage Poster Design',
      description: 'Create a vintage-style travel poster for a fictional city. Use retro typography and textures to capture the nostalgia of the 1950s.',
      shortDescription: 'Design a vintage travel poster.',
      status: 'archived',
      category: ['Illustration', 'Print Design'],
      organizer: 'RetroArt',
      prizePool: 300,
      currency: 'USD',
      startDate: '2024-11-01',
      endDate: '2024-11-30',
      imageUrl: 'https://images.unsplash.com/photo-1572061489735-485f9f21d7e0?q=80&w=2574&auto=format&fit=crop',
      difficulty: 'Beginner',
      tags: ['vintage', 'poster', 'illustration'],
      overview: {
        brief: 'Capture the essence of a fictional city in a retro style.',
        deliverables: ['Poster Design'],
        criteria: ['Style adherence', 'Creativity'],
        schedule: []
      },
      rules: ['Use only provided color palette'],
      assets: []
    }
  ];

  for (const challenge of challenges) {
    const createdChallenge = await prisma.challenge.create({
      data: challenge,
    });
    console.log(`Created challenge with id: ${createdChallenge.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
