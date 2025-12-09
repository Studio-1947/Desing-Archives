'use client';

import { Users, Download, Award, Clock } from 'lucide-react';
import { useChallengeSocket } from '../hooks/useChallengeSocket';
import { Challenge } from '@/types';

interface ChallengeStatsProps {
    challenge: Challenge;
}

export default function ChallengeStats({ challenge }: ChallengeStatsProps) {
    const { participants } = useChallengeSocket(
        challenge.id,
        challenge.totalViews,
        challenge.totalParticipants
    );

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
                <Award className="w-8 h-8 text-gray-900" />
                <div>
                    <p className="text-2xl font-bold text-gray-900">
                        ₹{(challenge.prizePool / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Prize Pool</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-gray-900" />
                <div>
                    <p className="text-2xl font-bold text-gray-900">
                        {participants.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Participants</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Clock className="w-8 h-8 text-gray-900" />
                <div>
                    <p className="text-2xl font-bold text-gray-900">
                        {Math.ceil((new Date(challenge.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Days Left</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Download className="w-8 h-8 text-gray-900" />
                <div>
                    <p className="text-2xl font-bold text-gray-900">
                        {challenge.totalSubmissions.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Submissions</p>
                </div>
            </div>
        </div>
    );
}
