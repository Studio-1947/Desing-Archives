'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Tag } from 'lucide-react';
import { ARCHIVE_ITEMS } from '@/data/archives';
import { notFound } from 'next/navigation';

export default function ArchiveDetailPage({ params }: { params: { id: string } }) {
    const item = ARCHIVE_ITEMS.find(i => i.id === params.id);

    if (!item) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-1">
                {/* Hero / Header */}
                <section className="bg-gray-50 pt-12 pb-20 border-b border-gray-200">
                    <div className="container mx-auto px-6">
                        <Link
                            href="/archives"
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Archives
                        </Link>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider">
                                        Archive {item.id}
                                    </span>
                                    <span className="flex items-center text-sm font-medium text-gray-600">
                                        <Tag className="w-4 h-4 mr-2" />
                                        {item.category}
                                    </span>
                                    <span className="flex items-center text-sm font-medium text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {item.location}
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                                    {item.title}
                                </h1>

                                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                    {item.description}
                                </p>
                            </div>

                            <div className="relative h-[400px] lg:h-[500px] border border-gray-200">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">The Story</h2>
                            <div className="prose prose-lg text-gray-600 mb-16">
                                <p>{item.fullStory}</p>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Gallery</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {item.gallery.map((img, index) => (
                                    <div key={index} className="relative h-64 border border-gray-200 group overflow-hidden">
                                        <Image
                                            src={img}
                                            alt={`Gallery ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
