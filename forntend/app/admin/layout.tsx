'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname?.startsWith(path);

    const getLinkClass = (path: string) => {
        const active = isActive(path);
        return `flex items-center px-4 py-3 text-sm font-medium rounded-none transition-all duration-300 ${active
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`;
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r-2 border-gray-200 hidden md:block">
                <div className="p-6 border-b-2 border-gray-200">
                    <Link href="/" className="text-xl font-bold tracking-tighter text-gray-900">
                        Studio 1947
                    </Link>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide font-medium">Admin Panel</p>
                </div>
                <nav className="p-4 space-y-2">
                    <Link
                        href="/admin/challenges"
                        className={getLinkClass('/admin/challenges')}
                    >
                        Challenges
                    </Link>
                    <Link
                        href="/admin/emails"
                        className={getLinkClass('/admin/emails')}
                    >
                        Email Manager
                    </Link>
                    <Link
                        href="/admin/archives"
                        className={getLinkClass('/admin/archives')}
                    >
                        Archives
                    </Link>
                    {/* Add more admin links here */}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
                {children}
            </main>
        </div>
    );
}
