"use client";

import Link from 'next/link';
import { Download, Share2 } from 'lucide-react';
import { useState } from 'react';

interface ChallengeActionsProps {
    challengeId: string;
}

export default function ChallengeActions({ challengeId }: ChallengeActionsProps) {
    const [isSharing, setIsSharing] = useState(false);

    const handleDownload = () => {
        alert("Downloading challenge brief...");
        // In a real app, this would trigger a file download
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setIsSharing(true);
            setTimeout(() => setIsSharing(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="space-y-4">
            <Link
                href="/submit"
                className="block w-full text-center px-8 py-4 bg-gray-900 text-white font-medium tracking-wide hover:bg-gray-800 transition-all duration-300 uppercase text-sm"
            >
                Participate Now
            </Link>
            <button
                onClick={handleDownload}
                className="w-full px-8 py-4 border-2 border-gray-900 text-gray-900 font-medium tracking-wide hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase text-sm flex items-center justify-center gap-2"
            >
                <Download className="w-4 h-4" />
                Download Brief
            </button>
            <button
                onClick={handleShare}
                className="w-full px-8 py-4 border-2 border-gray-200 text-gray-700 font-medium tracking-wide hover:border-gray-900 transition-all duration-300 uppercase text-sm flex items-center justify-center gap-2"
            >
                <Share2 className="w-4 h-4" />
                {isSharing ? 'Copied!' : 'Share'}
            </button>
        </div>
    );
}
