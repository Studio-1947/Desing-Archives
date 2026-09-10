'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ComingSoonBadge from '@/components/ComingSoonBadge';
import { ArrowRight, Users, Award, Archive, Sparkles, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    const [archives, setArchives] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArchives();
    }, []);

    const fetchArchives = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/archives`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setArchives(data);
            } else {
                console.error('Expected array of archives but got:', data);
                setArchives([]);
            }
        } catch (error) {
            console.error('Error fetching archives:', error);
        } finally {
            setLoading(false);
        }
    };

    const archiveCount = archives.length;
    const featuredArchive = archives[0];

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-1">
                {/* Hero Section - Two Column Layout */}
                <section className="container mx-auto px-6 py-16 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <div className="animate-fade-in">
                            <div className="inline-block px-4 py-2 border border-gray-900 mb-6">
                                <span className="text-xs tracking-extra-wide uppercase text-gray-900 flex items-center gap-2">
                                    <Sparkles className="w-3 h-3" />
                                    Design Archives by Studio 1947
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                Local Design Wisdom.
                                <span className="block text-gray-600">For Global Impact.</span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                                A platform that discovers young creators, preserves local knowledge, and brings free design-thinking workshops to rural India.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Link
                                    href="/archives"
                                    className="btn-primary-minimal inline-flex items-center justify-center gap-2"
                                >
                                    <span>Explore the Archive</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/workshops"
                                    className="btn-secondary-minimal inline-flex items-center justify-center"
                                >
                                    <span>Join a Workshop</span>
                                </Link>
                            </div>

                            {/* Intro Paragraph */}
                            {/* <div className="mb-12 p-6 bg-gray-50 border-l-4 border-gray-900">
                                <p className="text-gray-700 italic">
                                    &quot;Local Design is a movement shaped by young people, educators, and rural communities. We host design competitions, run hands-on workshops, and build an open archive of local creativity. Everything here is crafted to spark participation, curiosity, and real opportunities for youth.&quot;
                                </p>
                            </div> */}

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-200">
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">{archiveCount}+</p>
                                    <p className="text-xs text-gray-600 uppercase tracking-wide mt-1">Archive Entries</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-gray-300">—</p>
                                    <p className="text-xs text-gray-600 uppercase tracking-wide mt-1 flex items-center gap-2">
                                        Challenges
                                        <ComingSoonBadge />
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Visual Content */}
                        <div className="relative animate-slide-up">
                            {/* Main Featured Image */}
                            <div className="relative h-[500px] border-2 border-gray-900 overflow-hidden group">
                                <Image
                                    src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80"
                                    alt="Featured Design Work"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:pl-64 text-white transform translate-y-0 opacity-100 md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
                                    <p className="text-xs uppercase tracking-extra-wide mb-2">From the Archive</p>
                                    <h3 className="text-xl font-bold">{featuredArchive?.title || 'Local Design Wisdom'}</h3>
                                </div>
                            </div>

                            {/* Floating Stats Cards */}
                            <div className="relative mt-4 md:absolute md:mt-0 md:-bottom-8 md:-left-8 bg-white border-2 border-gray-900 p-6 shadow-lg animate-scale-in hover-lift w-full md:w-auto">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 border border-gray-900">
                                        <Archive className="w-6 h-6 text-gray-900" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">{archiveCount}</p>
                                        <p className="text-xs text-gray-600 uppercase tracking-wide">Archive Entries</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-4 right-4 md:-top-8 md:-right-8 bg-gray-900 text-white p-6 shadow-lg animate-scale-in hover-lift" style={{ animationDelay: '0.2s' }}>
                                <div className="flex items-center gap-3">
                                    <div className="p-3 border border-white">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Challenges</p>
                                        <ComingSoonBadge className="border-white/40 text-white/80 mt-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trusted By Section */}
                <section className="border-y border-gray-200 bg-gray-50 py-12">
                    <div className="container mx-auto px-6">
                        <p className="text-xs text-gray-500 uppercase tracking-extra-wide text-center mb-8">Trusted By</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
                            <div className="text-2xl font-bold tracking-tight">STUDIO 1947</div>
                            <div className="text-2xl font-bold tracking-tight">DESIGN INDIA</div>
                            <div className="text-2xl font-bold tracking-tight">CRAFT COUNCIL</div>
                            <div className="text-2xl font-bold tracking-tight">TYPE FOUNDRY</div>
                        </div>
                    </div>
                </section>

                {/* Design Challenges */}
                <section className="container mx-auto px-6 py-24">
                    <div className="border-2 border-dashed border-gray-300 px-8 py-16 md:px-16 flex flex-col items-center text-center gap-4">
                        <ComingSoonBadge className="text-xs px-3 py-1" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Design Challenges
                        </h2>
                        <p className="text-gray-600 leading-relaxed max-w-xl">
                            We&apos;re building a real challenge cycle — timed briefs, submissions,
                            and a leaderboard. Nothing&apos;s live yet, so there&apos;s nothing to show here.
                            In the meantime, explore what&apos;s already in the Archive.
                        </p>
                        <Link
                            href="/archives"
                            className="btn-underline mt-2"
                        >
                            <span>Explore the Archive</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </section>

                {/* Why Design Archives - Two Column */}
                <section className="bg-gray-50 border-y border-gray-200">
                    <div className="container mx-auto px-6 py-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Left - Content */}
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                                    Why Design Archives?
                                </h2>
                                <div className="space-y-8">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 border-2 border-gray-900 flex items-center justify-center">
                                            <Target className="w-6 h-6 text-gray-900" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Cultural Heritage</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                Celebrate and preserve local design wisdom while creating work that resonates globally.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 border-2 border-gray-900 flex items-center justify-center">
                                            <Users className="w-6 h-6 text-gray-900" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Community Driven</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                Connect with designers, share knowledge, and grow together in a supportive environment.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 border-2 border-gray-900 flex items-center justify-center">
                                            <TrendingUp className="w-6 h-6 text-gray-900" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Career Growth</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                Build your portfolio, gain recognition, and win prizes while solving real design challenges.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Stats Grid */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="border-2 border-gray-900 bg-gray-900 text-white p-8 text-center hover:bg-gray-800 transition-all duration-300 hover-lift">
                                    <Archive className="w-8 h-8 mx-auto mb-4" />
                                    <p className="text-4xl font-bold mb-2">{archiveCount}</p>
                                    <p className="text-xs uppercase tracking-wide opacity-80">Archive Entries</p>
                                </div>

                                <div className="border-2 border-gray-200 p-8 text-center hover:border-gray-900 transition-all duration-300 hover-lift flex flex-col items-center justify-center gap-3">
                                    <Award className="w-8 h-8 text-gray-300" />
                                    <p className="text-sm font-bold text-gray-900">Design Challenges</p>
                                    <ComingSoonBadge />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What We Do Section */}
                <section className="bg-gray-50 border-y border-gray-200">
                    <div className="container mx-auto px-6 py-24">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                What We Do
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Local Design focuses on three core efforts that strengthen creative culture across India.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {/* Card 1 */}
                            <div className="bg-white p-8 border border-gray-200 hover:border-gray-900 transition-colors duration-300 group">
                                <div className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center mb-6 text-xl font-bold">1</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Competitions & Awards</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    We run design challenges that invite students and young creators to solve real problems, imagine better futures, and express their creativity. Winners receive recognition, mentorship, and a platform to showcase their work.
                                </p>
                                <div className="text-sm font-bold text-gray-900 uppercase tracking-wide">+ Board of Evaluation</div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white p-8 border border-gray-200 hover:border-gray-900 transition-colors duration-300 group">
                                <div className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center mb-6 text-xl font-bold">2</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Workshops for Rural Communities</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We bring accessible design-thinking workshops to small towns and villages. Youth learn problem-solving, teamwork, communication, and hands-on creative skills, all without any cost.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white p-8 border border-gray-200 hover:border-gray-900 transition-colors duration-300 group">
                                <div className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center mb-6 text-xl font-bold">3</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Archiving Local Design Knowledge</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    India’s local wisdom, tools, crafts, and everyday innovations carry deep design value. We collect, document, and preserve these stories to build a public archive that inspires future generations.
                                </p>
                                <div className="text-sm font-bold text-gray-900 uppercase tracking-wide">+ Area of Interest</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="container mx-auto px-6 py-24">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                @ Design Archives
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                Our mission is to create a platform that celebrates design excellence
                                rooted in local wisdom while fostering global collaboration. We empower
                                designers, preserve cultural heritage, and drive innovation through
                                community-driven challenges and archives.
                            </p>
                            <Link
                                href="/about"
                                className="btn-underline"
                            >
                                <span>Learn About Our Mission</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Image Grid */}
                        <div className="grid grid-cols-3 gap-4 mt-12">
                            <div className="relative h-48 border border-gray-200 overflow-hidden group hover-lift">
                                <Image
                                    src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&q=80"
                                    alt="Design Work 1"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <div className="relative h-48 border border-gray-200 overflow-hidden group hover-lift">
                                <Image
                                    src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80"
                                    alt="Design Work 2"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <div className="relative h-48 border border-gray-200 overflow-hidden group hover-lift">
                                <Image
                                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80"
                                    alt="Design Work 3"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Archives Section */}
                <section className="container mx-auto px-6 py-24">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Local Design Archive
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                A growing library of stories, crafts, tools, symbols, materials, and everyday objects that shape local life. Each entry documents how design emerges naturally from culture and community.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {['Community tools and crafts', 'Local innovations', 'Photo and video documentation', 'Oral histories and interviews', 'Student submissions and case studies'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-900 font-medium">
                                        <div className="w-2 h-2 bg-gray-900 rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/archives"
                                className="btn-primary-minimal inline-flex items-center justify-center gap-2"
                            >
                                <span>Explore the Archive</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="relative h-64 border border-gray-200 overflow-hidden group hover:border-gray-900 transition-colors">
                                    <Image
                                        src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80"
                                        alt="Jagdish Archive - Craft"
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                    <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                                        <span className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2">Archive 01</span>
                                        <h4 className="text-xl font-bold text-white">JAGDISH</h4>
                                    </div>
                                </div>
                                <div className="relative h-48 border border-gray-200 overflow-hidden group hover:border-gray-900 transition-colors">
                                    <Image
                                        src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&q=80"
                                        alt="Rabi Plassey Archive - Landscape"
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                    <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                                        <span className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2">Archive 02</span>
                                        <h4 className="text-xl font-bold text-white">RABI - PLASSEY</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 pt-12">
                                <div className="relative h-48 border border-gray-200 overflow-hidden group hover:border-gray-900 transition-colors">
                                    <Image
                                        src="https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&q=80"
                                        alt="Rabi Sundarban Archive - River"
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                    <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                                        <span className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2">Archive 03</span>
                                        <h4 className="text-xl font-bold text-white">RABI - SUNDARBAN</h4>
                                    </div>
                                </div>
                                <div className="relative h-64 border border-gray-200 overflow-hidden group hover:border-gray-900 transition-colors">
                                    {/* Collage Background */}
                                    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                                        <div className="relative w-full h-full">
                                            <Image src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=400&q=80" alt="Collage 1" fill className="object-cover grayscale opacity-60" />
                                        </div>
                                        <div className="relative w-full h-full">
                                            <Image src="https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?w=400&q=80" alt="Collage 2" fill className="object-cover grayscale opacity-60" />
                                        </div>
                                        <div className="relative w-full h-full">
                                            <Image src="https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?w=400&q=80" alt="Collage 3" fill className="object-cover grayscale opacity-60" />
                                        </div>
                                        <div className="relative w-full h-full">
                                            <Image src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=80" alt="Collage 4" fill className="object-cover grayscale opacity-60" />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gray-900/80 group-hover:bg-gray-900/70 transition-colors" />

                                    <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                                        <span className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2">More</span>
                                        <h4 className="text-xl font-bold text-white group-hover:translate-x-1 transition-transform">View Collection →</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Unified CTA Section */}
                <section className="container mx-auto px-6 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Designers CTA */}
                        <div className="border-2 border-gray-900 p-12 text-center relative overflow-hidden group hover:bg-gray-50 transition-colors duration-300">
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Ready to Showcase Your Design?
                                </h2>
                                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                                    Join our community of designers, explore the Archive, and share
                                    work that celebrates creativity and cultural authenticity.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/archives"
                                        className="btn-ripple inline-flex items-center justify-center"
                                    >
                                        <span>Explore the Archive</span>
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href="/submit"
                                        className="btn-magnetic inline-flex items-center justify-center"
                                    >
                                        <span>Submit Your Work</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Partners CTA */}
                        <div className="border-2 border-gray-900 p-12 text-center relative overflow-hidden group hover:bg-gray-900 hover:text-white transition-all duration-300">
                            {/* Animated Background Pattern for Partner Card */}
                            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                                <div className="absolute top-0 left-0 w-full h-full" style={{
                                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, currentColor 50px, currentColor 51px)',
                                }} />
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-6">
                                    Host a Challenge With Us
                                </h2>
                                <p className="text-lg opacity-90 mb-10 leading-relaxed">
                                    Partner with us to run design competitions that solve real problems and discover new talent.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/contact"
                                        className="btn-primary-minimal border-current hover:bg-white hover:text-gray-900 inline-flex items-center justify-center"
                                    >
                                        <span>Start a Challenge</span>
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
