import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChallengeTabs from '@/components/ChallengeTabs';
import ChallengeActions from '@/components/ChallengeActions';
import {
    Calendar, Users, Eye, MapPin, Clock, Award, Download
} from 'lucide-react';
import { Challenge } from '@/types';

async function getChallenge(id: string): Promise<Challenge | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/challenges/${id}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            return null;
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching challenge:', error);
        return null;
    }
}

import ViewIncrementer from '@/components/ViewIncrementer';
import ChallengeStats from '@/components/ChallengeStats';

// ... (imports remain the same)

export default async function ChallengePage({ params }: { params: { id: string } }) {
    const challenge = await getChallenge(params.id);

    if (!challenge) {
        notFound();
    }

    const statusColors: Record<string, string> = {
        active: 'border-gray-900 text-gray-900',
        upcoming: 'border-gray-500 text-gray-500',
        archived: 'border-gray-300 text-gray-400',
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <ViewIncrementer challengeId={challenge.id} />

            <main className="flex-1">
                {/* Hero Image */}
                <div className="relative h-96 bg-gray-100">
                    <Image
                        src={challenge.imageUrl}
                        alt={challenge.title}
                        fill
                        className="object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12">
                        <div className="max-w-4xl">
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className={`px-3 py-1 bg-white border text-xs font-bold tracking-wide uppercase ${statusColors[challenge.status]}`}>
                                    {challenge.status}
                                </span>
                                {challenge.category.map((cat: string) => (
                                    <span
                                        key={cat}
                                        className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wide uppercase"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                {challenge.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-white/90">
                                {challenge.location && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-sm font-medium uppercase tracking-wide">{challenge.location}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium uppercase tracking-wide">By {challenge.organizer}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="border-b border-gray-200 bg-gray-50">
                    <div className="container mx-auto px-6 py-6">
                        <ChallengeStats challenge={challenge} />
                    </div>
                </div>

                {/* Main Content with Tabs */}
                <div className="bg-white">
                    <div className="container mx-auto px-6 py-12">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2">
                                <ChallengeTabs challenge={challenge} />
                            </div>
                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <ChallengeActions challengeId={challenge.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
