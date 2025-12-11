import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  const challenges = [
    {
      title: "Minimalist Brand Identity",
      description:
        "Create a minimalist brand identity for a sustainable coffee shop. Focus on clean lines, earthy tones, and a modern aesthetic that reflects the brand's commitment to the environment.",
      shortDescription:
        "Design a brand identity for a sustainable coffee shop.",
      status: "active",
      category: ["Branding", "Logo Design"],
      organizer: "Studio 1947",
      prizePool: 500,
      currency: "USD",
      startDate: "2025-01-01",
      endDate: "2025-01-15",
      imageUrl:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop",
      difficulty: "Intermediate",
      tags: ["branding", "minimalism", "coffee"],
      overview: {
        brief:
          "The goal is to create a cohesive brand identity that appeals to eco-conscious consumers.",
        deliverables: [
          "Logo",
          "Color Palette",
          "Typography",
          "Packaging Mockup",
        ],
        criteria: ["Originality", "Relevance", "Execution"],
        schedule: [
          { phase: "Submission", date: "2025-01-01 - 2025-01-15" },
          { phase: "Judging", date: "2025-01-16 - 2025-01-20" },
          { phase: "Winners Announced", date: "2025-01-21" },
        ],
      },
      rules: [
        "Original work only",
        "No AI generated content",
        "Submit in PDF format",
      ],
      assets: [
        {
          name: "Brand Guidelines Template",
          url: "https://example.com/template.pdf",
        },
      ],
    },
    {
      title: "Futuristic UI Dashboard",
      description:
        "Design a futuristic user interface for a space exploration dashboard. Think holograms, dark mode, and data visualization.",
      shortDescription: "Create a UI for a space exploration dashboard.",
      status: "upcoming",
      category: ["UI/UX", "Web Design"],
      organizer: "TechNova",
      prizePool: 1000,
      currency: "USD",
      startDate: "2025-02-01",
      endDate: "2025-02-28",
      imageUrl:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
      difficulty: "Advanced",
      tags: ["ui", "dashboard", "futuristic"],
      overview: {
        brief:
          "Design a dashboard that helps astronauts monitor ship systems and navigation.",
        deliverables: [
          "Dashboard Screen",
          "Navigation Menu",
          "System Status Widgets",
        ],
        criteria: ["Usability", "Aesthetics", "Innovation"],
        schedule: [{ phase: "Submission", date: "2025-02-01 - 2025-02-28" }],
      },
      rules: ["Must include dark mode", "Figma or Sketch files required"],
      assets: [],
    },
    {
      title: "Vintage Poster Design",
      description:
        "Create a vintage-style travel poster for a fictional city. Use retro typography and textures to capture the nostalgia of the 1950s.",
      shortDescription: "Design a vintage travel poster.",
      status: "archived",
      category: ["Illustration", "Print Design"],
      organizer: "RetroArt",
      prizePool: 300,
      currency: "USD",
      startDate: "2024-11-01",
      endDate: "2024-11-30",
      imageUrl:
        "https://images.unsplash.com/photo-1572061489735-485f9f21d7e0?q=80&w=2574&auto=format&fit=crop",
      difficulty: "Beginner",
      tags: ["vintage", "poster", "illustration"],
      overview: {
        brief: "Capture the essence of a fictional city in a retro style.",
        deliverables: ["Poster Design"],
        criteria: ["Style adherence", "Creativity"],
        schedule: [],
      },
      rules: ["Use only provided color palette"],
      assets: [],
    },
  ];

  const archives = [
    {
      title: "JAGDISH",
      type: "Crafts",
      coverImage:
        "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80",
      description:
        "Location: West Bengal. A deep dive into the traditional pottery techniques of Jagdish, preserving centuries-old methods of clay molding and firing.",
      content:
        "Jagdish represents a lineage of potters who have maintained the integrity of their craft despite modern industrial pressures. This archive documents their daily routines, the specific clay mixtures they use, and the cultural significance of their wares in local festivals. The collection includes video interviews, detailed photographs of the firing process, and a catalog of traditional forms.",
      images: [
        "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80",
        "https://images.unsplash.com/photo-1459749411177-3c269fae8e6e?w=800&q=80",
        "https://images.unsplash.com/photo-1505569127510-bde15360d7bf?w=800&q=80",
      ],
    },
    {
      title: "RABI - PLASSEY",
      type: "Innovations",
      coverImage:
        "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&q=80",
      description:
        "Location: Plassey. Documenting the architectural innovations in Plassey, where local materials meet modern needs in sustainable housing.",
      content:
        "In the rural plains of Plassey, a quiet revolution in sustainable architecture is taking place. This archive explores how local builders are adapting traditional bamboo and mud construction techniques to create climate-resilient homes. Through detailed blueprints and interviews with master builders, we uncover the ingenuity behind these low-cost, high-impact structures.",
      images: [
        "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=800&q=80",
        "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&q=80",
        "https://images.unsplash.com/photo-1438786657495-640937046d18?w=800&q=80",
      ],
    },
    {
      title: "RABI - SUNDARBAN",
      type: "Stories",
      coverImage:
        "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&q=80",
      description:
        "Location: Sundarbans. Life on the water: Capturing the oral histories and boat-building traditions of the Sundarbans delta.",
      content:
        "The Sundarbans, a vast network of mangrove forests and waterways, is home to a unique boat-building culture. This archive preserves the oral histories of the boatmen and the intricate craftsmanship involved in constructing vessels that can withstand the tidal shifts. It serves as a testament to human adaptation and the symbiotic relationship with nature.",
      images: [
        "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&q=80",
        "https://images.unsplash.com/photo-1504701954957-2010ec3bbed1?w=800&q=80",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
      ],
    },
    {
      title: "TERRACOTTA TALES",
      type: "Crafts",
      coverImage:
        "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80",
      description:
        "Location: Bishnupur. Exploring the intricate terracotta temples of Bishnupur and the artisans who keep the restoration skills alive.",
      content:
        "Bishnupur is famous for its terracotta temples, but the skills required to maintain them are fading. This archive focuses on the few remaining artisan families who possess the knowledge of creating these intricate clay tiles. It documents their tools, their firing kilns, and the mythological stories depicted in their art.",
      images: [
        "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&q=80",
        "https://images.unsplash.com/photo-1523554888454-84137e72d3ce?w=800&q=80",
        "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=800&q=80",
      ],
    },
    {
      title: "WEAVERS OF PHULIA",
      type: "Crafts",
      coverImage:
        "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80",
      description:
        "Location: Phulia. The rhythm of the loom: A look at the handloom heritage of Phulia and its evolution in contemporary fashion.",
      content:
        "Phulia is synonymous with fine cotton sarees. This archive traces the journey of the thread from spinning to weaving. It highlights the mathematical precision of the Jacquard looms and the creative adaptations weavers are making to stay relevant in a global market. Includes interviews with master weavers and a catalog of traditional motifs.",
      images: [
        "https://images.unsplash.com/photo-1523676060187-f55189a71f5e?w=800&q=80",
        "https://images.unsplash.com/photo-1518640165980-d3e0e2aa6c1e?w=800&q=80",
        "https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=800&q=80",
      ],
    },
    {
      title: "BAMBOO STRUCTURES",
      type: "Innovations",
      coverImage:
        "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=800&q=80",
      description:
        "Location: North East. Sustainable engineering: How bamboo is being used to create earthquake-resistant structures in the North East.",
      content:
        "In the seismic zones of North East India, bamboo is more than a plant; it is a lifeline. This archive documents the engineering properties of bamboo and how it is treated and joined to create flexible, strong structures. It showcases bridges, homes, and community halls that exemplify sustainable indigenous engineering.",
      images: [
        "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80",
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80",
        "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&q=80",
      ],
    },
  ];

  for (const challenge of challenges) {
    const createdChallenge = await prisma.challenge.create({
      data: challenge,
    });
    console.log(`Created challenge with id: ${createdChallenge.id}`);
  }

  for (const archive of archives) {
    const createdArchive = await prisma.archive.create({
      data: archive,
    });
    console.log(`Created archive with id: ${createdArchive.id}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
