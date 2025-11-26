'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
    return (
        <Link
            href="/"
            className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors group z-20"
        >
            <div className="p-2 rounded-full border border-gray-200 group-hover:border-gray-900 transition-colors bg-white/50 backdrop-blur-sm">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="uppercase tracking-wide text-xs hidden sm:block">Back to Home</span>
        </Link>
    );
}
