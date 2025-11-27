'use client';

import { useState, useEffect } from 'react';

export default function TimeFeatureCard() {
    const [isHovered, setIsHovered] = useState(false);
    const [autoToggle, setAutoToggle] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isHovered) {
                setAutoToggle(prev => !prev);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isHovered]);

    const showBreakdown = isHovered || autoToggle;

    return (
        <div
            className="space-y-4 group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="h-24 relative overflow-hidden">
                {/* Default Number */}
                <div
                    className={`text-7xl font-bold text-gray-900 absolute inset-0 flex items-center justify-center transition-transform duration-500 ${showBreakdown ? '-translate-y-full' : 'translate-y-0'}`}
                >
                    24
                </div>
                {/* Hover Breakdown */}
                <div
                    className={`absolute inset-0 flex flex-col items-center justify-center transition-transform duration-500 ${showBreakdown ? 'translate-y-0' : 'translate-y-full'}`}
                >
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-gray-900">5h</span>
                        <span className="text-base text-gray-500 font-medium">/day</span>
                    </div>
                    <div className="text-lg font-medium text-gray-400">
                        + 4h Customised
                    </div>
                </div>
            </div>

            <div className="relative h-12 overflow-hidden">
                <p
                    className={`text-sm font-medium text-gray-800 leading-relaxed max-w-[150px] mx-auto absolute inset-0 transition-transform duration-500 flex items-start justify-center ${showBreakdown ? '-translate-y-full' : 'translate-y-0'}`}
                >
                    hours Live and interactive Sessions
                </p>
                <p
                    className={`text-sm font-medium text-gray-600 leading-relaxed max-w-[150px] mx-auto absolute inset-0 transition-transform duration-500 flex items-start justify-center ${showBreakdown ? 'translate-y-0' : 'translate-y-full'}`}
                >
                    Customizable & Flexible Schedule
                </p>
            </div>
        </div>
    );
}
