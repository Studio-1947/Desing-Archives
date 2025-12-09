'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, Eye } from 'lucide-react';
import { Challenge } from '@/types';

interface ChallengeCardProps {
    challenge: Challenge;
}

import { useChallengeSocket } from '../hooks/useChallengeSocket';

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
    const { views, participants } = useChallengeSocket(
        challenge.id,
        challenge.totalViews,
        challenge.totalParticipants
    );

    const statusColors = {
        active: 'border-gray-900 text-gray-900',
        upcoming: 'border-gray-500 text-gray-500',
        archived: 'border-gray-300 text-gray-400',
    };

    return (
        <Link href={`/challenges/${challenge.id}`}>
            <div className="minimal-card card-hover-minimal group animate-fade-in">
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                    <Image
                        src={challenge.imageUrl}
                        alt={challenge.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 bg-white border text-xs font-medium tracking-wide uppercase ${statusColors[challenge.status]}`}>
                            {challenge.status}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Location & Organizer */}
                    <div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-wide">
                        {challenge.location && (
                            <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span className="line-clamp-1">{challenge.location}</span>
                            </div>
                        )}
                        <span className="line-clamp-1">{challenge.organizer}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-gray-600 transition-colors duration-200 h-14">
                        {challenge.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed h-10">
                        {challenge.shortDescription}
                    </p>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 h-6 overflow-hidden">
                        {challenge.category.slice(0, 2).map((cat) => (
                            <span
                                key={cat}
                                className="px-2 py-1 border border-gray-200 text-xs text-gray-600 uppercase tracking-wide"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>{participants}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>{views}</span>
                            </div>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                            ₹{(challenge.prizePool / 1000).toFixed(0)}K
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
