'use client';

import { useEffect, useState, useCallback } from 'react';
import { Challenge } from '@/types';
import { useSocket } from '@/context/SocketContext';
import Image from 'next/image';

interface LeaderboardTabProps {
    challenge: Challenge;
}

interface Submission {
    id: string;
    totalScore: number;
    creativity: number;
    technical: number;
    adherence: number;
    user: {
        name: string;
        picture: string | null;
    };
}

export default function LeaderboardTab({ challenge }: LeaderboardTabProps) {
    const [leaderboard, setLeaderboard] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);

    const { socket } = useSocket();

    const fetchLeaderboard = useCallback(async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/challenges/${challenge.id}/leaderboard`);
            if (res.ok) {
                const data = await res.json();
                setLeaderboard(data);
            }
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        } finally {
            setLoading(false);
        }
    }, [challenge.id]);

    useEffect(() => {
        fetchLeaderboard();

        if (socket) {
            socket.on('leaderboard_update', (data: any) => {
                if (data.challengeId === challenge.id) {
                    fetchLeaderboard();
                }
            });

            return () => {
                socket.off('leaderboard_update');
            };
        }
    }, [challenge.id, socket, fetchLeaderboard]);

    if (loading) {
        return <div className="text-center py-12">Loading leaderboard...</div>;
    }

    if (leaderboard.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                No submissions yet. Be the first to submit!
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                    Leaderboard
                </h2>
                <div className="text-sm text-gray-500">
                    Last updated: Just now
                </div>
            </div>

            <div className="border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wide">Rank</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wide">Designer</th>
                                <th className="text-center py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wide">Creativity</th>
                                <th className="text-center py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wide">Technical</th>
                                <th className="text-center py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wide">Adherence</th>
                                <th className="text-right py-4 px-6 text-xs font-bold text-gray-900 uppercase tracking-wide">Total Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {leaderboard.map((submission, index) => (
                                <tr key={submission.id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="py-4 px-6">
                                        <div className={`inline-flex items-center justify-center w-8 h-8 font-bold text-sm rounded-full ${index < 3 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold overflow-hidden relative">
                                                {submission.user.picture ? (
                                                    <Image src={submission.user.picture} alt={submission.user.name} fill className="object-cover" />
                                                ) : (
                                                    submission.user.name.charAt(0)
                                                )}
                                            </div>
                                            <span className="font-medium text-gray-900">{submission.user.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-center text-gray-600">{submission.creativity}</td>
                                    <td className="py-4 px-6 text-center text-gray-600">{submission.technical}</td>
                                    <td className="py-4 px-6 text-center text-gray-600">{submission.adherence}</td>
                                    <td className="py-4 px-6 text-right font-bold text-gray-900 text-lg">
                                        {submission.totalScore}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
