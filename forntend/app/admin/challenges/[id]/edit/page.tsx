'use client';

import React, { useEffect, useState, use } from 'react';
import ChallengeForm from '@/components/admin/ChallengeForm';
import { Challenge } from '@/types';

export const dynamic = 'force-dynamic';

export default function EditChallengePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchChallenge(id);
        }
    }, [id]);

    const fetchChallenge = async (id: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/challenges/${id}`);
            if (res.ok) {
                const data = await res.json();
                setChallenge(data);
            } else {
                console.error('Failed to fetch challenge');
            }
        } catch (error) {
            console.error('Error fetching challenge:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!challenge) return <div>Challenge not found</div>;

    return (
        <div className="space-y-8">
            <div className="border-b-2 border-gray-200 pb-6">
                <h1 className="text-3xl font-bold tracking-tighter text-gray-900">Edit Challenge: {challenge.title}</h1>
            </div>
            <ChallengeForm initialData={challenge} isEditing />
        </div>
    );
}
