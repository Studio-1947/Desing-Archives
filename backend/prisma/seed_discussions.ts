import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding discussions...");

  // Ensure we have a user to attribute these to
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: "demo@designarchive.com",
        name: "Demo User",
        password: "password123", // In a real app, hash this
        picture:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    });
  }

  const discussions = [
    {
      title: "The Future of Brutalism in Web Design",
      content:
        "Brutalism has been making a comeback. Is it here to stay or just a passing trend? Let's discuss the implications for UX and accessibility.",
      category: "General",
      mediaUrls: [
        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
      ],
      tags: ["brutalism", "web-design", "trends"],
      views: 1240,
      likes: ["user1", "user2", "user3"], // Mock user IDs
    },
    {
      title: "Best Fonts for minimal portfolios?",
      content:
        "I'm building a new portfolio and looking for clean, sans-serif fonts that aren't Inter or Roboto. Any hidden gems?",
      category: "Design Help",
      mediaUrls: [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
      ],
      tags: ["typography", "portfolio", "minimalism"],
      views: 856,
      likes: ["user1", "user4"],
    },
    {
      title: "Showcase: Rebranding for a local coffee shop",
      content:
        "Just finished this project. Went for a warm, earthy vibe. Feedback appreciated!",
      mediaUrls: [
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974&auto=format&fit=crop",
      ],
      category: "Showcase",
      tags: ["branding", "logo-design", "coffee"],
      views: 2100,
      likes: ["user1", "user2", "user3", "user4", "user5"],
    },
    {
      title: "Free 3D Abstract Shapes Pack",
      content:
        "I created some 3D shapes in Blender and decided to give them away for free. Link in comments!",
      category: "Resources",
      mediaUrls: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
      ],
      tags: ["3d", "resources", "freebie"],
      views: 3400,
      likes: ["user2", "user5"],
    },
    {
      title: "Senior Product Designer at TechFlow",
      content:
        "We are looking for a Senior Product Designer to join our remote team. Apply now!",
      category: "Jobs",
      mediaUrls: [
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
      ],
      tags: ["hiring", "remote", "product-design"],
      views: 560,
      likes: [],
    },
    {
      title: "Understanding Color Theory in UI",
      content:
        "A deep dive into how color affects user perception and behavior.",
      category: "Resources",
      mediaUrls: [
        "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=2070&auto=format&fit=crop",
      ],
      tags: ["color-theory", "ui", "education"],
      views: 1500,
      likes: ["user1", "user3"],
    },
    {
      title: "Help with Figma Auto Layout",
      content:
        "I'm struggling to get this card component to resize correctly. Can someone take a look?",
      category: "Design Help",
      mediaUrls: [
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
      ],
      tags: ["figma", "auto-layout", "help"],
      views: 320,
      likes: ["user4"],
    },
    {
      title: "Typography Trends for 2026",
      content: "What do you think will be the next big thing in typography?",
      category: "General",
      mediaUrls: [
        "https://images.unsplash.com/photo-1555445054-8488d05dc515?q=80&w=2070&auto=format&fit=crop",
      ],
      tags: ["typography", "trends", "discussion"],
      views: 980,
      likes: ["user2", "user3"],
    },
    {
      title: "My First Framer Site",
      content:
        "Finally took the plunge and built my portfolio in Framer. It's surprisingly intuitive!",
      category: "Showcase",
      mediaUrls: [
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop",
      ],
      tags: ["framer", "nocode", "portfolio"],
      views: 1100,
      likes: ["user1", "user5"],
    },
    {
      title: "Icon Set: 50+ Minimal Icons",
      content:
        "Another week, another icon set. Hope you find these useful for your wireframes.",
      category: "Resources",
      mediaUrls: [
        "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=2070&auto=format&fit=crop",
      ],
      tags: ["icons", "minimal", "svg"],
      views: 2300,
      likes: ["user1", "user2", "user3", "user4"],
    },
  ];

  for (const discussion of discussions) {
    await prisma.discussion.create({
      data: {
        ...discussion,
        authorId: user.id,
      },
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
