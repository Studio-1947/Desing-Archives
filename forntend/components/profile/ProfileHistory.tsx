'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Trophy, Clock, CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Participation {
    id: string;
    status: string;
    joinedAt: string;
    challenge: {
        id: string;
        title: string;
        status: string;
        imageUrl: string;
        startDate: string;
        endDate: string;
        prizePool: number;
        organizer: string;
    };
}

export default function ProfileHistory() {
    const [participations, setParticipations] = useState<Participation[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}/participations`);
                if (res.ok) {
                    const data = await res.json();
                    setParticipations(data);
                }
            } catch (error) {
                console.error('Error fetching history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user]);

    if (loading) return <div className="py-12 text-center font-mono text-sm">Loading history...</div>;

    if (participations.length === 0) {
        return (
            <div className="text-center py-16 border-2 border-dashed border-gray-200 bg-gray-50">
                <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-2">No challenges yet</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">You have not participated in any challenges yet. Start your journey today.</p>
                <Link href="/challenges" className="btn-primary-minimal inline-flex items-center gap-2">
                    Browse Challenges
                    <ArrowRight size={16} />
                </Link>
            </div>
        );
    }

    const stats = {
        total: participations.length,
        active: participations.filter(p => p.challenge.status === 'active').length,
        completed: participations.filter(p => p.challenge.status === 'completed').length,
    };

    return (
        <div className="space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 border-2 border-gray-900 hover-lift group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-900 text-white group-hover:scale-110 transition-transform duration-300">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Challenges</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 border-2 border-gray-200 hover:border-gray-900 transition-colors duration-300 hover-lift group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-100 text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Active</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 border-2 border-gray-200 hover:border-gray-900 transition-colors duration-300 hover-lift group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-100 text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Completed</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* History List */}
            <div className="space-y-6">
                <div className="flex items-end justify-between border-b-2 border-gray-100 pb-4">
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Participation History</h3>
                    <span className="text-sm font-mono text-gray-500">{participations.length} ENTRIES</span>
                </div>

                <div className="grid gap-6">
                    {participations.map((p) => (
                        <Link
                            key={p.id}
                            href={`/challenges/${p.challenge.id}`}
                            className="block bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300 group hover:shadow-lg"
                        >
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-64 h-48 md:h-auto relative overflow-hidden bg-gray-100 border-b md:border-b-0 md:border-r border-gray-200">
                                    <Image
                                        src={p.challenge.imageUrl}
                                        alt={p.challenge.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute top-0 left-0 p-3">
                                        <span className="px-2 py-1 bg-white/90 backdrop-blur border border-gray-200 text-xs font-bold uppercase tracking-wide">
                                            {p.challenge.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                                    <div>
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                            <div>
                                                <h4 className="text-xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors mb-2">
                                                    {p.challenge.title}
                                                </h4>
                                                <p className="text-sm text-gray-500 uppercase tracking-wide">
                                                    Organized by {p.challenge.organizer}
                                                </p>
                                            </div>

                                            <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest border ${p.status === 'registered' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                p.status === 'submitted' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    'bg-gray-50 text-gray-700 border-gray-200'
                                                }`}>
                                                {p.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8 pt-6 border-t border-gray-100 mt-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm font-medium">Joined {new Date(p.joinedAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Trophy className="w-4 h-4" />
                                            <span className="text-sm font-medium">Prize: ₹{(p.challenge.prizePool / 1000).toFixed(0)}K</span>
                                        </div>

                                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                                            <ArrowRight className="w-5 h-5 text-gray-900" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
