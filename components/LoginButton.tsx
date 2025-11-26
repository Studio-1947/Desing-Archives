'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginButton() {
    const { user, logout } = useAuth();

    if (user) {
        return (
            <div className="flex items-center gap-4">
                <img
                    src={user.picture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-gray-200"
                />
                <button
                    onClick={logout}
                    className="text-sm text-gray-600 hover:text-gray-900"
                >
                    Logout
                </button>
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
