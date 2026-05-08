'use client';

import { useState, useEffect, useRef, use } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import {
    Calendar,
    Loader2,
    MapPin,
    List,
    Twitter,
    Copy,
    Clock,
    User
} from 'lucide-react';
import { Archive } from '@/types/archive';
import { useToast } from '@/context/ToastContext';

interface IndexItem {
    id: string;
    text: string;
    level: number;
}

export default function ArchiveDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { showToast } = useToast();
    const [archive, setArchive] = useState<Archive | null>(null);
    const [otherArchives, setOtherArchives] = useState<Archive[]>([]);
    const [loading, setLoading] = useState(true);
    const [indexItems, setIndexItems] = useState<IndexItem[]>([]);
    const [activeSection, setActiveSection] = useState('intro');
    const [readTime, setReadTime] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [archiveRes, allRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/archives/${id}`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/archives`)
                ]);

                if (archiveRes.ok) {
                    const data = await archiveRes.json();
                    setArchive(data);
                    generateIndex(data.content);
                    calculateReadTime(data.content + ' ' + data.description);
                }

                if (allRes.ok) {
                    const allData = await allRes.json();
                    setOtherArchives(allData.filter((a: Archive) => a.id !== id).slice(0, 3));
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    // Scroll Spy Logic
    useEffect(() => {
        if (loading || !archive) return;

        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -80% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll('section[id], header[id]');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, [loading, archive]);

    const calculateReadTime = (text: string) => {
        const wordsPerMinute = 200;
        const noOfWords = text.split(/\s/g).length;
        const minutes = Math.ceil(noOfWords / wordsPerMinute);
        setReadTime(minutes || 1);
    };

    const generateIndex = (content: string) => {
        const lines = content.split('\n');
        const items: IndexItem[] = [
            { id: 'intro', text: 'Introduction', level: 1 }
        ];

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            // Match Markdown style headings # or ##
            const match = trimmedLine.match(/^(#{1,3})\s+(.+)$/);
            if (match) {
                items.push({
                    id: `section-${index}`,
                    text: match[2],
                    level: match[1].length
                });
            } else if (trimmedLine.length > 3 && trimmedLine === trimmedLine.toUpperCase() && !trimmedLine.match(/[0-9]/)) {
                // Match ALL CAPS lines as headings if they aren't numbers
                items.push({
                    id: `section-${index}`,
                    text: trimmedLine,
                    level: 2
                });
            }
        });

        items.push({ id: 'visuals-section', text: 'Visual Gallery', level: 1 });
        setIndexItems(items);
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        if (showToast) showToast('Link copied to clipboard!', 'success');
    };

    const isVideo = (url: string) => {
        return url.match(/\.(mp4|mov|webm)$/i);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <Loader2 className="animate-spin text-gray-900" size={32} />
                </main>
                <Footer />
            </div>
        );
    }

    if (!archive) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900">Archive Not Found</h1>
                    <Link href="/archives" className="btn-underline">
                        Back to Archives
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-1">
                <div className="container mx-auto px-6 pt-12 md:pt-20">

                    {/* 1. POST HEADER */}
                    <header id="intro" className="mb-12 max-w-[1200px] mx-auto">
                        <div className="mb-8">
                            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                {archive.type}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-[0.9] tracking-tighter max-w-[720px]">
                            {archive.title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 leading-snug font-normal max-w-[680px]" dangerouslySetInnerHTML={{ __html: archive.description }} />
                        <div className="w-full h-px bg-gray-100 mt-12" />
                    </header>

                    {/* 2. META BAR */}
                    <div className="max-w-[1200px] mx-auto mb-16">
                        <div className="flex items-center gap-3 text-[13px] text-gray-400 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5" />
                                <span className="font-medium text-gray-600">Local Archive Team</span>
                            </div>
                            <span>|</span>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{new Date(archive.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <span>|</span>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{readTime} min read</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 min-[1100px]:grid-cols-[280px_1fr_280px] gap-12 items-start">

                        {/* 5. ARCHIVE SIDEBAR (LEFT) */}
                        <aside className="hidden min-[1100px]:block sticky top-24">
                            <div className="space-y-12">
                                <div>
                                    <div className="flex items-center gap-2 text-gray-900 mb-8 pb-4 border-b border-gray-100">
                                        <List className="w-4 h-4" />
                                        <h3 className="text-xs font-bold uppercase tracking-extra-wide">Archive Index</h3>
                                    </div>

                                    <nav className="space-y-1">
                                        {indexItems.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => scrollToSection(item.id)}
                                                className={`block w-full text-left py-2 text-[13px] transition-all duration-300 group ${
                                                    activeSection === item.id
                                                    ? 'text-gray-900 font-bold'
                                                    : 'text-gray-400 hover:text-gray-900'
                                                }`}
                                            >
                                                <span className="line-clamp-1">{item.text}</span>
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </aside>

                        {/* 3. BODY CONTENT (CENTER) */}
                        <div className="post-body w-full max-w-[680px] mx-auto px-0 overflow-hidden" ref={contentRef}>
                            {archive.coverImage && (
                                <div className="relative aspect-[16/9] mb-12 border border-gray-100 overflow-hidden">
                                    <Image
                                        src={archive.coverImage}
                                        alt={archive.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            )}

                            <div id="documentation" className="selection:bg-gray-900 selection:text-white">
                                {(() => {
                                    const lines = archive.content.split('\n');
                                    const elements: React.ReactNode[] = [];
                                    let currentParagraph: string[] = [];

                                    const flushParagraph = (idx: number) => {
                                        if (currentParagraph.length > 0) {
                                            // Join with newline to preserve HTML structure if it's block HTML
                                            const content = currentParagraph.join('\n');

                                            // More robust block level detection
                                            const isBlockHTML = /^\s*<(blockquote|div|ul|ol|figure|table|section|hr|p|video|img|h[1-6])/i.test(content.trim());

                                            if (isBlockHTML) {
                                                elements.push(
                                                    <div
                                                        key={`html-${idx}`}
                                                        dangerouslySetInnerHTML={{ __html: content }}
                                                        className="mb-8 last:mb-0"
                                                    />
                                                );
                                            } else {
                                                // For normal text, we can join with space or keep newlines as <br/>
                                                // Joining with space handles the "too much gap" issue while forming a paragraph
                                                elements.push(
                                                    <p
                                                        key={`p-${idx}`}
                                                        className="mb-6 last:mb-0 leading-relaxed text-gray-700"
                                                        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, ' ') }}
                                                    />
                                                );
                                            }
                                            currentParagraph = [];
                                        }
                                    };

                                    lines.forEach((line, idx) => {
                                        const trimmed = line.trim();

                                        // Heading detection
                                        const hMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
                                        const isAllCapsHeading = trimmed.length > 3 && trimmed === trimmed.toUpperCase() && !trimmed.match(/[0-9]/) && !trimmed.startsWith('<');

                                        if (hMatch || isAllCapsHeading) {
                                            flushParagraph(idx);
                                            const text = hMatch ? hMatch[2] : trimmed;
                                            const level = hMatch ? hMatch[1].length : 2;
                                            const Tag = level === 1 ? 'h2' : level === 2 ? 'h3' : 'h4' as any;
                                            elements.push(
                                                <section key={`sec-${idx}`} id={`section-${idx}`} className="scroll-mt-32 mb-12">
                                                    <Tag className="font-bold text-gray-900 tracking-tight" dangerouslySetInnerHTML={{ __html: text }} />
                                                </section>
                                            );
                                        } else if (trimmed === '') {
                                            flushParagraph(idx);
                                        } else {
                                            currentParagraph.push(line); // Keep original line with indentation
                                        }
                                    });

                                    flushParagraph(lines.length);
                                    return elements;
                                })()}
                            </div>

                            {/* 6. FOOTER OF POST */}
                            <div className="mt-20 pt-8 border-t border-gray-100">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-gray-50 text-gray-500 text-[11px] font-bold uppercase tracking-wider rounded-sm">#Documentation</span>
                                        <span className="px-3 py-1 bg-gray-50 text-gray-500 text-[11px] font-bold uppercase tracking-wider rounded-sm">#{archive.type}</span>
                                        <span className="px-3 py-1 bg-gray-50 text-gray-500 text-[11px] font-bold uppercase tracking-wider rounded-sm">#Heritage</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Share</span>
                                        <div className="flex items-center gap-3">
                                            <button className="text-gray-400 hover:text-gray-900 transition-colors">
                                                <Twitter className="w-4 h-4" />
                                            </button>
                                            <button onClick={handleCopyLink} className="text-gray-400 hover:text-gray-900 transition-colors">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. VISUAL GALLERY SIDEBAR (RIGHT) */}
                        <aside id="visuals-section" className="hidden min-[1100px]:block sticky top-24 w-[280px]">
                            <div className="space-y-12">
                                <div>
                                    <div className="flex items-center gap-2 text-gray-900 mb-8 pb-4 border-b border-gray-100">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <h3 className="text-xs font-bold uppercase tracking-extra-wide">Visual Gallery</h3>
                                    </div>

                                    <div className="space-y-12">
                                        {archive.images && archive.images.length > 0 ? (
                                            archive.images.map((url, index) => (
                                                <div key={index} className="group relative">
                                                    <div className="relative aspect-square bg-gray-50 overflow-hidden border border-gray-100 group-hover:border-gray-900 transition-colors duration-500">
                                                        {isVideo(url) ? (
                                                            <video
                                                                src={url}
                                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                            />
                                                        ) : (
                                                            <Image
                                                                src={url}
                                                                alt={`Plate ${index + 1}`}
                                                                fill
                                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                                unoptimized
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="mt-3">
                                                        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em]">Plate {index + 1}</span>
                                                        <div className="h-0.5 w-4 bg-gray-200 mt-2 group-hover:w-full group-hover:bg-gray-900 transition-all duration-500" />
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="aspect-square bg-gray-50 flex items-center justify-center border border-dashed border-gray-200">
                                                <span className="text-[10px] text-gray-400 uppercase tracking-widest text-center px-4">No additional visuals for this plate</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </aside>

                    </div>

                    {/* Related Archives */}
                    {otherArchives.length > 0 && (
                        <div className="mt-32 pt-16 border-t border-gray-100 mb-20">
                            <h3 className="text-xs font-bold uppercase tracking-extra-wide text-gray-400 mb-12">
                                Related Archive Entries
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {otherArchives.map((item) => (
                                    <Link key={item.id} href={`/archives/${item.id}`} className="group">
                                        <div className="relative aspect-[4/5] bg-gray-100 mb-4 overflow-hidden border border-gray-200">
                                            {item.coverImage && (
                                                <Image
                                                    src={item.coverImage}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                    unoptimized
                                                />
                                            )}
                                        </div>
                                        <h4 className="font-bold text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2 uppercase text-xs tracking-wider">
                                            {item.title}
                                        </h4>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
