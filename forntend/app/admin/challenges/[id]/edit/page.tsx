'use client';

import React, { useEffect, useState } from 'react';
import ChallengeForm from '@/components/admin/ChallengeForm';
import { Challenge } from '@/types';
import { useParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function EditChallengePage() {
    const params = useParams();
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetchChallenge(params.id as string);
        }
    }, [params.id]);

    const fetchChallenge = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/challenges/${id}`);
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
