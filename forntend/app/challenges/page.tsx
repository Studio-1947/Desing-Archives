'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChallengeCard from '@/components/ChallengeCard';
import { Search } from 'lucide-react';
import { Challenge, ChallengeStatus, ChallengeCategory } from '@/types';

export default function ChallengesPage({ searchParams }: { searchParams: { type?: string } }) {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<ChallengeStatus | 'all'>('all');
    const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | 'all'>('all');

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const typeParam = searchParams?.type ? `?type=${searchParams.type}` : '';
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/challenges${typeParam}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setChallenges(data);
                } else {
                    console.error('Expected array of challenges but got:', data);
                    setChallenges([]);
                }
            } catch (error) {
                console.error('Error fetching challenges:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, [searchParams?.type]);

    const categories: (ChallengeCategory | 'all')[] = [
        'all',
        'Graphic Design',
        'UI/UX Design',
        'Brand Identity',
        'Illustration',
        'Typography',
        'Motion Design',
        'Product Design',
        'Web Design',
    ];

    const statuses: (ChallengeStatus | 'all')[] = ['all', 'active', 'upcoming', 'archived'];

    const filteredChallenges = challenges.filter((challenge) => {
        const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || challenge.status === selectedStatus;
        const matchesCategory = selectedCategory === 'all' || challenge.category.includes(selectedCategory);

        return matchesSearch && matchesStatus && matchesCategory;
    });

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-1 container mx-auto px-6 py-16">
                {/* Page Header */}
                <div className="mb-16 animate-fade-in">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                        {searchParams?.type === 'student' ? 'Student Challenges' : 'Design Challenges'}
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Discover and participate in design challenges that celebrate creativity,
                        cultural heritage, and innovative thinking.
                    </p>
                </div>

                {/* Filters */}
                <div className="border border-gray-200 p-8 mb-12 space-y-8 animate-slide-up">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search challenges..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-gray-900 focus:outline-none transition-all duration-200 bg-white text-gray-900"
                        />
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-900 mb-4 tracking-wide uppercase">
                            Status
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {statuses.map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setSelectedStatus(status)}
                                    className={`px-6 py-2 text-sm font-medium tracking-wide transition-all duration-200 uppercase ${selectedStatus === status
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-900'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-900 mb-4 tracking-wide uppercase">
                            Category
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-2 text-sm font-medium tracking-wide transition-all duration-200 uppercase ${selectedCategory === category
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-900'
                                        }`}
                                >
                                    {category === 'all' ? 'All' : category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-sm text-gray-600 uppercase tracking-wide">
                        Showing <span className="font-semibold text-gray-900">{filteredChallenges.length}</span> challenge{filteredChallenges.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Challenges Grid */}
                {loading ? (
                    <div className="text-center py-12">Loading challenges...</div>
                ) : filteredChallenges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredChallenges.map((challenge) => (
                            <ChallengeCard key={challenge.id} challenge={challenge} />
                        ))}
                    </div>
                ) : (
                    <div className="border-2 border-gray-200 p-16 text-center">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No challenges found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your filters or search query
                        </p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
