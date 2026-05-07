'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Loader2, MapPin, Tag, Hash, ChevronRight, List } from 'lucide-react';
import { Archive } from '@/types/archive';
import { useParams } from 'next/navigation';

interface IndexItem {
    id: string;
    text: string;
    level: number;
}

export default function ArchiveDetailPage() {
    const params = useParams();
    const [archive, setArchive] = useState<Archive | null>(null);
    const [otherArchives, setOtherArchives] = useState<Archive[]>([]);
    const [loading, setLoading] = useState(true);
    const [indexItems, setIndexItems] = useState<IndexItem[]>([]);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [archiveRes, allRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/archives/${params.id}`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/archives`)
                ]);

                if (archiveRes.ok) {
                    const data = await archiveRes.json();
                    setArchive(data);
                    generateIndex(data.content);
                }

                if (allRes.ok) {
                    const allData = await allRes.json();
                    setOtherArchives(allData.filter((a: Archive) => a.id !== params.id).slice(0, 3));
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchData();
        }
    }, [params.id]);

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

        if (items.length === 1) { // Only Intro
            items.push({ id: 'documentation', text: 'Documentation', level: 1 });
            items.push({ id: 'visuals', text: 'Visual Gallery', level: 1 });
        }

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
                <div className="container mx-auto px-6 py-12 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* LEFT SECTION: ARCHIVE INDEX */}
                        <aside className="lg:col-span-2">
                            <div className="sticky top-24 space-y-12">
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
                                                className={`block w-full text-left py-2 text-sm transition-all duration-300 group ${
                                                    item.level === 1 
                                                    ? 'text-gray-900 font-bold uppercase tracking-tighter' 
                                                    : 'text-gray-500 hover:text-gray-900 pl-4 border-l border-gray-100 hover:border-gray-900'
                                                }`}
                                            >
                                                <span className="line-clamp-1">{item.text}</span>
                                            </button>
                                        ))}
                                    </nav>
                                </div>

                                <div className="space-y-6 pt-8 border-t border-gray-100">
                                    <div>
                                        <span className="text-[10px] text-gray-400 uppercase tracking-extra-wide block mb-2 flex items-center gap-1">
                                            <Hash className="w-3 h-3" /> Archive ID
                                        </span>
                                        <span className="font-mono text-gray-900 text-sm">{archive.id.substring(0, 8)}</span>
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-gray-400 uppercase tracking-extra-wide block mb-2 flex items-center gap-1">
                                            <Tag className="w-3 h-3" /> Category
                                        </span>
                                        <span className="font-medium text-gray-900 text-sm uppercase tracking-wide">{archive.type}</span>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* MIDDLE SECTION: CONTENT HEAVY */}
                        <div className="lg:col-span-7">
                            <div className="max-w-3xl" ref={contentRef}>
                                <header id="intro" className="mb-16">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="px-3 py-1 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest">
                                            {archive.type}
                                        </span>
                                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(archive.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-[0.9] tracking-tighter">
                                        {archive.title}
                                    </h1>
                                    <p className="text-2xl text-gray-500 leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: archive.description }} />
                                </header>

                                {archive.coverImage && (
                                    <div className="relative aspect-[16/9] mb-16 border border-gray-100 overflow-hidden group">
                                        <Image
                                            src={archive.coverImage}
                                            alt={archive.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                                    </div>
                                )}

                                <div id="documentation" className="prose prose-lg max-w-none text-gray-800 whitespace-pre-wrap selection:bg-gray-900 selection:text-white">
                                    {archive.content.split('\n').map((line, idx) => {
                                        const trimmed = line.trim();
                                        const hMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
                                        
                                        if (hMatch) {
                                            const level = hMatch[1].length;
                                            const text = hMatch[2];
                                            const Tag = level === 1 ? 'h2' : level === 2 ? 'h3' : 'h4';
                                            return (
                                                <Tag key={idx} id={`section-${idx}`} className="font-bold text-gray-900 mt-12 mb-6 tracking-tight uppercase" dangerouslySetInnerHTML={{ __html: text }} />
                                            );
                                        }

                                        if (trimmed.length > 3 && trimmed === trimmed.toUpperCase() && !trimmed.match(/[0-9]/)) {
                                            return (
                                                <h3 key={idx} id={`section-${idx}`} className="font-bold text-gray-900 mt-12 mb-6 tracking-tight uppercase">
                                                    {trimmed}
                                                </h3>
                                            );
                                        }

                                        return <p key={idx} className="mb-6 leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: line }} />;
                                    })}
                                </div>

                                {otherArchives.length > 0 && (
                                    <div className="mt-32 pt-16 border-t border-gray-100">
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
                        </div>

                        {/* RIGHT SECTION: VISUALS */}
                        <aside className="lg:col-span-3">
                            <div className="sticky top-24 space-y-12">
                                <div id="visuals">
                                    <h3 className="text-[10px] font-bold uppercase tracking-extra-wide text-gray-900 mb-8 flex items-center gap-2">
                                        <MapPin className="w-3 h-3" />
                                        Visual Gallery
                                    </h3>
                                    
                                    <div className="space-y-12">
                                        {archive.images && archive.images.length > 0 ? (
                                            archive.images.map((url, index) => (
                                                <div key={index} className="group relative">
                                                    <div className="relative aspect-square bg-gray-50 overflow-hidden border border-gray-100 group-hover:border-gray-900 transition-colors duration-500">
                                                        {isVideo(url) ? (
                                                            <video
                                                                src={url}
                                                                className="w-full h-full object-cover"
                                                                controls
                                                            />
                                                        ) : (
                                                            <Image
                                                                src={url}
                                                                alt={`Documentation ${index + 1}`}
                                                                fill
                                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="mt-4">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Plate {index + 1}</span>
                                                            <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-gray-900 transition-colors" />
                                                        </div>
                                                        <div className="h-px w-full bg-gray-100 group-hover:bg-gray-900 transition-colors" />
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="aspect-square bg-gray-50 flex items-center justify-center border border-dashed border-gray-200">
                                                <span className="text-[10px] text-gray-400 uppercase tracking-widest">No additional visuals</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </aside>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
