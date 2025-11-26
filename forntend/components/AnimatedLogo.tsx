'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AnimatedLogo({ className = "", center = false }: { className?: string, center?: boolean }) {
    const [activeText, setActiveText] = useState('Community');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setActiveText(prev => prev === 'Community' ? 'Archives' : 'Community');
                setIsAnimating(false);
            }, 500); // Wait for fade out animation to complete
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Link href="/" className={`group flex items-center gap-2 md:gap-4 ${className}`}>
            <div className="relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
                <Image
                    src="/logo.svg"
                    alt="Studio 1947 Logo"
                    fill
                    className="object-contain animate-spin-slow"
                />
            </div>
            <div className={`flex flex-col ${center ? 'items-center' : 'items-start'}`}>
                <div className="flex items-center gap-1.5 md:gap-2 whitespace-nowrap">
                    <span className="text-lg md:text-2xl font-bold tracking-tight text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                        Local Design
                    </span>
                    <div className="relative h-7 md:h-8 w-[100px] md:w-[130px] overflow-hidden">
                        <span className={`absolute top-0 left-0 text-lg md:text-2xl font-bold tracking-tight text-gray-500 transition-all duration-500 ${isAnimating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                            {activeText}
                        </span>
                    </div>
                </div>
                <span className="text-[10px] md:text-xs tracking-extra-wide text-gray-500 uppercase whitespace-nowrap">
                    An initiative by Studio 1947
                </span>
            </div>
        </Link>
    );
}
