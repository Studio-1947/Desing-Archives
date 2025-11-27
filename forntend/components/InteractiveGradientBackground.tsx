'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveGradientBackground() {
    const blobRef1 = useRef<HTMLDivElement>(null);
    const blobRef2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            if (blobRef1.current) {
                const x = clientX * 0.05;
                const y = clientY * 0.05;
                blobRef1.current.style.transform = `translate(${x}px, ${y}px)`;
            }

            if (blobRef2.current) {
                const x = clientX * -0.05;
                const y = clientY * -0.05;
                blobRef2.current.style.transform = `translate(${x}px, ${y}px)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-white -z-10">
            {/* Pink/Purple Blob - Top Leftish */}
            <div
                ref={blobRef1}
                className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-gradient-to-r from-pink-200 to-purple-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 transition-transform duration-1000 ease-out will-change-transform"
            />

            {/* Blue/Cyan Blob - Bottom Rightish */}
            <div
                ref={blobRef2}
                className="absolute top-[10%] right-[0%] w-[60vw] h-[60vw] bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 transition-transform duration-1000 ease-out will-change-transform"
            />
        </div>
    );
}
