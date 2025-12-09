'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ViewIncrementer({ challengeId }: { challengeId: string }) {
    const hasIncremented = useRef(false);
    const { user } = useAuth();

    useEffect(() => {
        if (hasIncremented.current) return;

        const incrementView = async () => {
            try {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/challenges/${challengeId}/view`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: user?.id }),
                });
                hasIncremented.current = true;
            } catch (error) {
                console.error('Error incrementing view:', error);
            }
        };

        incrementView();
    }, [challengeId, user]);

    return null;
}
