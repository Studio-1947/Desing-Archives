'use client';

import { useEffect, useRef, useState } from 'react';

interface InteractiveGridBackgroundProps {
    showGrid?: boolean;
    showGradients?: boolean;
    className?: string;
}

export default function InteractiveGridBackground({
    showGrid = true,
    showGradients = true,
    className = "absolute inset-0 overflow-hidden pointer-events-none"
}: InteractiveGridBackgroundProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const blobRef1 = useRef<HTMLDivElement>(null);
    const blobRef2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                // Use client coordinates for fixed positioning, or relative for absolute
                // For simplicity in this hybrid component, we'll stick to client/offset logic based on context if needed
                // But since we use getBoundingClientRect in the original logic (which was removed in the fixed version),
                // let's revert to a robust calculation that works for both.

                const rect = containerRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                setMousePos({ x, y });

                // Move blobs with parallax effect combined with ambient motion
                if (blobRef1.current) {
                    blobRef1.current.style.setProperty('--mouse-x', `${e.clientX * 0.05}px`);
                    blobRef1.current.style.setProperty('--mouse-y', `${e.clientY * 0.05}px`);
                }
                if (blobRef2.current) {
                    blobRef2.current.style.setProperty('--mouse-x', `${e.clientX * -0.05}px`);
                    blobRef2.current.style.setProperty('--mouse-y', `${e.clientY * -0.05}px`);
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className={className}>
            <style jsx>{`
                @keyframes float-1 {
                    0%, 100% { transform: translate(0, 0) translate(var(--mouse-x, 0), var(--mouse-y, 0)); }
                    33% { transform: translate(30px, -50px) translate(var(--mouse-x, 0), var(--mouse-y, 0)); }
                    66% { transform: translate(-20px, 20px) translate(var(--mouse-x, 0), var(--mouse-y, 0)); }
                }
                @keyframes float-2 {
                    0%, 100% { transform: translate(0, 0) translate(var(--mouse-x, 0), var(--mouse-y, 0)); }
                    33% { transform: translate(-30px, 50px) translate(var(--mouse-x, 0), var(--mouse-y, 0)); }
                    66% { transform: translate(20px, -20px) translate(var(--mouse-x, 0), var(--mouse-y, 0)); }
                }
                .animate-float-1 {
                    animation: float-1 10s ease-in-out infinite;
                }
                .animate-float-2 {
                    animation: float-2 12s ease-in-out infinite;
                }
            `}</style>

            {/* Gradient Blobs Layer - Bottom */}
            {showGradients && (
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        ref={blobRef1}
                        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-gradient-to-r from-pink-100 to-purple-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-float-1 will-change-transform"
                    />
                    <div
                        ref={blobRef2}
                        className="absolute top-[10%] right-[0%] w-[60vw] h-[60vw] bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-float-2 will-change-transform"
                    />
                </div>
            )}

            {/* Grid Layers - Conditionally Rendered */}
            {showGrid && (
                <>
                    {/* Base Faint Grid - Static */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Moving Grid Layer - Adds depth and subtle motion */}
                    <div
                        className="absolute inset-0 opacity-[0.03] animate-grid-flow"
                        style={{
                            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                            backgroundSize: '60px 60px'
                        }}
                    />

                    {/* Spotlight Effect - Reveals a sharper grid around cursor */}
                    <div
                        className="absolute inset-0 transition-opacity duration-300"
                        style={{
                            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                            maskImage: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
                            WebkitMaskImage: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
                            opacity: 0.15
                        }}
                    />
                </>
            )}
        </div>
    );
}
