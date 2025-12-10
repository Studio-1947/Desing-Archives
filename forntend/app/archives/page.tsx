'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { ARCHIVE_ITEMS } from '@/data/archives';

const CATEGORIES = ['All', 'Crafts', 'Innovations', 'Stories', 'Tools'];

export default function ArchivesPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredItems = activeCategory === 'All'
        ? ARCHIVE_ITEMS
        : ARCHIVE_ITEMS.filter(item => item.category === activeCategory);

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

                            {/* Hero Collage */}
                            <div className="grid grid-cols-3 gap-4 h-[400px] relative">
                                <div className="col-span-2 row-span-2 relative overflow-hidden border border-gray-200">
                                    <Image
                                        src={ARCHIVE_ITEMS[0].image}
                                        alt="Archive Hero 1"
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                                <div className="relative overflow-hidden border border-gray-200">
                                    <Image
                                        src={ARCHIVE_ITEMS[1].image}
                                        alt="Archive Hero 2"
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                                <div className="relative overflow-hidden border border-gray-200">
                                    <Image
                                        src={ARCHIVE_ITEMS[2].image}
                                        alt="Archive Hero 3"
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                                <div className="relative overflow-hidden border border-gray-200">
                                    <Image
                                        src={ARCHIVE_ITEMS[3].image}
                                        alt="Archive Hero 4"
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
                                <div className="col-span-2 relative overflow-hidden border border-gray-200">
                                    <Image
                                        src={ARCHIVE_ITEMS[5].image}
                                        alt="Archive Hero 5"
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>
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

                        {/* Search Placeholder (Visual only for now) */}
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Search archives..."
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-gray-900 w-64"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    {/* Archive Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map((item) => (
                            <Link
                                href={`/archives/${item.id}`}
                                key={item.id}
                                className="group cursor-pointer block"
                            >
                                <div className="relative h-80 border border-gray-200 overflow-hidden mb-4">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900">
                                        {item.category}
                                    </div>
                                </div>

                                <div className="flex items-end justify-between border-b border-gray-200 pb-4 group-hover:border-gray-900 transition-colors">
                                    <div>
                                        <span className="text-xs font-bold text-gray-400 mb-1 block">
                                            ARCHIVE {item.id}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {item.location}
                                        </p>
                                    </div>
                                    <div className="w-8 h-8 border border-gray-200 flex items-center justify-center rounded-full group-hover:bg-gray-900 group-hover:border-gray-900 transition-all">
                                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredItems.length === 0 && (
                        <div className="text-center py-24 bg-gray-50 border border-dashed border-gray-300">
                            <p className="text-gray-500">No archive items found for this category.</p>
                            <button
                                onClick={() => setActiveCategory('All')}
                                className="text-gray-900 font-bold mt-2 underline"
                            >
                                View all items
                            </button>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}
