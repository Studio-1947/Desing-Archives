'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Loader2, MapPin } from 'lucide-react';
import { Archive } from '@/types/archive';
import { useParams } from 'next/navigation';

export default function ArchiveDetailPage() {
    const params = useParams();
    const [archive, setArchive] = useState<Archive | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArchive = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/archives/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setArchive(data);
                }
            } catch (error) {
                console.error('Failed to fetch archive:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchArchive();
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
                {/* Hero Section - Full Background Image with Overlay */}
                <div className="relative h-[70vh] min-h-[500px] w-full bg-gray-900">
                    {archive.coverImage && (
                        <>
                            <Image
                                src={archive.coverImage}
                                alt={archive.title}
                                fill
                                className="object-cover opacity-60"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        </>
                    )}

                    <div className="absolute inset-0 flex items-end pb-16 md:pb-24">
                        <div className="container mx-auto px-6">
                            <Link
                                href="/archives"
                                className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors text-sm font-medium tracking-wide"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                BACK TO ARCHIVES
                            </Link>

                            <div className="max-w-5xl">
                                <div className="flex items-center gap-6 mb-6 text-sm font-bold uppercase tracking-extra-wide text-white/90">
                                    <span className="px-3 py-1 border border-white/30 backdrop-blur-sm">
                                        {archive.type}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(archive.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-none tracking-tight">
                                    {archive.title}
                                </h1>

                                <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl border-l-4 border-white/30 pl-6">
                                    {archive.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="container mx-auto px-6 py-20 md:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Main Content */}
                        <div className="lg:col-span-7">
                            <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-wrap first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
                                {archive.content}
                            </div>
                        </div>

                        {/* Sidebar / Gallery */}
                        <div className="lg:col-span-5 space-y-12">
                            {/* Metadata / Details */}
                            <div className="bg-gray-50 p-8 border border-gray-200">
                                <h3 className="text-sm font-bold uppercase tracking-extra-wide text-gray-900 mb-6 border-b border-gray-200 pb-4">
                                    Project Details
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">Archive ID</span>
                                        <span className="font-mono text-gray-900 text-lg">{archive.id.substring(0, 8)}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">Category</span>
                                        <span className="font-medium text-gray-900 text-lg">{archive.type}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">Date Archived</span>
                                        <span className="font-medium text-gray-900 text-lg">{new Date(archive.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Gallery Grid */}
                            {archive.images && archive.images.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-extra-wide text-gray-900 mb-6 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        Visual Gallery
                                    </h3>
                                    <div className="grid grid-cols-1 gap-8">
                                        {archive.images.map((url, index) => (
                                            <div key={index} className="group relative">
                                                <div className="relative aspect-video bg-gray-100 overflow-hidden border border-gray-200 group-hover:border-gray-900 transition-colors duration-300">
                                                    {isVideo(url) ? (
                                                        <video
                                                            src={url}
                                                            className="w-full h-full object-cover"
                                                            controls
                                                        />
                                                    ) : (
                                                        <Image
                                                            src={url}
                                                            alt={`Gallery ${index + 1}`}
                                                            fill
                                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                        />
                                                    )}
                                                </div>
                                                <div className="mt-2 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-xs font-mono uppercase">Fig. {index + 1}</span>
                                                    <span className="text-xs uppercase tracking-wider">View Fullscreen</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
