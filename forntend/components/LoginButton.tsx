'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { User, Settings, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';

export default function LoginButton() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (user) {
        return (
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 group focus:outline-none"
                >
                    {user.picture && !imageError ? (
                        <Image
                            src={user.picture}
                            alt={user.name}
                            width={32}
                            height={32}
                            className="rounded-full border border-gray-200 group-hover:border-gray-400 transition-colors object-cover"
                            unoptimized
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 font-medium text-xs group-hover:border-gray-400 transition-colors">
                            {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                        </div>
                    )}
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-sm py-2 z-50 animate-fade-in origin-top-right">
                        <div className="px-4 py-3 border-b border-gray-100 mb-2">
                            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>

                        {user.role === 'admin' && (
                            <Link
                                href="/admin/challenges"
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Admin Panel
                            </Link>
                        )}

                        <Link
                            href="/profile"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <User className="w-4 h-4" />
                            Profile
                        </Link>

                        <Link
                            href="/settings"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <Settings className="w-4 h-4" />
                            Settings
                        </Link>

                        <div className="my-2 border-t border-gray-100"></div>

                        <button
                            onClick={() => {
                                logout();
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            href="/login"
            className="text-sm font-medium tracking-wide text-gray-700 hover:text-gray-900 transition-colors duration-200 uppercase"
        >
            Log In
        </Link>
    );
}
