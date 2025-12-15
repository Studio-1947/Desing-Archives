'use client';

import { GoogleLogin } from '@react-oauth/google';
import { useEffect, useRef, useState } from 'react';

interface ResponsiveGoogleLoginProps {
    onSuccess: (credentialResponse: any) => void;
    onError: () => void;
}

export default function ResponsiveGoogleLogin({ onSuccess, onError }: ResponsiveGoogleLoginProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<string>('100%');

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                // Google Login button has a max width of 400px
                const newWidth = Math.min(containerRef.current.offsetWidth, 400);
                setWidth(`${newWidth}px`);
            }
        };

        // Initial calculation
        updateWidth();

        // Resize observer for more robust resizing
        const resizeObserver = new ResizeObserver(() => {
            updateWidth();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        window.addEventListener('resize', updateWidth);

        return () => {
            window.removeEventListener('resize', updateWidth);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full flex justify-center">
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
                useOneTap
                theme="outline"
                shape="rectangular"
                width={width}
                text="continue_with"
            />
        </div>
    );
}
