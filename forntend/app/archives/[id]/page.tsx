'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Loader2, MapPin, Tag, Hash, ChevronRight } from 'lucide-react';
import { Archive } from '@/types/archive';
import { useParams } from 'next/navigation';

export default function ArchiveDetailPage() {
    const params = useParams();
    const [archive, setArchive] = useState<Archive | null>(null);
    const [otherArchives, setOtherArchives] = useState<Archive[]>([]);
    const [loading, setLoading] = useState(true);

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
                }

                if (allRes.ok) {
                    const allData = await allRes.json();
                    setOtherArchives(allData.filter((a: Archive) => a.id !== params.id).slice(0, 6));
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
                        
                        {/* LEFT SECTION: INDEX */}
                        <aside className="lg:col-span-2 space-y-12">
                            <div className="sticky top-24 space-y-12">
                                <div>
                                    <Link
                                        href="/archives"
                                        className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors text-xs font-bold uppercase tracking-extra-wide"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Index
                                    </Link>

                                    <div className="space-y-6">
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
                                        <div>
                                            <span className="text-[10px] text-gray-400 uppercase tracking-extra-wide block mb-2 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> Recorded
                                            </span>
                                            <span className="font-medium text-gray-900 text-sm">{new Date(archive.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {otherArchives.length > 0 && (
                                    <div className="pt-8 border-t border-gray-100">
                                        <h3 className="text-[10px] font-bold uppercase tracking-extra-wide text-gray-900 mb-6">
                                            Related Entries
                                        </h3>
                                        <ul className="space-y-4">
                                            {otherArchives.map((item) => (
                                                <li key={item.id}>
                                                    <Link 
                                                        href={`/archives/${item.id}`}
                                                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors block group"
                                                    >
                                                        <span className="line-clamp-1">{item.title}</span>
                                                        <div className="h-px w-0 group-hover:w-full bg-gray-900 transition-all duration-300 mt-1" />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </aside>

                        {/* MIDDLE SECTION: CONTENT HEAVY */}
                        <div className="lg:col-span-7">
                            <div className="max-w-3xl">
                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
                                    {archive.title}
                                </h1>

                                <p className="text-xl text-gray-600 leading-relaxed mb-12 border-l-2 border-gray-200 pl-6 italic">
                                    {archive.description}
                                </p>

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

                                <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-wrap first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
                                    {archive.content}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SECTION: PICTURES */}
                        <aside className="lg:col-span-3">
                            <div className="sticky top-24 space-y-8">
                                <h3 className="text-[10px] font-bold uppercase tracking-extra-wide text-gray-900 mb-4 flex items-center gap-2">
                                    <MapPin className="w-3 h-3" />
                                    Visual Documentation
                                </h3>
                                
                                <div className="space-y-8">
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
                                                <div className="mt-3 flex justify-between items-center">
                                                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Plate {index + 1}</span>
                                                    <div className="h-px flex-1 mx-4 bg-gray-100" />
                                                    <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-gray-900 transition-colors" />
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
                        </aside>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
