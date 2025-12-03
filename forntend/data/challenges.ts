import { Challenge } from '@/types';

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Sustainable Brand Identity Challenge 2024',
    description: 'Create a comprehensive brand identity for an eco-conscious startup. Design a logo, color palette, typography system, and brand guidelines that reflect sustainability and modern design principles. Your work should communicate environmental responsibility while maintaining visual appeal and market competitiveness.',
    shortDescription: 'Design a complete brand identity for a sustainable startup',
    status: 'active',
    category: ['Brand Identity', 'Graphic Design'],
    organizer: 'Studio 1947',
    prizePool: 25000,
    currency: 'INR',
    totalParticipants: 847,
    totalViews: 5234,
    totalSubmissions: 1421,
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    difficulty: 'Intermediate',
    tags: ['branding', 'sustainability', 'logo-design', 'visual-identity'],
    location: 'Delhi, India',
    overview: {
      brief: 'Create a comprehensive brand identity for "EcoLife", a new sustainable lifestyle startup. The brand aims to make sustainable living accessible and stylish for urban millennials. Your design should communicate values of sustainability, modernity, and community.',
      deliverables: [
        'Primary and Secondary Logo',
        'Color Palette with Hex/RGB codes',
        'Typography System (Heading, Body, Accent)',
        'Brand Pattern or Texture',
        '3 Mockups (Packaging, Social Media, Stationery)'
      ],
      criteria: [
        { title: 'Creativity & Originality', weight: 30, description: 'Uniqueness of the concept and visual execution.' },
        { title: 'Relevance to Brief', weight: 30, description: 'How well the design communicates sustainability and appeals to the target audience.' },
        { title: 'Technical Execution', weight: 20, description: 'Quality of craftsmanship, typography, and layout.' },
        { title: 'Versatility', weight: 20, description: 'How well the identity works across different mediums and scales.' }
      ],
      schedule: [
        { phase: 'Phase 1: Draft & Planning', date: '2024-01-15 - 2024-06-30', objectives: [], deliverables: [] },
        { phase: 'Phase 2: Final Design', date: '2024-07-01 - 2024-12-31', objectives: [], deliverables: [] },
        { phase: 'Final Judging', date: '2025-01-01 - 2025-01-15', objectives: [], deliverables: [] },
        { phase: 'Winners Announced', date: '2025-01-20', objectives: [], deliverables: [] },
        { phase: 'Award Distribution', date: '2025-01-25', objectives: [], deliverables: [] }
      ]
    },
    rules: [
      'All work must be original and created specifically for this challenge.',
      'Use of AI-generated imagery must be disclosed and constitutes less than 50% of the final design.',
      'Participants retain ownership of their work but grant Studio 1947 a license to showcase it.',
      'Teams of up to 3 members are allowed.'
    ],
    assets: [
      { name: 'Challenge Brief.pdf', type: 'pdf', url: '#', size: '2.4 MB' },
      { name: 'EcoLife Brand Assets.zip', type: 'zip', url: '#', size: '15 MB' },
      { name: 'Moodboard Template.fig', type: 'fig', url: '#', size: '5 MB' }
    ]
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Redesign Competition',
    description: 'Reimagine the user experience for a popular food delivery app. Focus on improving navigation, reducing cognitive load, and creating delightful micro-interactions. Submissions should include user research, wireframes, high-fidelity mockups, and a clickable prototype.',
    shortDescription: 'Redesign a food delivery app with better UX',
    status: 'active',
    category: ['UI/UX Design', 'Product Design'],
    organizer: 'Design Community India',
    prizePool: 50000,
    currency: 'INR',
    totalParticipants: 1256,
    totalViews: 8934,
    totalSubmissions: 2341,
    startDate: '2024-02-01',
    endDate: '2024-11-30',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    difficulty: 'Advanced',
    tags: ['mobile-design', 'ux-research', 'prototyping', 'user-interface'],
    location: 'Mumbai, India',
    overview: {
      brief: 'Redesign the "FoodieExpress" app to improve user retention and ease of use. The current app has high drop-off rates during checkout. Your goal is to streamline the flow and make the experience delightful.',
      deliverables: [
        'User Research Summary',
        'User Flow Diagram',
        'Low-fidelity Wireframes',
        'High-fidelity UI Screens (Home, Menu, Cart, Checkout, Tracking)',
        'Interactive Prototype Link'
      ],
      criteria: [
        { title: 'UX Problem Solving', weight: 40, description: 'Effectiveness of the solution in addressing the drop-off issue.' },
        { title: 'Visual Design', weight: 30, description: 'Aesthetics, consistency, and use of modern UI trends.' },
        { title: 'Interaction Design', weight: 20, description: 'Quality of micro-interactions and transitions.' },
        { title: 'Presentation', weight: 10, description: 'Clarity and storytelling in the case study.' }
      ],
      schedule: [
        { phase: 'Phase 1: Draft & Planning', date: '2024-02-01 - 2024-06-30', objectives: [], deliverables: [] },
        { phase: 'Phase 2: Final Design', date: '2024-07-01 - 2024-11-30', objectives: [], deliverables: [] },
        { phase: 'Community Voting', date: '2024-12-01 - 2024-12-10', objectives: [], deliverables: [] },
        { phase: 'Results', date: '2024-12-15', objectives: [], deliverables: [] },
        { phase: 'Award Distribution', date: '2024-12-20', objectives: [], deliverables: [] }
      ]
    },
    rules: [
      'Redesign must be based on the provided "FoodieExpress" brief.',
      'Submissions must include both mobile (iOS/Android) screens.',
      'Prototype must be accessible via a public link (Figma/ProtoPie/etc.).'
    ],
    assets: [
      { name: 'Current App Screenshots.zip', type: 'zip', url: '#', size: '45 MB' },
      { name: 'User Persona Data.pdf', type: 'pdf', url: '#', size: '1.2 MB' }
    ]
  },
  {
    id: '3',
    title: 'Cultural Festival Poster Design Challenge',
    description: 'Design a series of posters for a traditional Indian cultural festival. Blend contemporary design aesthetics with cultural heritage. Create visually striking posters that honor tradition while appealing to modern audiences. Submit 3 poster designs in different sizes.',
    shortDescription: 'Create modern posters for traditional cultural festival',
    status: 'active',
    category: ['Graphic Design', 'Illustration'],
    organizer: 'Rajkamal Prakashan',
    prizePool: 15000,
    currency: 'INR',
    totalParticipants: 634,
    totalViews: 3892,
    totalSubmissions: 987,
    startDate: '2024-03-01',
    endDate: '2024-12-15',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80',
    difficulty: 'Beginner',
    tags: ['poster-design', 'cultural-design', 'typography', 'illustration'],
    location: 'Jaipur, India',
    overview: {
      brief: 'Design a series of posters for a traditional Indian cultural festival. Blend contemporary design aesthetics with cultural heritage.',
      deliverables: ['3 Poster Designs (A3 size)', 'Design Rationale'],
      criteria: [
        { title: 'Cultural Relevance', weight: 40, description: 'Authentic representation of the culture.' },
        { title: 'Visual Impact', weight: 40, description: 'Aesthetic appeal and composition.' },
        { title: 'Modernity', weight: 20, description: 'Contemporary interpretation.' }
      ],
      schedule: [
        { phase: 'Phase 1: Draft & Planning', date: '2024-03-01 - 2024-07-31', objectives: [], deliverables: [] },
        { phase: 'Phase 2: Final Design', date: '2024-08-01 - 2024-12-15', objectives: [], deliverables: [] },
        { phase: 'Final Judging', date: '2024-12-16 - 2024-12-25', objectives: [], deliverables: [] },
        { phase: 'Winners Announced', date: '2024-12-30', objectives: [], deliverables: [] },
        { phase: 'Award Distribution', date: '2025-01-05', objectives: [], deliverables: [] }
      ]
    },
    rules: ['Original artwork only.', 'Must include festival dates and location placeholders.'],
    assets: []
  },
  {
    id: '4',
    title: 'Typography Exploration: Indian Scripts',
    description: 'Explore the beauty of Indian scripts through modern typography design. Create a typeface or typographic artwork that celebrates Devanagari, Tamil, Bengali, or other Indian scripts. Focus on readability, cultural authenticity, and contemporary application.',
    shortDescription: 'Design modern typography using Indian scripts',
    status: 'upcoming',
    category: ['Typography', 'Graphic Design'],
    organizer: 'Type Foundry Collective',
    prizePool: 30000,
    currency: 'INR',
    totalParticipants: 0,
    totalViews: 2156,
    totalSubmissions: 0,
    startDate: '2024-12-01',
    endDate: '2025-03-31',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
    difficulty: 'Advanced',
    tags: ['typography', 'indian-scripts', 'typeface-design', 'devanagari'],
    location: 'Bangalore, India',
    overview: {
      brief: 'Explore the beauty of Indian scripts through modern typography design. Create a typeface or typographic artwork.',
      deliverables: ['Typeface Specimen', 'Usage Examples'],
      criteria: [
        { title: 'Legibility', weight: 30, description: 'Readability of the script.' },
        { title: 'Innovation', weight: 40, description: 'Creative approach to traditional scripts.' },
        { title: 'Technical Quality', weight: 30, description: 'Precision of curves and spacing.' }
      ],
      schedule: [
        { phase: 'Phase 1: Draft & Planning', date: '2024-12-01 - 2025-01-31', objectives: [], deliverables: [] },
        { phase: 'Phase 2: Final Design', date: '2025-02-01 - 2025-03-31', objectives: [], deliverables: [] },
        { phase: 'Final Judging', date: '2025-04-01 - 2025-04-10', objectives: [], deliverables: [] },
        { phase: 'Winners Announced', date: '2025-04-15', objectives: [], deliverables: [] },
        { phase: 'Award Distribution', date: '2025-04-20', objectives: [], deliverables: [] }
      ]
    },
    rules: ['Must support at least one Indian script.', 'Open source license preferred.'],
    assets: []
  },
  {
    id: '5',
    title: 'Social Impact Campaign Design',
    description: 'Create a visual campaign for a social cause of your choice. Design posters, social media graphics, and promotional materials that drive awareness and action. Your work should be emotionally compelling, visually cohesive, and culturally sensitive.',
    shortDescription: 'Design a complete visual campaign for social impact',
    status: 'active',
    category: ['Graphic Design', 'Brand Identity'],
    organizer: 'Impact Design Network',
    prizePool: 20000,
    currency: 'INR',
    totalParticipants: 523,
    totalViews: 4123,
    totalSubmissions: 876,
    startDate: '2024-04-01',
    endDate: '2024-12-20',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    difficulty: 'Intermediate',
    tags: ['social-impact', 'campaign-design', 'visual-communication', 'advocacy'],
    location: 'Kolkata, India',
    overview: {
      brief: 'Create a visual campaign for a social cause of your choice. Design posters, social media graphics, and promotional materials.',
      deliverables: ['Campaign Strategy', 'Visual Assets (Posters, Social Media)'],
      criteria: [
        { title: 'Impact', weight: 40, description: 'Potential to drive awareness.' },
        { title: 'Cohesion', weight: 30, description: 'Consistency across assets.' },
        { title: 'Empathy', weight: 30, description: 'Sensitive handling of the subject.' }
      ],
      schedule: [
        { phase: 'Phase 1: Draft & Planning', date: '2024-04-01 - 2024-08-31', objectives: [], deliverables: [] },
        { phase: 'Phase 2: Final Design', date: '2024-09-01 - 2024-12-20', objectives: [], deliverables: [] },
        { phase: 'Final Judging', date: '2024-12-21 - 2024-12-30', objectives: [], deliverables: [] },
        { phase: 'Winners Announced', date: '2025-01-05', objectives: [], deliverables: [] },
        { phase: 'Award Distribution', date: '2025-01-10', objectives: [], deliverables: [] }
      ]
    },
    rules: ['Must address a real social issue.', 'Respectful representation required.'],
    assets: []
  },
  {
    id: '6',
    title: 'Motion Graphics: Brand Story Animation',
    description: 'Create a 30-second motion graphics piece that tells a brand story. Use animation, typography, and visual effects to create an engaging narrative. Focus on smooth transitions, compelling storytelling, and professional execution.',
    shortDescription: 'Animate a 30-second brand story',
    status: 'active',
    category: ['Motion Design', 'Graphic Design'],
    organizer: 'Animation Guild India',
    prizePool: 40000,
    currency: 'INR',
    totalParticipants: 412,
    totalViews: 3456,
    totalSubmissions: 678,
    startDate: '2024-05-01',
    endDate: '2025-01-31',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
    difficulty: 'Advanced',
    tags: ['motion-graphics', 'animation', 'storytelling', 'after-effects'],
    location: 'Pune, India',
    overview: {
      brief: 'Create a 30-second motion graphics piece that tells a brand story. Use animation, typography, and visual effects.',
      deliverables: ['30s Animation (MP4)', 'Storyboard'],
      criteria: [
        { title: 'Storytelling', weight: 40, description: 'Narrative flow and engagement.' },
        { title: 'Animation Quality', weight: 40, description: 'Smoothness and timing.' },
        { title: 'Sound Design', weight: 20, description: 'Audio integration.' }
      ],
      schedule: [
        { phase: 'Phase 1: Draft & Planning', date: '2024-05-01 - 2024-09-30', objectives: [], deliverables: [] },
        { phase: 'Phase 2: Final Design', date: '2024-10-01 - 2025-01-31', objectives: [], deliverables: [] },
        { phase: 'Final Judging', date: '2025-02-01 - 2025-02-10', objectives: [], deliverables: [] },
        { phase: 'Winners Announced', date: '2025-02-15', objectives: [], deliverables: [] },
        { phase: 'Award Distribution', date: '2025-02-20', objectives: [], deliverables: [] }
      ]
    },
    rules: ['Duration must be exactly 30 seconds.', 'Royalty-free music only.'],
    assets: []
  },
  {
    id: '7',
    title: 'Website Redesign: Local Business',
    description: 'Redesign a website for a local Indian business. Create a modern, responsive web design that improves user experience, showcases products/services effectively, and reflects local culture. Include homepage, product pages, and contact sections.',
    shortDescription: 'Redesign a local business website',
    status: 'archived',
    category: ['Web Design', 'UI/UX Design'],
    organizer: 'Web Designers India',
    prizePool: 35000,
    currency: 'INR',
    totalParticipants: 892,
    totalViews: 6234,
    totalSubmissions: 1456,
    startDate: '2024-01-01',
    endDate: '2024-10-31',
    imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    difficulty: 'Intermediate',
    tags: ['web-design', 'responsive-design', 'local-business', 'ui-design'],
    location: 'Chennai, India',
    overview: {
      brief: 'Redesign a website for a local Indian business. Create a modern, responsive web design that improves user experience.',
      deliverables: ['Homepage Design', 'Product Page Design', 'Mobile View'],
      criteria: [
        { title: 'UX/UI', weight: 40, description: 'Usability and visual appeal.' },
        { title: 'Responsiveness', weight: 30, description: 'Adaptability to different screens.' },
        { title: 'Local Flavor', weight: 30, description: 'Reflection of local culture.' }
      ],
      schedule: [
        { phase: 'Phase 1: Draft & Planning', date: '2024-01-01 - 2024-05-31', objectives: [], deliverables: [] },
        { phase: 'Phase 2: Final Design', date: '2024-06-01 - 2024-10-31', objectives: [], deliverables: [] },
        { phase: 'Final Judging', date: '2024-11-01 - 2024-11-10', objectives: [], deliverables: [] },
        { phase: 'Winners Announced', date: '2024-11-15', objectives: [], deliverables: [] },
        { phase: 'Award Distribution', date: '2024-11-20', objectives: [], deliverables: [] }
      ]
    },
    rules: ['Must be a real local business.', 'Redesign must be significantly different.'],
    assets: []
  },
  {
    id: '8',
    title: 'Packaging Design: Artisan Products',
    description: 'Design packaging for traditional Indian artisan products. Create packaging that protects the product, tells the artisan story, and stands out on shelves. Focus on sustainable materials, cultural authenticity, and modern appeal.',
    shortDescription: 'Create packaging for Indian artisan products',
    status: 'active',
    category: ['Product Design', 'Graphic Design'],
    organizer: 'Craft Council of India',
    prizePool: 28000,
    currency: 'INR',
    totalParticipants: 567,
    totalViews: 4567,
    totalSubmissions: 934,
    startDate: '2024-06-01',
    endDate: '2024-12-31',
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
    difficulty: 'Intermediate',
    tags: ['packaging-design', 'artisan', 'sustainable-design', 'product-design'],
    location: 'Ahmedabad, India',
    overview: {
      brief: 'Standard challenge brief for this category. Please refer to the specific requirements for this challenge.',
      deliverables: ['Final Design Files', 'Presentation Deck'],
      criteria: [
        { title: 'Creativity', weight: 50, description: 'Originality of the idea.' },
        { title: 'Execution', weight: 50, description: 'Quality of the final output.' }
      ],
      schedule: [
        { phase: 'Phase 1: Draft & Planning', date: '2024-06-01 - 2024-09-30', objectives: [], deliverables: [] },
        { phase: 'Phase 2: Final Design', date: '2024-10-01 - 2024-12-31', objectives: [], deliverables: [] },
        { phase: 'Final Judging', date: '2025-01-01 - 2025-01-10', objectives: [], deliverables: [] },
        { phase: 'Winners Announced', date: '2025-01-15', objectives: [], deliverables: [] },
        { phase: 'Award Distribution', date: '2025-01-20', objectives: [], deliverables: [] }
      ]
    },
    rules: ['Standard competition rules apply.'],
    assets: []
  },
];
