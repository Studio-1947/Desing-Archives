'use client';

import { Challenge } from '@/types';

interface LeaderboardTabProps {
    challenge: Challenge;
}

export default function LeaderboardTab({ challenge }: LeaderboardTabProps) {
    // Mock leaderboard data extended for design context
    const topParticipants = [
        { rank: 1, name: 'Priya Sharma', score: 98.5, creativity: 99, technical: 98, adherence: 98, submissions: 12 },
        { rank: 2, name: 'Arjun Patel', score: 96.8, creativity: 95, technical: 97, adherence: 98, submissions: 9 },
        { rank: 3, name: 'Ananya Reddy', score: 95.2, creativity: 96, technical: 94, adherence: 95, submissions: 15 },
        { rank: 4, name: 'Rohan Mehta', score: 94.7, creativity: 94, technical: 95, adherence: 95, submissions: 8 },
        { rank: 5, name: 'Kavya Iyer', score: 93.1, creativity: 92, technical: 93, adherence: 94, submissions: 11 },
    ];

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
                            {topParticipants.map((participant) => (
                                <tr key={participant.rank} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="py-4 px-6">
                                        <div className={`inline-flex items-center justify-center w-8 h-8 font-bold text-sm rounded-full ${participant.rank <= 3 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {participant.rank}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold">
                                                {participant.name.charAt(0)}
                                            </div>
                                            <span className="font-medium text-gray-900">{participant.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-center text-gray-600">{participant.creativity}</td>
                                    <td className="py-4 px-6 text-center text-gray-600">{participant.technical}</td>
                                    <td className="py-4 px-6 text-center text-gray-600">{participant.adherence}</td>
                                    <td className="py-4 px-6 text-right font-bold text-gray-900 text-lg">
                                        {participant.score}
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
