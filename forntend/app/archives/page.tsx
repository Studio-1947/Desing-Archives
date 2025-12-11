'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search, Loader2 } from 'lucide-react';
import { Archive } from '@/types/archive';

const CATEGORIES = ['All', 'Crafts', 'Innovations', 'Stories', 'Tools'];

export default function ArchivesPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [archives, setArchives] = useState<Archive[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchArchives = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/archives`);
                if (res.ok) {
                    const data = await res.json();
                    setArchives(data);
                }
            } catch (error) {
                console.error('Failed to fetch archives:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArchives();
    }, []);

    const filteredItems = archives.filter(item => {
        const matchesCategory = activeCategory === 'All' || item.type.toLowerCase() === activeCategory.toLowerCase();
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-gray-50 border-b border-gray-200 py-12 md:py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="max-w-2xl">
                                <span className="text-xs font-bold uppercase tracking-extra-wide text-gray-500 mb-4 block">
                                    Library of Local Wisdom
                                </span>
                                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
                                    Local Design Archive
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    A growing library of stories, crafts, tools, symbols, materials, and everyday objects that shape local life. Each entry documents how design emerges naturally from culture and community.
                                </p>
                            </div>

                            {/* Hero Collage - Using first few archives or placeholders if empty */}
                            <div className="grid grid-cols-3 gap-4 h-[400px] relative">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <div key={i} className={`relative overflow-hidden border border-gray-200 ${i === 0 || i === 4 ? 'col-span-2' : ''} ${i === 0 ? 'row-span-2' : ''}`}>
                                        {archives[i] ? (
                                            <Image
                                                src={archives[i].coverImage}
                                                alt={archives[i].title}
                                                fill
                                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-400 text-xs uppercase">Archive {i + 1}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filter & Grid Section */}
                <section className="container mx-auto px-6 py-16">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Search archives..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-gray-900 w-64"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    {/* Archive Grid */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin text-gray-400" size={32} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredItems.map((item) => (
                                <Link
                                    href={`/archives/${item.id}`}
                                    key={item.id}
                                    className="group cursor-pointer block"
                                >
                                    <div className="relative h-80 border border-gray-200 overflow-hidden mb-4">
                                        {item.coverImage ? (
                                            <Image
                                                src={item.coverImage}
                                                alt={item.title}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                <span className="text-gray-400 text-xs uppercase">No Image</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900">
                                            {item.type}
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-between border-b border-gray-200 pb-4 group-hover:border-gray-900 transition-colors">
                                        <div>
                                            <span className="text-xs font-bold text-gray-400 mb-1 block">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </span>
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="w-8 h-8 border border-gray-200 flex items-center justify-center rounded-full group-hover:bg-gray-900 group-hover:border-gray-900 transition-all shrink-0 ml-4">
                                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && filteredItems.length === 0 && (
                        <div className="text-center py-24 bg-gray-50 border border-dashed border-gray-300">
                            <p className="text-gray-500">No archive items found.</p>
                            {activeCategory !== 'All' && (
                                <button
                                    onClick={() => setActiveCategory('All')}
                                    className="text-gray-900 font-bold mt-2 underline"
                                >
                                    View all items
                                </button>
                            )}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}
