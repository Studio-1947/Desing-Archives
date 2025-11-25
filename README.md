# Design Archives by Studio 1947

A minimal, elegant design challenge platform inspired by Studio 1947's aesthetic. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎨 Design Philosophy

**Rooted in Local Wisdom, Designed for Global Impact**

This platform celebrates design excellence through:
- Clean, minimal aesthetic with black/white/gray palette
- Focus on typography and whitespace
- Cultural heritage meets contemporary design
- Community-driven challenges and archives

## ✨ Features

- **Design Challenges**: Browse and participate in curated design competitions
- **Minimal Aesthetic**: Clean, professional design matching Studio 1947's brand
- **Advanced Filtering**: Filter by status, category, and search
- **Challenge Details**: Comprehensive pages with briefs, stats, and leaderboards
- **Responsive Design**: Fully responsive across all devices
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Custom minimal theme)
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Challenge Categories

- Graphic Design
- UI/UX Design
- Brand Identity
- Illustration
- Typography
- Motion Design
- Product Design
- Web Design

## 📁 Project Structure

```
Desing-archives/
├── app/
│   ├── challenges/
│   │   ├── [id]/page.tsx    # Individual challenge pages
│   │   └── page.tsx          # Challenges listing
│   ├── globals.css           # Minimal design system
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/
│   ├── ChallengeCard.tsx     # Minimal challenge card
│   ├── Footer.tsx            # Footer with Studio 1947 branding
│   └── Header.tsx            # Clean navigation header
├── data/
│   └── challenges.ts         # Design challenge data
├── types/
│   └── index.ts              # TypeScript interfaces
└── package.json              # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: Grayscale palette (Gray 50-900)
- **Background**: White (#FFFFFF)
- **Text**: Gray 900 (#111827)
- **Borders**: Gray 200 (#E5E7EB)
- **Accent**: Gray 900 for CTAs

### Typography
- **Font Family**: Inter
- **Weights**: 300, 400, 500, 600, 700
- **Letter Spacing**: Extra wide for uppercase text
- **Style**: Clean, minimal, uppercase for labels

### Components
- Minimal cards with subtle borders
- Grayscale images with color on hover
- Clean button styles (filled & outlined)
- Subtle hover animations
- Focus on whitespace and breathing room

## 🌟 Key Pages

### Homepage (`/`)
- Hero section with Studio 1947 messaging
- Platform statistics
- Featured challenges
- Mission statement
- Call-to-action

### Challenges Page (`/challenges`)
- All challenges listing
- Search functionality
- Status filters (Active, Upcoming, Archived)
- Category filters
- Minimal grid layout

### Challenge Detail Page (`/challenges/[id]`)
- Grayscale hero image
- Challenge brief and description
- Statistics dashboard
- Top participants leaderboard
- Action sidebar with dates

## 🎯 Studio 1947 Integration

This platform is designed and maintained by **Studio 1947**, reflecting our commitment to:
- Local wisdom and cultural heritage
- Global design excellence
- Community empowerment
- Sustainable and innovative solutions

Visit [1947.io](https://www.1947.io) to learn more about our work.

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel
```

## 📝 Future Enhancements

- User authentication and profiles
- Submission system with file uploads
- Community forums and discussions
- Design archives showcase
- Portfolio integration
- Email notifications
- Admin dashboard
- Payment processing

## 🤝 Contributing

We welcome contributions that align with our design philosophy and mission. Please maintain the minimal aesthetic and cultural focus.

## 📄 License

© 2024 Studio 1947. All rights reserved.

---

**Design Archives** - Celebrating creativity rooted in local wisdom, designed for global impact.
