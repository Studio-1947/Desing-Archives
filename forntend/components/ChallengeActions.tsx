'use client';

import Link from 'next/link';
import { Download, Share2, Play, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import SubmissionModal from './SubmissionModal';

interface ChallengeActionsProps {
    challengeId: string;
}

export default function ChallengeActions({ challengeId }: ChallengeActionsProps) {
    const [isSharing, setIsSharing] = useState(false);
    const [isParticipating, setIsParticipating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const { showToast } = useToast();

    useEffect(() => {
        const checkStatus = async () => {
            if (!user) {
                setIsLoading(false);
                return;
            }
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/challenges/${challengeId}/status?userId=${user.id}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.status) setIsParticipating(true);
                }
            } catch (error) {
                console.error('Error checking status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkStatus();
    }, [challengeId, user]);

    const handleParticipate = async () => {
        if (!user) {
            showToast('Please login to participate', 'error');
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/challenges/${challengeId}/participate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id }),
            });

            if (res.ok) {
                setIsParticipating(true);
                showToast('Successfully registered for challenge!', 'success');
            } else {
                showToast('Failed to register', 'error');
            }
        } catch (error) {
            showToast('Error registering', 'error');
        }
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setIsSharing(true);
            setTimeout(() => setIsSharing(false), 2000);
            showToast('Link copied to clipboard!', 'success');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="space-y-4">
            {!isParticipating ? (
                <button
                    onClick={handleParticipate}
                    disabled={isLoading}
                    className="w-full px-8 py-4 bg-gray-900 text-white font-medium tracking-wide hover:bg-gray-800 transition-all duration-300 uppercase text-sm flex items-center justify-center gap-2"
                >
                    <Play className="w-4 h-4" />
                    {isLoading ? 'Loading...' : 'Participate Now'}
                </button>
            ) : (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full px-8 py-4 bg-green-600 text-white font-medium tracking-wide hover:bg-green-700 transition-all duration-300 uppercase text-sm flex items-center justify-center gap-2"
                >
                    <Upload className="w-4 h-4" />
                    Submit Solution
                </button>
            )}

            <button
                onClick={handleShare}
                className="w-full px-8 py-4 border-2 border-gray-200 text-gray-700 font-medium tracking-wide hover:border-gray-900 transition-all duration-300 uppercase text-sm flex items-center justify-center gap-2"
            >
                <Share2 className="w-4 h-4" />
                {isSharing ? 'Copied!' : 'Share'}
            </button>

            <SubmissionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                challengeId={challengeId}
            />
        </div>
    );
}
